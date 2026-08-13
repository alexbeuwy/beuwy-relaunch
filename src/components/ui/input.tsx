import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        [
          "h-11 w-full min-w-0 rounded-[10px] px-3.5 py-1",
          "border border-input bg-card text-foreground",
          // 16px auf Mobil verhindert den iOS-Zoom beim Fokussieren
          "text-base md:text-[0.9375rem]",
          "transition-[color,box-shadow,background-color,border-color] duration-150 ease-out",
          "motion-reduce:transition-none",
          "placeholder:text-ink-dim",
          "hover:border-line-strong/30",
          "outline-none focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-ring/40",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink-muted",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45",
          "aria-invalid:border-destructive/60 aria-invalid:ring-3 aria-invalid:ring-destructive/25",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

export { Input }
