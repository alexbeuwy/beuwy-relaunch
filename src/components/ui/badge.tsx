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
        /* Der eine Gelb-Moment — sparsam einsetzen. */
        default:
          "border-ink-yellow/25 bg-ink-yellow/12 text-ink-yellow [a]:hover:bg-ink-yellow/20",
        secondary:
          "border-white/10 bg-white/5 text-ink-muted [a]:hover:bg-white/10 [a]:hover:text-ink-cream",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive focus-visible:ring-destructive/25 [a]:hover:bg-destructive/20",
        outline:
          "border-white/15 text-ink-cream [a]:hover:bg-white/5",
        ghost:
          "text-ink-muted hover:bg-white/5 hover:text-ink-cream",
        link: "text-ink-yellow underline-offset-4 hover:underline",
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
