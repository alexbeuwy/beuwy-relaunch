import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "border border-transparent bg-clip-padding",
    "rounded-[10px] font-medium whitespace-nowrap select-none",
    "tracking-[-0.005em]",
    // Bewegung nur, wenn der Nutzer sie zulaesst
    "transition-[background-color,box-shadow,color,border-color,transform]",
    "duration-150 ease-out motion-reduce:transition-none",
    "motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
    // Fokus: Ultramarin-Ring aus --ring
    "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40",
    "disabled:pointer-events-none disabled:opacity-45",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/30",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Primaer — flache Ultramarin-Flaeche (Riso: Schmuckfarbe, kein
           Verlauf, kein Glanz). Hover = tieferes Ultramarin. */
        default: "bg-sky text-snow hover:bg-sky-deep",
        /* Sekundaer — Kontur auf Papier */
        secondary: [
          "text-ink-cream bg-transparent",
          "shadow-[inset_0_0_0_1px_var(--line-medium)]",
          "hover:bg-(--sky-wash) hover:text-sky",
          "hover:shadow-[inset_0_0_0_1px_rgba(12,75,195,0.45)]",
          "aria-expanded:bg-(--sky-wash)",
        ].join(" "),
        /* Outline — nur Kontur, fuer tertiaere Aktionen */
        outline: [
          "text-ink-cream bg-transparent border-line-medium",
          "hover:border-ink-cream hover:bg-(--sky-wash)",
          "aria-expanded:bg-(--sky-wash)",
        ].join(" "),
        ghost: [
          "text-ink-muted bg-transparent",
          "hover:bg-(--sky-wash) hover:text-ink-cream",
          "aria-expanded:bg-(--sky-wash) aria-expanded:text-ink-cream",
        ].join(" "),
        link: [
          "text-sky bg-transparent",
          "underline underline-offset-4 decoration-sky/40",
          "hover:decoration-sky",
        ].join(" "),
        destructive: [
          "text-destructive bg-destructive/10 border-destructive/25",
          "hover:bg-destructive/20 hover:border-destructive/40",
          "focus-visible:border-destructive/50 focus-visible:ring-destructive/25",
        ].join(" "),
      },
      size: {
        /* default und lg liegen ueber 44px — bequem fuer den Daumen */
        default: "h-11 gap-2 px-5 text-[0.9375rem]",
        xs: "h-7 gap-1 px-2.5 text-xs rounded-[7px] [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-3.5 text-sm rounded-[9px]",
        /* Hero-CTA */
        lg: "h-[52px] gap-2.5 px-7 text-base rounded-[12px]",
        icon: "size-11",
        "icon-xs": "size-7 rounded-[7px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 rounded-[9px]",
        "icon-lg": "size-[52px] rounded-[12px]",
      },
    },
    /* Der Textlink traegt keine Flaeche — Hoehe, Innenabstand und Radius
       der Groessen werden hier bewusst wieder zurueckgenommen. */
    compoundVariants: [
      {
        variant: "link",
        class:
          "h-auto rounded-none px-0 motion-safe:hover:translate-y-0 motion-safe:active:scale-100",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant ?? "default"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
