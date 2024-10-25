"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { SpecialityCard } from "@/ui"
import { DoctorFromResponse } from "@/interfaces/user"
import { IconSliderArrow } from "../icons"

export function SwiperList({ list }: { list: DoctorFromResponse[] }) {

  return (
    <div className="flex relative">
      <Swiper
        spaceBetween={4}
        slidesPerView={5}
        modules={[Navigation]}
        navigation={{ nextEl: '.next-arrow', prevEl: '.prev-arrow' }}
      >
        {
          list.map((doctor, i) => (
            <SwiperSlide key={i} className="relative">
              <SpecialityCard name={doctor.specialization} img="" />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="prev-arrow absolute -left-10 top-[90px] cursor-pointer select-none">
        <IconSliderArrow />
      </div>
      <div className="next-arrow absolute -right-8 top-[90px] cursor-pointer select-none">
        <IconSliderArrow className="rotate-180" />
      </div>
    </div>
  )
}
