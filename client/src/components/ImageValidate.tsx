import Image from "next/image";

interface Props {
    src: string
    alt: string
    size?: string
    className?: string
}

export default function ImageValidate({ alt, className, size = "(max-width: 768px) 100px", src }: Props) {

    const isValidSrc = src && (src.startsWith('/') || src.startsWith('http'));

    return (
        <figure className="relative rounded-full size-[88px] overflow-hidden">

            {
                isValidSrc ? (
                    <Image
                        src={src}
                        fill
                        sizes={size}
                        alt={alt}
                        className={className}
                    />
                ) : (
                    <Image
                        src={"https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png"}
                        fill
                        sizes={size}
                        alt={alt}
                        className={className}
                    />
                )
            }
        </figure>
    )
}
