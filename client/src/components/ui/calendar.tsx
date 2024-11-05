"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { es } from 'date-fns/locale';

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps & { appointmentsStatus?: { [key: string]: string } }) {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ",
        month: "space-y-4 grow ",
        caption: "flex justify-center w-[300px] pt-1 relative items-center mb-4",
        caption_label: "text-2xl font-medium capitalize",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex ",
        head_cell:
          "text-gray-800 rounded-md w-full font-bold capitalize",
        row: "flex w-full mt-2 gap-2",
        cell: "h-20 w-9 grow p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full p-0 font-normal aria-selected:opacity-100 border border-[#97A1A3] bg-[#B1CDE5] rounded-sm"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-secondaryBlue-400 text-primary-foreground hover:bg-secondaryBlue-400 hover:text-primary-foreground focus:bg-secondaryBlue-400 focus:text-primary-foreground ",
        day_today: "bg-primary/70  text-white ",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50 ",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground ",
        day_hidden: "invisible ",
        ...classNames,
      }}

      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4 " />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
