'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const accordionVariants = cva('divide-y', {
  variants: {
    variant: {
      default: 'divide-neutral-200 dark:divide-neutral-800',
      bordered:
        'divide-neutral-200 border border-neutral-200 rounded-lg dark:divide-neutral-800 dark:border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default: '',
      bordered: 'first:rounded-t-lg last:rounded-b-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface AccordionContextValue {
  openItems: string[]
  toggleItem: (value: string) => void
  variant?: 'default' | 'bordered'
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion')
  }
  return context
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
}

function Accordion({
  children,
  className,
  variant,
  type = 'single',
  defaultValue,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === 'single') {
          return prev.includes(value) ? [] : [value]
        }
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      })
    },
    [type]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, variant: variant || 'default' }}>
      <div className={cn(accordionVariants({ variant }), className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function AccordionItem({ children, className, value, ...props }: AccordionItemProps) {
  const { variant } = useAccordion()
  return (
    <div
      className={cn(accordionItemVariants({ variant }), className)}
      data-value={value}
      {...props}
    >
      {children}
    </div>
  )
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

function AccordionTrigger({ children, className, value, ...props }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordion()
  const isOpen = openItems.includes(value)

  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline',
        className
      )}
      onClick={() => toggleItem(value)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  )
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function AccordionContent({ children, className, value, ...props }: AccordionContentProps) {
  const { openItems } = useAccordion()
  const isOpen = openItems.includes(value)

  return (
    <div
      className={cn(
        'overflow-hidden text-sm transition-all',
        isOpen ? 'animate-accordion-down' : 'animate-accordion-up h-0'
      )}
      {...props}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionVariants }
