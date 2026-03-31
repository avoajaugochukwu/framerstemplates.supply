'use client'

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui'
import { faqData } from '@/lib/data/faq'

export function FAQSection() {
  return (
    <section className="border-t border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Got Questions? We Got You.
          </h2>
          <p className="mt-2 text-sm text-muted">
            The short answers to what people ask before they remix their first template
          </p>
        </div>
        <div className="mt-12">
          <Accordion type="single" variant="bordered">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  value={`item-${index}`}
                  className="px-4 text-foreground"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  value={`item-${index}`}
                  className="px-4 text-muted"
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
