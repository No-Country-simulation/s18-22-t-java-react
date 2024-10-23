"use client"

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { SpecialityCard } from "@/ui"
import { DoctorFromResponse } from "@/interfaces/user"
import { useCallback, useRef } from "react"
import { IconSliderArrow } from "../icons"

export function SwiperList({ list }: { list: DoctorFromResponse[] }) {

  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <div className="flex relative">
      <Swiper
        ref={sliderRef}
        spaceBetween={4}
        slidesPerView={5}
        modules={[Navigation]}
      >
        {
          list.map((doctor, i) => (
            <SwiperSlide key={i} className="relative">
              <SpecialityCard name={doctor.specialization} img="" />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="prev-arrow absolute -left-10 top-[90px] cursor-pointer select-none	" onClick={handlePrev}>
        <IconSliderArrow />
      </div>
      <div className="next-arrow absolute -right-8 top-[90px] cursor-pointer select-none	" onClick={handleNext}>
        <IconSliderArrow className="rotate-180" />
      </div>
    </div>
  )
}
