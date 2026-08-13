import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/lib/utils"
import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        [
          "flex w-full flex-col overflow-hidden rounded-[14px]",
          "border border-border bg-card",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b not-last:border-border data-open:bg-muted", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          [
            "group/accordion-trigger relative flex flex-1 items-start justify-between gap-6",
            "border border-transparent px-5 py-4 sm:px-6",
            "text-left text-[0.9375rem] font-medium text-ink-cream",
            "transition-colors duration-150 ease-out motion-reduce:transition-none",
            "cursor-pointer hover:bg-muted/60",
            "outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/40",
            "aria-disabled:pointer-events-none aria-disabled:opacity-45",
            "**:data-[slot=accordion-trigger-icon]:ml-auto",
            "**:data-[slot=accordion-trigger-icon]:size-4",
            "**:data-[slot=accordion-trigger-icon]:text-ink-muted",
            "group-aria-expanded/accordion-trigger:**:data-[slot=accordion-trigger-icon]:text-ink-yellow",
          ].join(" "),
          className
        )}
        {...props}
      >
        {children}
        <RiArrowDownSLine data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <RiArrowUpSLine data-slot="accordion-trigger-icon" className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden px-5 text-sm text-ink-muted sm:px-6 data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          [
            "h-(--accordion-panel-height) pt-0 pb-5 leading-relaxed sm:pb-6",
            "data-ending-style:h-0 data-starting-style:h-0",
            "[&_a]:text-ink-yellow [&_a]:underline [&_a]:underline-offset-3",
            "[&_a]:hover:text-ink-cream",
            "[&_p:not(:last-child)]:mb-4",
          ].join(" "),
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
