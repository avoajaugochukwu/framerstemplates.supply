import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-accent text-white',
        secondary:
          'border-border-subtle bg-accent-subtle/50 text-muted',
        outline: 'border-border text-muted',
        success:
          'border-transparent bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        warning:
          'border-transparent bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
        destructive:
          'border-transparent bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
