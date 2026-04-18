"use client"

import { memo } from "react"
import { cn } from "@/lib/utils"

interface GridCellProps {
  active: boolean
  color: string
  row: number
  col: number
  onToggle: (row: number, col: number) => void
  onPaint: (row: number, col: number) => void
  isPainting: boolean
}

export const GridCell = memo(function GridCell({
  active,
  color,
  row,
  col,
  onToggle,
  onPaint,
  isPainting,
}: GridCellProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative aspect-square rounded-sm transition-all duration-150 cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--rgb-red)]",
        "hover:scale-[1.08] hover:z-10",
        active
          ? "border border-white/10"
          : "border border-white/[0.04] hover:border-white/10"
      )}
      style={{
        backgroundColor: active ? color : "var(--surface-2)",
        boxShadow: active
          ? `0 0 10px 2px ${color}40, inset 0 0 6px ${color}20`
          : "none",
        ["--cell-color" as string]: color,
      }}
      onPointerDown={(e) => {
        e.preventDefault()
        onToggle(row, col)
      }}
      onPointerEnter={() => {
        if (isPainting) onPaint(row, col)
      }}
      aria-label={`Cell ${row + 1},${col + 1}${active ? " active" : ""}`}
      aria-pressed={active}
      role="switch"
    >
      {active && (
        <div
          className="absolute inset-0 rounded-sm opacity-40"
          style={{
            background: `radial-gradient(circle at center, ${color}60, transparent 70%)`,
          }}
        />
      )}
    </button>
  )
})
