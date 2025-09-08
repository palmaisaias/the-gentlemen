import { useEffect, useRef } from 'react'

type Props = {
  opacity?: number
  debug?: boolean
  label?: string
  variant?: 'overlay' | 'band'   // new
  height?: number                // only used when variant='band'
}

export default function SmokeOverlay({
  opacity = 0.25,
  debug = false,
  label = 'SMOKE',
  variant = 'overlay',
  height = 140,
}: Props) {
  const turbRef = useRef<SVGFETurbulenceElement | null>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null)

  useEffect(() => {
    let raf = 0, t = 0
    const loop = () => {
      t += 0.0025
      const turb = turbRef.current
      const disp = dispRef.current
      if (turb) {
        const freq = 0.0048 + Math.sin(t) * 0.002
        turb.setAttribute('baseFrequency', `${freq} ${freq * 0.5}`)
        turb.setAttribute('seed', ((t * 25) % 1000).toFixed(2))
      }
      if (disp) {
        const scale = 22 + Math.cos(t * 0.6) * 8
        disp.setAttribute('scale', scale.toFixed(1))
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const isBand = variant === 'band'

  return (
    <div
      data-test-id="smoke-overlay"
      className={
        isBand
          ? 'relative w-full pointer-events-none overflow-hidden'
          : `pointer-events-none absolute inset-0 z-50 overflow-hidden`
      }
      style={isBand ? { height, opacity } : { opacity }}
    >
      <svg
        role="img"
        aria-label="smoke overlay"
        className={isBand ? 'w-full h-full' : 'w-[200%] h-full -translate-x-1/4 mix-blend-screen'}
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="smoke" x="-40" y="-20" width="280" height="140" filterUnits="userSpaceOnUse">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.006 0.003"
              numOctaves="2"
              seed="2"
              result="noise"
            />
            <feColorMatrix in="noise" type="saturate" values="0" result="mono" />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="mono"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <g filter="url(#smoke)">
          <rect width="200" height="100" fill="url(#grad)" />
        </g>

        {debug && (
          <g>
            <rect x="10" y="8" width="180" height="18" fill="black" opacity="0.3" rx="3" />
            <text x="100" y="22" textAnchor="middle" dominantBaseline="middle" fontSize="10"
              fontFamily="Cormorant Garamond, serif" fill="#C4A44F" stroke="black" strokeWidth="0.4">
              {label}
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}
