"use client"

import type { GridSize, SpinnerAction } from "@/lib/spinner-types"
import { cn } from "@/lib/utils"

const GRID_SIZES: { value: GridSize; label: string; tag?: string }[] = [
  { value: 3, label: "3x3" },
  { value: 5, label: "5x5" },
  { value: 7, label: "7x7" },
  { value: 9, label: "9x9", tag: "L" },
  { value: 11, label: "11x11", tag: "XL" },
  { value: 13, label: "13x13", tag: "XXL" },
]

interface GridSizeSelectorProps {
  gridSize: GridSize
  dispatch: (action: SpinnerAction) => void
  hasActiveCells: boolean
}

function SizeDot({ size, active }: { size: GridSize; active: boolean }) {
  // Show a proportional mini grid icon: render a few dots scaled to the size
  const dots = Math.min(size, 5)
  return (
    <div
      className="grid shrink-0"
      style={{
        gridTemplateColumns: `repeat(${dots}, 1fr)`,
        gap: "1.5px",
        width: `${8 + dots * 2}px`,
        height: `${8 + dots * 2}px`,
      }}
    >
      {Array.from({ length: dots * dots }).map((_, i) => (
        <div
          key={i}
          className="rounded-[0.5px]"
          style={{
            backgroundColor: active
              ? "var(--rgb-red)"
              : "currentColor",
            opacity: active ? 0.9 : 0.25,
          }}
        />
      ))}
    </div>
  )
}

export function GridSizeSelector({
  gridSize,
  dispatch,
  hasActiveCells,
}: GridSizeSelectorProps) {
  const handleChange = (newSize: GridSize) => {
    if (newSize === gridSize) return
    if (hasActiveCells) {
      const confirmed = window.confirm(
        "Changing grid size will reset your design. Continue?"
      )
      if (!confirmed) return
    }
    dispatch({ type: "SET_GRID_SIZE", size: newSize })
  }

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Grid Size
      </label>
      <div className="flex gap-1.5 flex-wrap">
        {GRID_SIZES.map(({ value, label, tag }) => {
          const isActive = gridSize === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleChange(value)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono transition-all cursor-pointer border",
                isActive
                  ? "border-[var(--rgb-red)]/40 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-[var(--surface-2)]"
              )}
              style={{
                background: isActive ? "var(--surface-2)" : undefined,
                boxShadow: isActive
                  ? "0 0 12px -2px rgba(255,45,85,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
                  : undefined,
              }}
              aria-pressed={isActive}
            >
              <SizeDot size={value} active={isActive} />
              <span className="tabular-nums">{label}</span>
              {tag && (
                <span
                  className={cn(
                    "text-[9px] font-mono px-1 py-0.5 rounded leading-none",
                    isActive
                      ? "bg-[var(--rgb-red)]/15 text-[var(--rgb-red)]"
                      : "bg-white/5 text-muted-foreground"
                  )}
                >
                  {tag}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
