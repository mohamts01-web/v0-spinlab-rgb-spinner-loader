import type {
  SpinnerConfig,
  AnimationDirection,
  GridSize,
} from "./spinner-types"

/**
 * Compute per-cell animation delay (ms) based on direction, stagger, and grid position.
 */
export function computeCellDelay(
  row: number,
  col: number,
  gridSize: GridSize,
  direction: AnimationDirection,
  stagger: number
): number {
  switch (direction) {
    case "clockwise":
      return getClockwiseOrder(row, col, gridSize) * stagger
    case "counterclockwise":
      return (
        (getPerimeterLength(gridSize) -
          1 -
          getClockwiseOrder(row, col, gridSize)) *
        stagger
      )
    case "pulse":
      // Distance from center
      const center = (gridSize - 1) / 2
      const dist = Math.sqrt((row - center) ** 2 + (col - center) ** 2)
      return Math.round(dist * stagger)
    case "wave":
      // Diagonal wave: sum of row + col
      return (row + col) * stagger
    case "cascade":
      // Top-to-bottom, left-to-right
      return (row * gridSize + col) * stagger
    default:
      return 0
  }
}

function getPerimeterLength(size: number): number {
  return Math.max(1, 4 * (size - 1))
}

function getClockwiseOrder(row: number, col: number, size: number): number {
  const maxIdx = size - 1
  // Top edge
  if (row === 0 && col < maxIdx) return col
  // Right edge
  if (col === maxIdx && row < maxIdx) return maxIdx + row
  // Bottom edge
  if (row === maxIdx && col > 0) return 2 * maxIdx + (maxIdx - col)
  // Left edge
  if (col === 0 && row > 0) return 3 * maxIdx + (maxIdx - row)
  // Interior cells - use distance from center
  const center = (size - 1) / 2
  return Math.round(
    (Math.atan2(row - center, col - center) + Math.PI) *
      (getPerimeterLength(size) / (2 * Math.PI))
  )
}

/**
 * Generate a CSS easing string from our easing type
 */
export function getEasingCSS(
  easing: SpinnerConfig["animation"]["easing"]
): string {
  switch (easing) {
    case "linear":
      return "linear"
    case "ease-in":
      return "cubic-bezier(0.4, 0, 1, 1)"
    case "ease-out":
      return "cubic-bezier(0, 0, 0.2, 1)"
    case "ease-in-out":
      return "cubic-bezier(0.4, 0, 0.2, 1)"
    case "steps":
      return "steps(4, end)"
    default:
      return "linear"
  }
}

/**
 * Compute cell color based on color mode, position, and config
 */
export function getCellColor(
  row: number,
  col: number,
  gridSize: GridSize,
  config: SpinnerConfig
): string {
  const cell = config.cells[row]?.[col]
  if (!cell?.active) return "transparent"

  switch (config.colorMode) {
    case "single":
      return cell.color || config.activeColor
    case "rgb-cycle": {
      const idx = row * gridSize + col
      const total = gridSize * gridSize
      const hue = Math.round((idx / total) * 360)
      return `hsl(${hue}, 100%, 55%)`
    }
    case "gradient": {
      const center = (gridSize - 1) / 2
      const dist =
        Math.sqrt((row - center) ** 2 + (col - center) ** 2) /
        Math.sqrt(center ** 2 + center ** 2)
      return interpolateColor(config.activeColor, config.secondaryColor, dist)
    }
    default:
      return config.activeColor
  }
}

function interpolateColor(c1: string, c2: string, t: number): string {
  const r1 = parseInt(c1.slice(1, 3), 16)
  const g1 = parseInt(c1.slice(3, 5), 16)
  const b1 = parseInt(c1.slice(5, 7), 16)
  const r2 = parseInt(c2.slice(1, 3), 16)
  const g2 = parseInt(c2.slice(3, 5), 16)
  const b2 = parseInt(c2.slice(5, 7), 16)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}
