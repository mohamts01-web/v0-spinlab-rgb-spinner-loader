import {
  type SpinnerConfig,
  type PresetDefinition,
  type CellState,
  type GridSize,
} from "./spinner-types"

function cell(
  active: boolean,
  color: string = "#ff2d55",
  order: number = 0
): CellState {
  return { active, color, order }
}

const O = (c: string = "#ff2d55", o: number = 0) => cell(true, c, o)
const X = cell(false, "#ff2d55", 0)

// ---- Preset: Classic Spinner (perimeter ring) ----
function classicSpinner(): SpinnerConfig {
  const r = "#ff2d55"
  return {
    gridSize: 5,
    cells: [
      [O(r, 0), O(r, 1), O(r, 2), O(r, 3), X],
      [X, X, X, X, O(r, 4)],
      [X, X, X, X, O(r, 5)],
      [X, X, X, X, O(r, 6)],
      [X, O(r, 10), O(r, 9), O(r, 8), O(r, 7)],
    ],
    animation: {
      direction: "clockwise",
      speed: 800,
      easing: "ease-in-out",
      stagger: 60,
    },
    colorMode: "single",
    activeColor: "#ff2d55",
    secondaryColor: "#00aaff",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Corner Pulse ----
function cornerPulse(): SpinnerConfig {
  const b = "#00aaff"
  return {
    gridSize: 5,
    cells: [
      [O(b, 0), O(b, 1), X, X, X],
      [O(b, 1), X, X, X, X],
      [X, X, X, X, X],
      [X, X, X, X, O(b, 2)],
      [X, X, X, O(b, 2), O(b, 3)],
    ],
    animation: {
      direction: "pulse",
      speed: 1200,
      easing: "ease-in-out",
      stagger: 100,
    },
    colorMode: "single",
    activeColor: "#00aaff",
    secondaryColor: "#ff2d55",
    backgroundColor: "transparent",
  }
}

// ---- Preset: DNA Helix ----
function dnaHelix(): SpinnerConfig {
  const g = "#32d74b"
  const p = "#ff2d55"
  return {
    gridSize: 5,
    cells: [
      [O(g, 0), X, X, X, O(p, 0)],
      [X, O(g, 1), X, O(p, 1), X],
      [X, X, O(g, 2), X, X],
      [X, O(p, 3), X, O(g, 3), X],
      [O(p, 4), X, X, X, O(g, 4)],
    ],
    animation: {
      direction: "wave",
      speed: 1000,
      easing: "ease-in-out",
      stagger: 80,
    },
    colorMode: "gradient",
    activeColor: "#32d74b",
    secondaryColor: "#ff2d55",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Matrix Rain ----
function matrixRain(): SpinnerConfig {
  const g = "#32d74b"
  return {
    gridSize: 5,
    cells: [
      [O(g, 0), X, O(g, 2), X, O(g, 1)],
      [O(g, 1), X, X, X, O(g, 2)],
      [X, X, O(g, 3), X, X],
      [O(g, 3), X, O(g, 4), X, O(g, 4)],
      [X, X, O(g, 5), X, O(g, 5)],
    ],
    animation: {
      direction: "cascade",
      speed: 600,
      easing: "linear",
      stagger: 40,
    },
    colorMode: "single",
    activeColor: "#32d74b",
    secondaryColor: "#00aaff",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Heartbeat ----
function heartbeat(): SpinnerConfig {
  const r = "#ff2d55"
  return {
    gridSize: 5,
    cells: [
      [X, O(r, 0), X, O(r, 0), X],
      [O(r, 1), O(r, 1), O(r, 1), O(r, 1), O(r, 1)],
      [O(r, 2), O(r, 2), O(r, 2), O(r, 2), O(r, 2)],
      [X, O(r, 3), O(r, 3), O(r, 3), X],
      [X, X, O(r, 4), X, X],
    ],
    animation: {
      direction: "pulse",
      speed: 1000,
      easing: "ease-in-out",
      stagger: 30,
    },
    colorMode: "single",
    activeColor: "#ff2d55",
    secondaryColor: "#ff6b8a",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Orbit ----
function orbit(): SpinnerConfig {
  const b = "#00aaff"
  return {
    gridSize: 5,
    cells: [
      [X, X, O(b, 0), X, X],
      [X, X, X, X, X],
      [O(b, 3), X, O("#ff2d55", 4), X, O(b, 1)],
      [X, X, X, X, X],
      [X, X, O(b, 2), X, X],
    ],
    animation: {
      direction: "clockwise",
      speed: 1200,
      easing: "linear",
      stagger: 150,
    },
    colorMode: "single",
    activeColor: "#00aaff",
    secondaryColor: "#ff2d55",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Diamond ----
function diamond(): SpinnerConfig {
  const c = "#ff9f0a"
  return {
    gridSize: 5,
    cells: [
      [X, X, O(c, 0), X, X],
      [X, O(c, 1), X, O(c, 1), X],
      [O(c, 2), X, X, X, O(c, 2)],
      [X, O(c, 3), X, O(c, 3), X],
      [X, X, O(c, 4), X, X],
    ],
    animation: {
      direction: "clockwise",
      speed: 900,
      easing: "ease-in-out",
      stagger: 70,
    },
    colorMode: "single",
    activeColor: "#ff9f0a",
    secondaryColor: "#ffcc02",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Cross Fade ----
function crossFade(): SpinnerConfig {
  const c = "#bf5af2"
  return {
    gridSize: 5,
    cells: [
      [X, X, O(c, 0), X, X],
      [X, X, O(c, 1), X, X],
      [O(c, 0), O(c, 1), O(c, 2), O(c, 1), O(c, 0)],
      [X, X, O(c, 1), X, X],
      [X, X, O(c, 0), X, X],
    ],
    animation: {
      direction: "pulse",
      speed: 1400,
      easing: "ease-in-out",
      stagger: 80,
    },
    colorMode: "single",
    activeColor: "#bf5af2",
    secondaryColor: "#ff2d55",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Sunburst (9x9) ----
function sunburst(): SpinnerConfig {
  const a = "#ff9f0a"
  const r = "#ff2d55"
  const size = 9
  const center = 4
  const cells: CellState[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ active: false, color: a, order: 0 }))
  )
  // Center dot
  cells[center][center] = { active: true, color: r, order: 0 }
  // 8 rays from center
  const rays = [
    [0, 1], [1, 1], [1, 0], [1, -1],
    [0, -1], [-1, -1], [-1, 0], [-1, 1],
  ]
  rays.forEach(([dr, dc], i) => {
    for (let step = 1; step <= 4; step++) {
      const nr = center + dr * step
      const nc = center + dc * step
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        cells[nr][nc] = { active: true, color: step <= 2 ? r : a, order: i * 4 + step }
      }
    }
  })
  return {
    gridSize: 9,
    cells,
    animation: { direction: "pulse", speed: 1400, easing: "ease-in-out", stagger: 50 },
    colorMode: "gradient",
    activeColor: "#ff2d55",
    secondaryColor: "#ff9f0a",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Spiral Galaxy (11x11) ----
function spiralGalaxy(): SpinnerConfig {
  const b = "#00aaff"
  const size = 11
  const center = 5
  const cells: CellState[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ active: false, color: b, order: 0 }))
  )
  // Spiral arm coordinates
  const spiralSteps = 24
  for (let i = 0; i < spiralSteps; i++) {
    const angle = (i / spiralSteps) * Math.PI * 4
    const radius = 0.5 + (i / spiralSteps) * 4.5
    const r = Math.round(center + Math.sin(angle) * radius)
    const c = Math.round(center + Math.cos(angle) * radius)
    if (r >= 0 && r < size && c >= 0 && c < size) {
      cells[r][c] = { active: true, color: b, order: i }
    }
  }
  // Center bright core
  cells[center][center] = { active: true, color: "#ffffff", order: 0 }
  cells[center - 1][center] = { active: true, color: b, order: 1 }
  cells[center + 1][center] = { active: true, color: b, order: 1 }
  cells[center][center - 1] = { active: true, color: b, order: 1 }
  cells[center][center + 1] = { active: true, color: b, order: 1 }

  return {
    gridSize: 11,
    cells,
    animation: { direction: "clockwise", speed: 2000, easing: "linear", stagger: 60 },
    colorMode: "rgb-cycle",
    activeColor: "#00aaff",
    secondaryColor: "#bf5af2",
    backgroundColor: "transparent",
  }
}

// ---- Preset: Starburst (13x13) ----
function starburst(): SpinnerConfig {
  const r = "#ff2d55"
  const b = "#00aaff"
  const g = "#32d74b"
  const size = 13
  const center = 6
  const cells: CellState[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ active: false, color: r, order: 0 }))
  )

  // Center cross
  for (let i = 0; i < size; i++) {
    cells[center][i] = { active: true, color: i <= center ? r : b, order: Math.abs(i - center) }
    cells[i][center] = { active: true, color: i <= center ? r : b, order: Math.abs(i - center) }
  }

  // Diagonal X
  for (let i = 0; i < size; i++) {
    cells[i][i] = { active: true, color: g, order: Math.abs(i - center) }
    cells[i][size - 1 - i] = { active: true, color: g, order: Math.abs(i - center) }
  }

  // Center bright core
  cells[center][center] = { active: true, color: "#ffffff", order: 0 }
  const adj = [[-1, 0], [1, 0], [0, -1], [0, 1]]
  adj.forEach(([dr, dc]) => {
    cells[center + dr][center + dc] = { active: true, color: r, order: 1 }
  })

  return {
    gridSize: 13,
    cells,
    animation: { direction: "pulse", speed: 1800, easing: "ease-in-out", stagger: 40 },
    colorMode: "gradient",
    activeColor: "#ff2d55",
    secondaryColor: "#00aaff",
    backgroundColor: "transparent",
  }
}

export const PRESETS: PresetDefinition[] = [
  { id: "classic-spinner", name: "Classic Spinner", config: classicSpinner() },
  { id: "corner-pulse", name: "Corner Pulse", config: cornerPulse() },
  { id: "dna-helix", name: "DNA Helix", config: dnaHelix() },
  { id: "matrix-rain", name: "Matrix Rain", config: matrixRain() },
  { id: "heartbeat", name: "Heartbeat", config: heartbeat() },
  { id: "orbit", name: "Orbit", config: orbit() },
  { id: "diamond", name: "Diamond", config: diamond() },
  { id: "cross-fade", name: "Cross Fade", config: crossFade() },
  { id: "sunburst", name: "Sunburst 9x", config: sunburst() },
  { id: "spiral-galaxy", name: "Spiral 11x", config: spiralGalaxy() },
  { id: "starburst", name: "Starburst 13x", config: starburst() },
]

// Adapt a preset to a different grid size
export function adaptPresetToSize(
  config: SpinnerConfig,
  newSize: GridSize
): SpinnerConfig {
  if (config.gridSize === newSize) return config
  const newCells: CellState[][] = Array.from({ length: newSize }, () =>
    Array.from({ length: newSize }, () => ({
      active: false,
      color: config.activeColor,
      order: 0,
    }))
  )
  const srcSize = config.gridSize
  const minSize = Math.min(srcSize, newSize)
  const offsetSrc = Math.floor((srcSize - minSize) / 2)
  const offsetDst = Math.floor((newSize - minSize) / 2)
  for (let r = 0; r < minSize; r++) {
    for (let c = 0; c < minSize; c++) {
      const srcCell = config.cells[r + offsetSrc]?.[c + offsetSrc]
      if (srcCell) {
        newCells[r + offsetDst][c + offsetDst] = { ...srcCell }
      }
    }
  }
  return { ...config, gridSize: newSize, cells: newCells }
}
