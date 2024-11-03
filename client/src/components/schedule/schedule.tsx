"use client"

import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";


export function ScheduleDoctor() {

  const [date, setDate] = useState<Date | undefined>(new Date())
  const appointmentsStatus = {
    "2024-11-01": "unavailable",
    "2024-11-02": "available",
  };

  return (
    <div className="grid items-center gap-8 ">
      {/* CALENDARIO  */}
      <div className="">
        <Calendar
          className="col-span-2"
          mode="single"
          showOutsideDays={false}
          selected={date}
          onSelect={setDate}
          disabled={(date) => date.getDay() === 0 || format(date, 'yyyy-MM-dd') < format(new Date, 'yyyy-MM-dd')}
          appointmentsStatus={appointmentsStatus}
        />
      </div>
    </div>
  )
}
