import { useRef, useEffect } from 'react'

type Props = {
  height?: number
  opacity?: number
  webmSrc: string   // VP9 + alpha
  hevcSrc: string   // HEVC + alpha
  className?: string
}

export default function SmokeVideoBand({
  height = 160,
  opacity = 0.28,
  webmSrc,
  hevcSrc,
  className = '',
}: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    // autoplay hint for iOS
    v.muted = true
    const onCanPlay = () => v.play().catch(() => {})
    v.addEventListener('canplay', onCanPlay)
    return () => v.removeEventListener('canplay', onCanPlay)
  }, [])

  return (
    <section className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      <video
        ref={ref}
        playsInline
        loop
        muted
        autoPlay
        preload="auto"
        style={{ opacity }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        {/* Safari prefers HEVC with alpha if listed first */}
        <source src={hevcSrc}
          type='video/quicktime; codecs="hvc1.1.6.H120.b0"' />
        <source src={webmSrc} type="video/webm; codecs=vp9" />
      </video>
    </section>
  )
}
