export type GridSize = 3 | 5 | 7 | 9 | 11 | 13

export type AnimationDirection =
  | "clockwise"
  | "counterclockwise"
  | "pulse"
  | "wave"
  | "cascade"

export type EasingType =
  | "linear"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "steps"

export type ColorMode = "single" | "rgb-cycle" | "gradient"

export interface CellState {
  active: boolean
  color: string
  order: number
}

export interface AnimationConfig {
  direction: AnimationDirection
  speed: number
  easing: EasingType
  stagger: number
}

export interface SpinnerConfig {
  gridSize: GridSize
  cells: CellState[][]
  animation: AnimationConfig
  colorMode: ColorMode
  activeColor: string
  secondaryColor: string
  backgroundColor: string
}

// Reducer actions
export type SpinnerAction =
  | { type: "TOGGLE_CELL"; row: number; col: number }
  | { type: "SET_CELL_COLOR"; row: number; col: number; color: string }
  | { type: "PAINT_CELL"; row: number; col: number }
  | { type: "SET_GRID_SIZE"; size: GridSize }
  | { type: "SET_DIRECTION"; direction: AnimationDirection }
  | { type: "SET_SPEED"; speed: number }
  | { type: "SET_EASING"; easing: EasingType }
  | { type: "SET_STAGGER"; stagger: number }
  | { type: "SET_COLOR_MODE"; mode: ColorMode }
  | { type: "SET_ACTIVE_COLOR"; color: string }
  | { type: "SET_SECONDARY_COLOR"; color: string }
  | { type: "LOAD_PRESET"; config: SpinnerConfig }
  | { type: "RESET" }

export interface PresetDefinition {
  id: string
  name: string
  config: SpinnerConfig
}

// Helper to create an empty grid
export function createEmptyGrid(size: GridSize): CellState[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      active: false,
      color: "#ff2d55",
      order: 0,
    }))
  )
}

export function createDefaultConfig(size: GridSize = 5): SpinnerConfig {
  return {
    gridSize: size,
    cells: createEmptyGrid(size),
    animation: {
      direction: "clockwise",
      speed: 800,
      easing: "ease-in-out",
      stagger: 50,
    },
    colorMode: "single",
    activeColor: "#ff2d55",
    secondaryColor: "#00aaff",
    backgroundColor: "transparent",
  }
}
