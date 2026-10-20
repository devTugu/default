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

const items = [
  {
    value: "billing",
    trigger: "How does billing work?",
    content:
      "We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members.",
  },
  {
    value: "security",
    trigger: "Is my data secure?",
    content:
      "Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols.",
  },
  {
    value: "integration",
    trigger: "What integrations do you support?",
    content:
      "We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.",
  },
  {
    value: "support",
    trigger: "How do I contact customer support?",
    content:
      "Our support team is available 24/7. You can reach out to us via live chat, email, or by submitting a ticket through your dashboard. Priority support is available for Enterprise plans.",
  },
];

export function Accordion09AnimatedLine() {
  return (
    <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl">
      <Accordion type="single" collapsible defaultValue="billing" className="flex w-full flex-col">
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className={cn(
              "not-last:border-b border-0! my-0 rounded-none bg-muted py-2 transition-all duration-700 ease-in-out",
              "data-[state=open]:mt-0 data-[state=open]:mb-4 data-[state=open]:rounded-lg",
              "[[data-state=open]+&]:rounded-t-lg [&:has(+[data-state=open])]:rounded-b-lg",
            )}
          >
            <AccordionTrigger
              hideChevron
              className="cursor-pointer items-start px-5 py-2.5 text-base font-medium hover:no-underline"
            >
              <span className="flex-1 text-left">{item.trigger}</span>
              <PlusIcon className="size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden" />
              <MinusIcon className="hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline-flex" />
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-3 text-sm text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
