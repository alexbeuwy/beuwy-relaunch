"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        [
          "peer group/switch relative inline-flex shrink-0 items-center rounded-full border-2",
          // vergroesserte Trefferflaeche fuer den Daumen, ohne das Layout zu stoeren
          "after:absolute after:-inset-x-3 after:-inset-y-2",
          "transition-colors duration-200 ease-out motion-reduce:transition-none",
          "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40",
          "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/25",
          "data-[size=default]:h-6 data-[size=default]:w-11",
          "data-[size=sm]:h-5 data-[size=sm]:w-9",
          // Aus: ruhige Glasflaeche. An: der eine Gelb-Moment.
          "data-unchecked:border-white/10 data-unchecked:bg-white/10",
          "data-unchecked:hover:bg-white/15",
          "data-checked:border-transparent",
          "data-checked:bg-[linear-gradient(180deg,#F7E99A_0%,#EEDA7E_100%)]",
          "data-disabled:cursor-not-allowed data-disabled:opacity-45",
        ].join(" "),
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-ink-cream",
          "shadow-[0_1px_2px_rgba(0,0,0,0.5)] ring-0",
          "transition-transform duration-200 ease-out motion-reduce:transition-none",
          "group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-4",
          "data-unchecked:translate-x-0 data-checked:translate-x-full"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
