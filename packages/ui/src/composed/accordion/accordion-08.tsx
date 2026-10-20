// @ts-nocheck
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@default/ui/primitives/accordion";
import { cn } from "@default/ui/lib/cn";
import { MinusIcon, PlusIcon } from "lucide-react";

const faqData = [
  {
    question: "How do I get started with the component library?",
    answer:
      "Getting started is simple — install the package, import the components you need, and drop them into your project. Each component follows shadcn/ui conventions and works seamlessly with your existing setup.",
  },
  {
    question: "Can I customize the styles to match my brand?",
    answer:
      "Absolutely. All components are built with Tailwind CSS and design tokens, so you can override colors, spacing, and typography via your globals.css or by passing a className prop directly to any component.",
  },
  {
    question: "Are the components accessible by default?",
    answer:
      "Yes. Every component is built on top of Radix UI primitives, which handle keyboard navigation, focus management, and ARIA attributes out of the box, ensuring WCAG-compliant accessibility from day one.",
  },
];

export function Accordion08AnimatedLine() {
  return (
    <div className="flex w-full max-w-lg items-center justify-center">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="flex w-full flex-col border-x border-border"
      >
        {faqData.map((faq, index) => (
          <AccordionItem
            key={faq.question}
            value={`item-${index}`}
            className={cn(
              "group/item relative flex flex-col transition-colors not-last:border-b first:border-t last:border-b border-border",
              "animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700",
              index === 0 && "delay-100",
              index === 1 && "delay-200",
              index === 2 && "delay-300",
            )}
          >
            <AccordionTrigger
              hideChevron
              className="cursor-pointer items-start gap-5 px-6 py-6 text-base font-medium hover:no-underline"
            >
              <span className="flex-1 text-left">{faq.question}</span>
              <PlusIcon className="size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden" />
              <MinusIcon className="hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline-flex" />
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-muted-foreground">
              {faq.answer}
            </AccordionContent>
            <span
              aria-hidden
              className="absolute top-0 right-0 left-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-data-[state=open]/item:scale-x-100"
            />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
