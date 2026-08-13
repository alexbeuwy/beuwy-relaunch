import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max]

  return (
    <SliderPrimitive.Root
      className={cn("data-horizontal:w-full data-vertical:h-full", className)}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center py-2 select-none data-disabled:opacity-45 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col data-vertical:px-2 data-vertical:py-0">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "relative grow overflow-hidden rounded-full select-none",
            "bg-[rgba(16,25,15,0.16)]",
            /* horizontal ist der Standardfall — feste Höhe statt nur
               data-Variante, sonst kollabiert der Track auf 0px */
            "h-1.5 w-full",
            "data-vertical:h-full data-vertical:w-1.5"
          )}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={cn(
              "select-none bg-primary",
              "h-full data-vertical:w-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(
              "block size-5 shrink-0 rounded-full select-none",
              // Schnee-Griff mit Ultramarin-Kontur, flach
              "bg-snow border-2 border-primary",
              "transition-[box-shadow,transform] duration-150 ease-out",
              "motion-reduce:transition-none",
              "motion-safe:hover:scale-105 motion-safe:active:scale-95",
              "focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-hidden",
              "disabled:pointer-events-none disabled:opacity-45",
              // auf Touch-Geraeten etwas groesser
              "pointer-coarse:size-6"
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
