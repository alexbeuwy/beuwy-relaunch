"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-4 data-horizontal:flex-col", className)}
      {...props}
    />
  )
}

/* Ruhige Segmented-Control: gedaempfte Grundflaeche, aktives Feld leicht erhoeht. */
const tabsListVariants = cva(
  [
    "group/tabs-list inline-flex w-fit max-w-full items-center justify-center",
    "rounded-[12px] p-1 text-ink-muted",
    "group-data-horizontal/tabs:h-11",
    "group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
    "group-data-vertical/tabs:rounded-[12px]",
    // auf schmalen Displays lieber schieben als umbrechen
    "overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
    "data-[variant=line]:rounded-none data-[variant=line]:overflow-visible",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "border border-white/10 bg-white/5",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        ].join(" "),
        line: "gap-1 border-0 bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        [
          "relative inline-flex h-full flex-1 shrink-0 items-center justify-center gap-2",
          "rounded-[9px] border border-transparent! px-3.5",
          "text-sm font-medium whitespace-nowrap text-ink-muted",
          "transition-[background-color,color,box-shadow] duration-150 ease-out",
          "motion-reduce:transition-none",
          "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
          "group-data-vertical/tabs:px-3 group-data-vertical/tabs:py-2",
          "hover:text-ink-cream",
          "outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
          "disabled:pointer-events-none disabled:opacity-45",
          "aria-disabled:pointer-events-none aria-disabled:opacity-45",
          "has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
        // aktives Feld: leicht erhoehte Flaeche, Text in Creme
        [
          "data-active:bg-bg-hover data-active:text-ink-cream",
          "data-active:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_1px_2px_rgba(0,0,0,0.4)]",
        ].join(" "),
        // Variante "line": kein Feld, nur ein feiner gelber Strich
        [
          "group-data-[variant=line]/tabs-list:bg-transparent",
          "group-data-[variant=line]/tabs-list:data-active:bg-transparent",
          "group-data-[variant=line]/tabs-list:data-active:shadow-none",
          "after:absolute after:bg-ink-yellow after:opacity-0 after:transition-opacity",
          "motion-reduce:after:transition-none",
          "group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5",
          "group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5",
          "group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(
        "flex-1 text-sm outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/30 rounded-[10px]",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
