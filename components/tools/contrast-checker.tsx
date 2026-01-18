'use client'

import * as React from 'react'
import { Check, X } from 'lucide-react'
import { Input, Badge } from '@/components/ui'

interface ContrastCheckerProps {
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

function getLuminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function getContrastRatio(color1: string, color2: string) {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

export default function ContrastChecker({ config: _config }: ContrastCheckerProps) {
  const [foreground, setForeground] = React.useState('#000000')
  const [background, setBackground] = React.useState('#ffffff')

  const contrastRatio = getContrastRatio(foreground, background)
  const roundedRatio = Math.round(contrastRatio * 100) / 100

  const passAANormal = contrastRatio >= 4.5
  const passAALarge = contrastRatio >= 3
  const passAAANormal = contrastRatio >= 7
  const passAAALarge = contrastRatio >= 4.5

  return (
    <div className="space-y-6">
      {/* Preview */}
      <div
        className="rounded-lg p-8 text-center"
        style={{ backgroundColor: background, color: foreground }}
      >
        <p className="text-sm">Small Text (14px)</p>
        <p className="mt-2 text-xl font-bold">Large Text (18px Bold)</p>
        <p className="mt-4 text-2xl">Sample Text Preview</p>
      </div>

      {/* Color Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white">
            Foreground (Text)
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded border-0"
            />
            <Input
              type="text"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white">
            Background
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="h-10 w-10 cursor-pointer rounded border-0"
            />
            <Input
              type="text"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Contrast Ratio */}
      <div className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Contrast Ratio
        </p>
        <p className="mt-1 text-4xl font-bold text-neutral-900 dark:text-white">
          {roundedRatio}:1
        </p>
      </div>

      {/* WCAG Results */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="mb-3 font-medium text-neutral-900 dark:text-white">
            WCAG AA
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Normal Text
              </span>
              <Badge variant={passAANormal ? 'success' : 'destructive'}>
                {passAANormal ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <X className="mr-1 h-3 w-3" />
                )}
                {passAANormal ? 'Pass' : 'Fail'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Large Text
              </span>
              <Badge variant={passAALarge ? 'success' : 'destructive'}>
                {passAALarge ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <X className="mr-1 h-3 w-3" />
                )}
                {passAALarge ? 'Pass' : 'Fail'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="mb-3 font-medium text-neutral-900 dark:text-white">
            WCAG AAA
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Normal Text
              </span>
              <Badge variant={passAAANormal ? 'success' : 'destructive'}>
                {passAAANormal ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <X className="mr-1 h-3 w-3" />
                )}
                {passAAANormal ? 'Pass' : 'Fail'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Large Text
              </span>
              <Badge variant={passAAALarge ? 'success' : 'destructive'}>
                {passAAALarge ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <X className="mr-1 h-3 w-3" />
                )}
                {passAAALarge ? 'Pass' : 'Fail'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        <p>
          <strong>WCAG AA:</strong> Requires 4.5:1 for normal text, 3:1 for large
          text (18px+ or 14px bold).
        </p>
        <p className="mt-1">
          <strong>WCAG AAA:</strong> Requires 7:1 for normal text, 4.5:1 for large
          text.
        </p>
      </div>
    </div>
  )
}
