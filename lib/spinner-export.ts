import type { SpinnerConfig } from "./spinner-types"
import {
  computeCellDelay,
  getEasingCSS,
  getCellColor,
} from "./spinner-animation"

export function generateCSSExport(config: SpinnerConfig): string {
  const { gridSize, animation } = config
  const easing = getEasingCSS(animation.easing)
  const activeCells: {
    row: number
    col: number
    color: string
    delay: number
  }[] = []

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (config.cells[r][c].active) {
        activeCells.push({
          row: r,
          col: c,
          color: getCellColor(r, c, gridSize, config),
          delay: computeCellDelay(
            r,
            c,
            gridSize,
            animation.direction,
            animation.stagger
          ),
        })
      }
    }
  }

  const cellSize = gridSize <= 7 ? 12 : gridSize <= 9 ? 10 : 8
  const gap = gridSize <= 7 ? 3 : 2
  const totalSize = gridSize * cellSize + (gridSize - 1) * gap

  let css = `@keyframes spinner-fade {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

.spinner {
  display: inline-grid;
  grid-template-columns: repeat(${gridSize}, ${cellSize}px);
  gap: ${gap}px;
  width: ${totalSize}px;
  height: ${totalSize}px;
}

.spinner-cell {
  width: ${cellSize}px;
  height: ${cellSize}px;
  border-radius: 2px;
}

.spinner-cell--active {
  animation: spinner-fade ${animation.speed}ms ${easing} infinite;
}`

  activeCells.forEach(({ row, col, color, delay }) => {
    css += `

.spinner-cell[data-row="${row}"][data-col="${col}"] {
  background-color: ${color};
  animation-delay: ${delay}ms;
}`
  })

  let html = `<div class="spinner">\n`
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const isActive = config.cells[r][c].active
      const cls = isActive ? "spinner-cell spinner-cell--active" : "spinner-cell"
      html += `  <div class="${cls}" data-row="${r}" data-col="${c}"></div>\n`
    }
  }
  html += `</div>`

  return `/* === Spinner CSS === */\n${css}\n\n/* === HTML === */\n${html}`
}

export function generateReactExport(config: SpinnerConfig): string {
  const { gridSize, animation } = config
  const easing = getEasingCSS(animation.easing)

  const cellData: string[] = []
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const isActive = config.cells[r][c].active
      const color = getCellColor(r, c, gridSize, config)
      const delay = computeCellDelay(
        r,
        c,
        gridSize,
        animation.direction,
        animation.stagger
      )
      cellData.push(
        `    { active: ${isActive}, color: "${color}", delay: ${delay} }`
      )
    }
  }

  const rCellSize = gridSize <= 7 ? 12 : gridSize <= 9 ? 10 : 8
  const rGap = gridSize <= 7 ? 3 : 2

  return `export function Spinner() {
  const cells = [
${cellData.join(",\n")}
  ];

  return (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "repeat(${gridSize}, ${rCellSize}px)",
        gap: "${rGap}px",
      }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          style={{
            width: ${rCellSize},
            height: ${rCellSize},
            borderRadius: 2,
            backgroundColor: cell.active ? cell.color : "transparent",
            animation: cell.active
              ? \`spinnerFade ${animation.speed}ms ${easing} \${cell.delay}ms infinite\`
              : "none",
          }}
        />
      ))}
      <style>{\`
        @keyframes spinnerFade {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      \`}</style>
    </div>
  );
}`
}
