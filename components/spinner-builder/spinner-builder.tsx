"use client"

import { useReducer } from "react"
import type {
  SpinnerConfig,
  SpinnerAction,
  GridSize,
} from "@/lib/spinner-types"
import { createDefaultConfig, createEmptyGrid } from "@/lib/spinner-types"
import { PRESETS } from "@/lib/spinner-presets"
import { GridEditor } from "./grid-editor"
import { GridSizeSelector } from "./grid-size-selector"
import { ControlsPanel } from "./controls-panel"
import { ColorPicker } from "./color-picker"
import { PreviewPanel } from "./preview-panel"
import { PresetGallery } from "./preset-gallery"
import { ExportPanel } from "./export-panel"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function spinnerReducer(
  state: SpinnerConfig,
  action: SpinnerAction
): SpinnerConfig {
  switch (action.type) {
    case "TOGGLE_CELL": {
      const newCells = state.cells.map((row) => row.map((c) => ({ ...c })))
      const cell = newCells[action.row][action.col]
      cell.active = !cell.active
      if (cell.active) {
        cell.color = state.activeColor
      }
      return { ...state, cells: newCells }
    }
    case "SET_CELL_COLOR": {
      const newCells = state.cells.map((row) => row.map((c) => ({ ...c })))
      newCells[action.row][action.col].color = action.color
      return { ...state, cells: newCells }
    }
    case "PAINT_CELL": {
      const newCells = state.cells.map((row) => row.map((c) => ({ ...c })))
      const cell = newCells[action.row][action.col]
      cell.active = true
      cell.color = state.activeColor
      return { ...state, cells: newCells }
    }
    case "SET_GRID_SIZE": {
      return {
        ...state,
        gridSize: action.size,
        cells: createEmptyGrid(action.size),
      }
    }
    case "SET_DIRECTION":
      return {
        ...state,
        animation: { ...state.animation, direction: action.direction },
      }
    case "SET_SPEED":
      return {
        ...state,
        animation: { ...state.animation, speed: action.speed },
      }
    case "SET_EASING":
      return {
        ...state,
        animation: { ...state.animation, easing: action.easing },
      }
    case "SET_STAGGER":
      return {
        ...state,
        animation: { ...state.animation, stagger: action.stagger },
      }
    case "SET_COLOR_MODE": {
      // When changing color mode, update all active cell colors
      const newCells = state.cells.map((row) =>
        row.map((c) => (c.active ? { ...c, color: state.activeColor } : { ...c }))
      )
      return { ...state, colorMode: action.mode, cells: newCells }
    }
    case "SET_ACTIVE_COLOR": {
      // Update all active cells to new color
      const newCells = state.cells.map((row) =>
        row.map((c) =>
          c.active ? { ...c, color: action.color } : { ...c }
        )
      )
      return { ...state, activeColor: action.color, cells: newCells }
    }
    case "SET_SECONDARY_COLOR":
      return { ...state, secondaryColor: action.color }
    case "LOAD_PRESET":
      return { ...action.config }
    case "RESET":
      return createDefaultConfig(state.gridSize)
    default:
      return state
  }
}

// Initialize with the first preset for a nice starting experience
const initialConfig = PRESETS[0].config

export function SpinnerBuilder() {
  const [config, dispatch] = useReducer(spinnerReducer, initialConfig)

  const hasActiveCells = config.cells.some((row) =>
    row.some((cell) => cell.active)
  )

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-10">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <a
            href="https://v0.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="v0 by Vercel"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/v0-logo-dark.svg"
              alt="v0"
              width={42}
              height={20}
              className="block"
            />
          </a>
          <div className="h-6 w-px bg-border opacity-30" />
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl lg:text-2xl font-mono font-bold tracking-tight text-balance">
              <span style={{ color: "var(--rgb-red)" }}>Spin</span>
              <span style={{ color: "var(--rgb-blue)" }}>lab</span>
            </h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
              RGB Spinner Builder
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => dispatch({ type: "RESET" })}
          className="gap-1.5 text-xs font-mono text-muted-foreground cursor-pointer"
        >
          <RotateCcw className="size-3" />
          Reset
        </Button>
      </header>

      {/* Presets row */}
      <section className="mb-8">
        <PresetGallery dispatch={dispatch} />
      </section>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left column: Editor + Controls */}
        <div className="flex flex-col gap-6 lg:w-[460px] shrink-0">
          {/* Grid Size */}
          <GridSizeSelector
            gridSize={config.gridSize}
            dispatch={dispatch}
            hasActiveCells={hasActiveCells}
          />

          {/* Grid Editor */}
          <GridEditor
            cells={config.cells}
            gridSize={config.gridSize}
            activeColor={config.activeColor}
            dispatch={dispatch}
          />

          <Separator className="opacity-20" />

          {/* Color Picker */}
          <ColorPicker
            activeColor={config.activeColor}
            secondaryColor={config.secondaryColor}
            colorMode={config.colorMode}
            dispatch={dispatch}
          />

          <Separator className="opacity-20" />

          {/* Animation Controls */}
          <ControlsPanel animation={config.animation} dispatch={dispatch} />
        </div>

        {/* Right column: Preview + Export */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <PreviewPanel config={config} />
          <Separator className="opacity-20" />
          <ExportPanel config={config} />
        </div>
      </div>
    </div>
  )
}
