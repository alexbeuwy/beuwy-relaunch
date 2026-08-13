import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5",
    "overflow-hidden rounded-full border border-transparent px-2.5 py-0.5",
    "text-xs font-medium tracking-[0.01em] whitespace-nowrap select-none",
    "transition-colors duration-150 ease-out motion-reduce:transition-none",
    "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40",
    "has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/25",
    "[&>svg]:pointer-events-none [&>svg]:size-3!",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Primaer — flache Ultramarin-Flaeche */
        default:
          "bg-primary text-primary-foreground [a]:hover:bg-sky-deep",
        /* Neutral */
        secondary:
          "bg-muted text-foreground [a]:hover:bg-accent",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive focus-visible:ring-destructive/25 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
