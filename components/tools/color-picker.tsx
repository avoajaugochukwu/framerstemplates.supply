'use client'

import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { Button, Input } from '@/components/ui'

interface ColorPickerProps {
  config?: unknown
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export default function ColorPicker({ config }: ColorPickerProps) {
  const [color, setColor] = React.useState('#3b82f6')
  const [copiedFormat, setCopiedFormat] = React.useState<string | null>(null)

  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
  ]

  const copyToClipboard = async (value: string, format: string) => {
    await navigator.clipboard.writeText(value)
    setCopiedFormat(format)
    setTimeout(() => setCopiedFormat(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Color Preview */}
      <div className="flex gap-6">
        <div
          className="h-48 w-48 rounded-lg shadow-inner"
          style={{ backgroundColor: color }}
        />
        <div className="flex flex-col justify-center">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-20 w-20 cursor-pointer rounded border-0"
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-4 w-32"
          />
        </div>
      </div>

      {/* Color Formats */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
          Color Formats
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {formats.map((format) => (
            <div
              key={format.label}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {format.label}
                </span>
                <p className="font-mono text-sm text-neutral-900 dark:text-white">
                  {format.value}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(format.value, format.label)}
              >
                {copiedFormat === format.label ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Color Info */}
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <h3 className="mb-3 text-sm font-medium text-neutral-900 dark:text-white">
          Color Values
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Red:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-white">
              {rgb.r}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Green:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-white">
              {rgb.g}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Blue:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-white">
              {rgb.b}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Hue:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-white">
              {hsl.h}°
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Sat:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-white">
              {hsl.s}%
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">Light:</span>
            <span className="ml-2 font-mono text-neutral-900 dark:text-white">
              {hsl.l}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
