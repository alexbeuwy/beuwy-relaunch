import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        [
          "group/card flex flex-col gap-(--card-spacing) overflow-hidden",
          "rounded-[14px] bg-card py-(--card-spacing)",
          "text-sm text-card-foreground",
          // ruhige Karte: 1px Kontur plus feiner Lichtsaum an der Oberkante
          "border border-white/10",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.4)]",
          "[--card-spacing:--spacing(6)] data-[size=sm]:[--card-spacing:--spacing(4)]",
          "has-[>img:first-child]:pt-0",
          "*:[img:first-child]:rounded-t-[14px] *:[img:last-child]:rounded-b-[14px]",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-[14px] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-[0.9375rem] leading-tight font-medium text-ink-cream",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-ink-muted", className)}
      {...props}
    />
  )
}

/**
 * Grosse Kennzahl im Headline-Schnitt (Helvena). Ziffern laufen tabellarisch,
 * damit die Karte beim Aktualisieren nicht springt.
 */
function CardValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-value"
      className={cn(
        "font-display text-[2.5rem] leading-none tracking-display tabular-nums text-ink-cream",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-3 rounded-b-[14px] px-(--card-spacing) [.border-t]:border-white/10 [.border-t]:pt-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardValue,
}
