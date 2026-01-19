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
    <section className="border-t border-neutral-200 bg-neutral-50 px-4 py-24 dark:border-neutral-800 dark:bg-neutral-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-12">
          <Accordion type="single" variant="bordered">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  value={`item-${index}`}
                  className="px-4 text-neutral-900 dark:text-white"
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  value={`item-${index}`}
                  className="px-4 text-neutral-600 dark:text-neutral-400"
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
