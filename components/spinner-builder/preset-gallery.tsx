"use client"

import { useMemo } from "react"
import type { SpinnerAction, SpinnerConfig } from "@/lib/spinner-types"
import { PRESETS } from "@/lib/spinner-presets"
import { createDefaultConfig } from "@/lib/spinner-types"
import { getCellColor } from "@/lib/spinner-animation"
import { Plus } from "lucide-react"

interface PresetGalleryProps {
  dispatch: (action: SpinnerAction) => void
}

function MiniGrid({ config }: { config: SpinnerConfig }) {
  const { gridSize, cells } = config
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: gridSize <= 7 ? "1.5px" : "1px",
        width: gridSize <= 7 ? "32px" : gridSize <= 9 ? "36px" : "40px",
        height: gridSize <= 7 ? "32px" : gridSize <= 9 ? "36px" : "40px",
      }}
    >
      {cells.map((row, r) =>
        row.map((cell, c) => {
          const color = getCellColor(r, c, gridSize, config)
          return (
            <div
              key={`${r}-${c}`}
              className="rounded-[1px]"
              style={{
                backgroundColor: cell.active ? color : "transparent",
                opacity: cell.active ? 1 : 0,
              }}
            />
          )
        })
      )}
    </div>
  )
}

export function PresetGallery({ dispatch }: PresetGalleryProps) {
  const handleLoadPreset = (config: SpinnerConfig) => {
    dispatch({ type: "LOAD_PRESET", config })
  }

  const handleBlank = () => {
    dispatch({ type: "LOAD_PRESET", config: createDefaultConfig(5) })
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Presets
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {/* Blank */}
        <button
          type="button"
          onClick={handleBlank}
          className="shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg transition-all cursor-pointer hover:scale-105 group"
          style={{
            background: "var(--surface-1)",
            border: "1px dashed rgba(255,255,255,0.1)",
            minWidth: "80px",
          }}
        >
          <div className="size-8 flex items-center justify-center rounded-md border border-dashed border-white/10 group-hover:border-white/20 transition-colors">
            <Plus className="size-3.5 text-muted-foreground" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">
            Blank
          </span>
        </button>

        {/* Preset cards */}
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleLoadPreset(preset.config)}
            className="shrink-0 flex flex-col items-center gap-2 p-3 rounded-lg transition-all cursor-pointer hover:scale-105"
            style={{
              background: "var(--surface-1)",
              border: "1px solid rgba(255,255,255,0.04)",
              minWidth: "80px",
            }}
          >
            <MiniGrid config={preset.config} />
            <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
