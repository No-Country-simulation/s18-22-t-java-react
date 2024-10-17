'use client'

import { IconBackArrow } from "./icons";
import { useRouter } from "next/navigation";


export function BackButton() {
  const router = useRouter()

  return (
    <button onClick={router.back} type="button" className="size-10 absolute left-36">
      <IconBackArrow />
    </button>
  )
}