"use client"

import { useMemo, useState } from "react"
import type { SpinnerConfig } from "@/lib/spinner-types"
import {
  computeCellDelay,
  getEasingCSS,
  getCellColor,
} from "@/lib/spinner-animation"
import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"

interface PreviewPanelProps {
  config: SpinnerConfig
}

export function PreviewPanel({ config }: PreviewPanelProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const { gridSize, animation, cells } = config
  const easing = getEasingCSS(animation.easing)

  const previewCells = useMemo(() => {
    const result: {
      row: number
      col: number
      active: boolean
      color: string
      delay: number
    }[] = []
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cell = cells[r][c]
        result.push({
          row: r,
          col: c,
          active: cell.active,
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
    return result
  }, [cells, gridSize, animation, config])

  const hasActiveCells = previewCells.some((c) => c.active)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Preview
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tabular-nums text-muted-foreground">
            {animation.speed}ms/cycle
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
          >
            {isPlaying ? (
              <Pause className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Preview area */}
      <div
        className="flex items-center justify-center rounded-xl p-8 w-full min-h-[200px]"
        style={{
          background: "var(--surface-1)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {hasActiveCells ? (
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gap: gridSize <= 3 ? "5px" : gridSize <= 5 ? "3px" : gridSize <= 9 ? "2px" : "1.5px",
              width: gridSize <= 3 ? "72px" : gridSize <= 5 ? "80px" : gridSize <= 7 ? "84px" : gridSize <= 9 ? "100px" : "120px",
              aspectRatio: "1",
            }}
          >
            {previewCells.map(({ row, col, active, color, delay }) => (
              <div
                key={`${row}-${col}`}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor: active ? color : "transparent",
                  animation:
                    active && isPlaying
                      ? `spinner-glow ${animation.speed}ms ${easing} ${delay}ms infinite`
                      : "none",
                  opacity: active ? (isPlaying ? undefined : 1) : 0,
                  ["--cell-color" as string]: color,
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs font-mono text-muted-foreground text-center">
            Click cells in the grid
            <br />
            to start building
          </p>
        )}
      </div>

      {/* Dark/light preview backgrounds */}
      {hasActiveCells && (
        <div className="flex gap-2 w-full">
          {[
            { bg: "#000000", label: "Black" },
            { bg: "#1a1a1a", label: "Dark" },
            { bg: "#ffffff", label: "White" },
          ].map(({ bg, label }) => (
            <div
              key={bg}
              className="flex-1 flex items-center justify-center rounded-lg p-4"
              style={{
                background: bg,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  gap: gridSize <= 7 ? "2px" : "1px",
                  width: gridSize <= 5 ? "36px" : gridSize <= 7 ? "42px" : gridSize <= 9 ? "50px" : "56px",
                  aspectRatio: "1",
                }}
                aria-label={`${label} background preview`}
              >
                {previewCells.map(({ row, col, active, color, delay }) => (
                  <div
                    key={`${row}-${col}`}
                    className="aspect-square rounded-[1px]"
                    style={{
                      backgroundColor: active ? color : "transparent",
                      animation:
                        active && isPlaying
                          ? `spinner-fade ${animation.speed}ms ${easing} ${delay}ms infinite`
                          : "none",
                      opacity: active ? (isPlaying ? undefined : 1) : 0,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
