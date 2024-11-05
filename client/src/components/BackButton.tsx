'use client'

import clsx from "clsx";
import { IconBackArrow } from "./icons";
import { useRouter } from "next/navigation";

interface Prop {
  className?: string
}

export function BackButton({ className = "left-36" }: Prop) {
  const router = useRouter()

  return (
    <button onClick={router.back} type="button" className={clsx("size-10 absolute ", className)}>
      <IconBackArrow />
    </button>
  )
}