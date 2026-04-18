"use client"

import { useCallback } from "react"
import type { ColorMode, SpinnerAction } from "@/lib/spinner-types"

const SWATCHES = [
  "#ff2d55",
  "#ff6b8a",
  "#ff9f0a",
  "#ffcc02",
  "#32d74b",
  "#00c7be",
  "#00aaff",
  "#5ac8fa",
  "#bf5af2",
  "#ff375f",
  "#ffffff",
  "#a0a0a0",
]

interface ColorPickerProps {
  activeColor: string
  secondaryColor: string
  colorMode: ColorMode
  dispatch: (action: SpinnerAction) => void
}

export function ColorPicker({
  activeColor,
  secondaryColor,
  colorMode,
  dispatch,
}: ColorPickerProps) {
  const handleColorChange = useCallback(
    (color: string) => {
      dispatch({ type: "SET_ACTIVE_COLOR", color })
    },
    [dispatch]
  )

  const handleSecondaryChange = useCallback(
    (color: string) => {
      dispatch({ type: "SET_SECONDARY_COLOR", color })
    },
    [dispatch]
  )

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Color
      </label>

      {/* Primary color */}
      <div className="flex items-center gap-2">
        <div
          className="size-8 rounded-md border border-white/10 shrink-0"
          style={{
            backgroundColor: activeColor,
            boxShadow: `0 0 8px ${activeColor}40`,
          }}
        />
        <input
          type="text"
          value={activeColor}
          onChange={(e) => {
            const v = e.target.value
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) handleColorChange(v)
          }}
          className="flex-1 h-8 px-2 rounded-md text-xs font-mono tracking-wide bg-[var(--surface-2)] border border-white/[0.06] text-foreground focus:outline-none focus:border-[var(--rgb-red)] transition-colors"
          maxLength={7}
          aria-label="Primary color hex value"
        />
        <input
          type="color"
          value={activeColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="size-8 rounded cursor-pointer border-0 bg-transparent p-0"
          aria-label="Primary color picker"
        />
      </div>

      {/* Swatches */}
      <div className="grid grid-cols-6 gap-1.5">
        {SWATCHES.map((swatch) => (
          <button
            key={swatch}
            type="button"
            className="size-7 rounded-sm transition-all duration-100 hover:scale-110 border cursor-pointer"
            style={{
              backgroundColor: swatch,
              borderColor:
                activeColor === swatch
                  ? "rgba(255,255,255,0.5)"
                  : "rgba(255,255,255,0.06)",
              boxShadow:
                activeColor === swatch
                  ? `0 0 6px ${swatch}50`
                  : "none",
            }}
            onClick={() => handleColorChange(swatch)}
            aria-label={`Select color ${swatch}`}
          />
        ))}
      </div>

      {/* Secondary color for gradient mode */}
      {colorMode === "gradient" && (
        <div className="flex flex-col gap-2 pt-1">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Secondary
          </label>
          <div className="flex items-center gap-2">
            <div
              className="size-8 rounded-md border border-white/10 shrink-0"
              style={{
                backgroundColor: secondaryColor,
                boxShadow: `0 0 8px ${secondaryColor}40`,
              }}
            />
            <input
              type="text"
              value={secondaryColor}
              onChange={(e) => {
                const v = e.target.value
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) handleSecondaryChange(v)
              }}
              className="flex-1 h-8 px-2 rounded-md text-xs font-mono tracking-wide bg-[var(--surface-2)] border border-white/[0.06] text-foreground focus:outline-none focus:border-[var(--rgb-blue)] transition-colors"
              maxLength={7}
              aria-label="Secondary color hex value"
            />
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => handleSecondaryChange(e.target.value)}
              className="size-8 rounded cursor-pointer border-0 bg-transparent p-0"
              aria-label="Secondary color picker"
            />
          </div>
        </div>
      )}

      {/* Color mode */}
      <div className="flex flex-col gap-2 pt-1">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Color Mode
        </label>
        <div className="flex gap-1">
          {(["single", "rgb-cycle", "gradient"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => dispatch({ type: "SET_COLOR_MODE", mode })}
              className="flex-1 h-8 rounded-md text-xs font-mono tracking-wide transition-all cursor-pointer"
              style={{
                backgroundColor:
                  colorMode === mode ? "var(--surface-3)" : "var(--surface-1)",
                color:
                  colorMode === mode
                    ? "var(--foreground)"
                    : "var(--muted-foreground)",
                border:
                  colorMode === mode
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {mode === "single"
                ? "Single"
                : mode === "rgb-cycle"
                  ? "RGB"
                  : "Gradient"}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
