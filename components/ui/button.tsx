import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm hover:shadow-md hover:brightness-110',
        secondary: 'bg-accent-subtle text-foreground hover:bg-accent-subtle/80 border border-border-subtle',
        outline: 'border border-border bg-transparent text-foreground hover:bg-accent-subtle/50 hover:border-accent/20',
        ghost: 'text-muted hover:bg-accent-subtle/50 hover:text-foreground',
        link: 'text-accent underline-offset-4 hover:underline',
        destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-sm',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 rounded-lg px-3.5',
        lg: 'h-12 rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
