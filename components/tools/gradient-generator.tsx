'use client'

import * as React from 'react'
import { Copy, Check, Plus, X } from 'lucide-react'
import { Button, Input } from '@/components/ui'

interface ColorStop {
  id: string
  color: string
  position: number
}

interface GradientGeneratorProps {
  config?: unknown
}

export default function GradientGenerator({ config: _config }: GradientGeneratorProps) {
  const [gradientType, setGradientType] = React.useState<'linear' | 'radial' | 'conic'>('linear')
  const [angle, setAngle] = React.useState(90)
  const [colorStops, setColorStops] = React.useState<ColorStop[]>([
    { id: '1', color: '#3b82f6', position: 0 },
    { id: '2', color: '#8b5cf6', position: 100 },
  ])
  const [copied, setCopied] = React.useState(false)

  const generateCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(', ')

    switch (gradientType) {
      case 'linear':
        return `linear-gradient(${angle}deg, ${stops})`
      case 'radial':
        return `radial-gradient(circle, ${stops})`
      case 'conic':
        return `conic-gradient(from ${angle}deg, ${stops})`
      default:
        return `linear-gradient(${angle}deg, ${stops})`
    }
  }

  const cssCode = generateCSS()

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`background: ${cssCode};`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addColorStop = () => {
    const newId = Date.now().toString()
    const newPosition = Math.round(
      colorStops.reduce((sum, stop) => sum + stop.position, 0) / colorStops.length
    )
    setColorStops([
      ...colorStops,
      { id: newId, color: '#10b981', position: newPosition },
    ])
  }

  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((stop) => stop.id !== id))
    }
  }

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(
      colorStops.map((stop) => (stop.id === id ? { ...stop, ...updates } : stop))
    )
  }

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div
        className="aspect-video w-full rounded-lg"
        style={{ background: cssCode }}
      />

      {/* Controls */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white">
              Gradient Type
            </label>
            <div className="flex gap-2">
              {(['linear', 'radial', 'conic'] as const).map((type) => (
                <Button
                  key={type}
                  variant={gradientType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setGradientType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {(gradientType === 'linear' || gradientType === 'conic') && (
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white">
                Angle: {angle}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-900 dark:text-white">
              Color Stops
            </label>
            <Button variant="outline" size="sm" onClick={addColorStop}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {colorStops.map((stop) => (
              <div key={stop.id} className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                  className="h-10 w-10 cursor-pointer rounded border-0"
                />
                <Input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={stop.position}
                  onChange={(e) =>
                    updateColorStop(stop.id, { position: Number(e.target.value) })
                  }
                  className="w-20"
                />
                <span className="text-sm text-neutral-500">%</span>
                {colorStops.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColorStop(stop.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-start justify-between gap-4">
          <code className="flex-1 break-all text-sm text-neutral-700 dark:text-neutral-300">
            background: {cssCode};
          </code>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Copied
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
