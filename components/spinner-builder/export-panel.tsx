"use client"

import { useMemo, useState } from "react"
import type { SpinnerConfig } from "@/lib/spinner-types"
import { generateCSSExport, generateReactExport } from "@/lib/spinner-export"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check, Copy, FileCode2, Braces } from "lucide-react"

interface ExportPanelProps {
  config: SpinnerConfig
}

export function ExportPanel({ config }: ExportPanelProps) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const cssCode = useMemo(() => generateCSSExport(config), [config])
  const reactCode = useMemo(() => generateReactExport(config), [config])

  const handleCopy = async (code: string, tab: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedTab(tab)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = code
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedTab(tab)
      setTimeout(() => setCopiedTab(null), 2000)
    }
  }

  const hasActiveCells = config.cells.some((row) =>
    row.some((cell) => cell.active)
  )

  if (!hasActiveCells) {
    return (
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Export
        </h3>
        <div
          className="rounded-lg p-6 flex items-center justify-center"
          style={{
            background: "var(--surface-1)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <p className="text-xs font-mono text-muted-foreground text-center">
            Design your spinner to export code
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Export
      </h3>
      <Tabs defaultValue="css">
        <TabsList className="w-full">
          <TabsTrigger value="css" className="flex-1 gap-1.5 text-xs font-mono">
            <FileCode2 className="size-3" />
            CSS + HTML
          </TabsTrigger>
          <TabsTrigger value="react" className="flex-1 gap-1.5 text-xs font-mono">
            <Braces className="size-3" />
            React
          </TabsTrigger>
        </TabsList>

        <TabsContent value="css" className="relative">
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 cursor-pointer"
              onClick={() => handleCopy(cssCode, "css")}
              aria-label="Copy CSS code"
            >
              {copiedTab === "css" ? (
                <Check className="size-3.5" style={{ color: "var(--rgb-green)" }} />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>
          <pre
            className="rounded-lg p-4 text-[11px] leading-relaxed font-mono overflow-auto max-h-[300px]"
            style={{
              background: "var(--surface-1)",
              border: "1px solid rgba(255,255,255,0.04)",
              color: "var(--muted-foreground)",
            }}
          >
            <code>{cssCode}</code>
          </pre>
        </TabsContent>

        <TabsContent value="react" className="relative">
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 cursor-pointer"
              onClick={() => handleCopy(reactCode, "react")}
              aria-label="Copy React code"
            >
              {copiedTab === "react" ? (
                <Check className="size-3.5" style={{ color: "var(--rgb-green)" }} />
              ) : (
                <Copy className="size-3.5" />
              )}
            </Button>
          </div>
          <pre
            className="rounded-lg p-4 text-[11px] leading-relaxed font-mono overflow-auto max-h-[300px]"
            style={{
              background: "var(--surface-1)",
              border: "1px solid rgba(255,255,255,0.04)",
              color: "var(--muted-foreground)",
            }}
          >
            <code>{reactCode}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  )
}
