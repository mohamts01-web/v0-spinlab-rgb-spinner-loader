"use client"

import type {
  AnimationConfig,
  AnimationDirection,
  EasingType,
  SpinnerAction,
} from "@/lib/spinner-types"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  RotateCw,
  RotateCcw,
  Activity,
  Waves,
  ArrowDown,
} from "lucide-react"

const DIRECTIONS: { value: AnimationDirection; icon: React.ReactNode; label: string }[] = [
  { value: "clockwise", icon: <RotateCw className="size-3.5" />, label: "CW" },
  { value: "counterclockwise", icon: <RotateCcw className="size-3.5" />, label: "CCW" },
  { value: "pulse", icon: <Activity className="size-3.5" />, label: "Pulse" },
  { value: "wave", icon: <Waves className="size-3.5" />, label: "Wave" },
  { value: "cascade", icon: <ArrowDown className="size-3.5" />, label: "Fall" },
]

const EASINGS: { value: EasingType; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "ease-in", label: "Ease In" },
  { value: "ease-out", label: "Ease Out" },
  { value: "ease-in-out", label: "Ease In-Out" },
  { value: "steps", label: "Steps" },
]

interface ControlsPanelProps {
  animation: AnimationConfig
  dispatch: (action: SpinnerAction) => void
}

export function ControlsPanel({ animation, dispatch }: ControlsPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* Direction */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Direction
        </label>
        <ToggleGroup
          type="single"
          value={animation.direction}
          onValueChange={(v) => {
            if (v) dispatch({ type: "SET_DIRECTION", direction: v as AnimationDirection })
          }}
          variant="outline"
          className="w-full"
        >
          {DIRECTIONS.map((d) => (
            <ToggleGroupItem
              key={d.value}
              value={d.value}
              className="flex-1 gap-1 text-[10px] font-mono"
              aria-label={d.label}
            >
              {d.icon}
              <span className="hidden sm:inline">{d.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Speed */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Speed
          </label>
          <span className="text-xs font-mono tabular-nums" style={{ color: "var(--rgb-red)" }}>
            {animation.speed}ms
          </span>
        </div>
        <Slider
          value={[animation.speed]}
          onValueChange={([v]) => dispatch({ type: "SET_SPEED", speed: v })}
          min={200}
          max={3000}
          step={50}
        />
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      {/* Easing */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Easing
        </label>
        <Select
          value={animation.easing}
          onValueChange={(v) => dispatch({ type: "SET_EASING", easing: v as EasingType })}
        >
          <SelectTrigger className="w-full h-9 text-xs font-mono">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EASINGS.map((e) => (
              <SelectItem key={e.value} value={e.value} className="text-xs font-mono">
                {e.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stagger */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Stagger
          </label>
          <span className="text-xs font-mono tabular-nums" style={{ color: "var(--rgb-blue)" }}>
            {animation.stagger}ms
          </span>
        </div>
        <Slider
          value={[animation.stagger]}
          onValueChange={([v]) => dispatch({ type: "SET_STAGGER", stagger: v })}
          min={0}
          max={200}
          step={5}
        />
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
          <span>None</span>
          <span>Max</span>
        </div>
      </div>
    </div>
  )
}
