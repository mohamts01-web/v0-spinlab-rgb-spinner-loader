"use client"

import { useCallback, useRef, useState } from "react"
import type { CellState, GridSize, SpinnerAction } from "@/lib/spinner-types"
import { GridCell } from "./grid-cell"

interface GridEditorProps {
  cells: CellState[][]
  gridSize: GridSize
  activeColor: string
  dispatch: (action: SpinnerAction) => void
}

export function GridEditor({
  cells,
  gridSize,
  activeColor,
  dispatch,
}: GridEditorProps) {
  const [isPainting, setIsPainting] = useState(false)
  const paintModeRef = useRef<boolean | null>(null) // true = activating, false = deactivating

  const handleToggle = useCallback(
    (row: number, col: number) => {
      const cell = cells[row][col]
      paintModeRef.current = !cell.active
      setIsPainting(true)
      dispatch({ type: "TOGGLE_CELL", row, col })
    },
    [cells, dispatch]
  )

  const handlePaint = useCallback(
    (row: number, col: number) => {
      if (paintModeRef.current === null) return
      const cell = cells[row][col]
      if (paintModeRef.current && !cell.active) {
        dispatch({ type: "TOGGLE_CELL", row, col })
      } else if (!paintModeRef.current && cell.active) {
        dispatch({ type: "TOGGLE_CELL", row, col })
      }
    },
    [cells, dispatch]
  )

  const handlePointerUp = useCallback(() => {
    setIsPainting(false)
    paintModeRef.current = null
  }, [])

  return (
    <div
      className="flex flex-col items-center gap-4"
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div className="relative p-5 rounded-lg w-full" style={{ background: "var(--surface-1)" }}>
        {/* Grid background glow */}
        <div
          className="absolute inset-0 rounded-lg opacity-30 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${activeColor}15, transparent 70%)`,
          }}
        />
        <div
          className="grid select-none touch-none relative mx-auto"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: gridSize <= 3 ? "8px" : gridSize <= 5 ? "5px" : gridSize <= 7 ? "4px" : gridSize <= 9 ? "3px" : "2px",
            maxWidth: gridSize <= 5 ? "320px" : gridSize <= 7 ? "380px" : gridSize <= 9 ? "420px" : "460px",
            width: "100%",
            aspectRatio: "1",
          }}
          role="grid"
          aria-label="Spinner grid editor"
        >
          {cells.map((row, r) =>
            row.map((cell, c) => (
              <GridCell
                key={`${r}-${c}`}
                active={cell.active}
                color={cell.color || activeColor}
                row={r}
                col={c}
                onToggle={handleToggle}
                onPaint={handlePaint}
                isPainting={isPainting}
              />
            ))
          )}
        </div>
      </div>
      <p className="text-xs font-mono text-muted-foreground tracking-wide">
        Click to toggle &middot; Drag to paint
      </p>
    </div>
  )
}
