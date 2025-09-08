import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export class VideoController {
  private el: HTMLVideoElement | null = null
  attach = (el: HTMLVideoElement | null) => (this.el = el)
  play = async () => { await this.el?.play() }
  pause = () => { this.el?.pause() }
  toggle = async () => { if (!this.el) return; this.el.paused ? await this.el.play() : this.el.pause() }
  mute = (m: boolean) => { if (this.el) this.el.muted = m }
  setVolume = (v: number) => { if (this.el) this.el.volume = Math.min(1, Math.max(0, v)) }
}

type Props = {
  src: string
  poster?: string
  controller?: VideoController
}

export default function VideoPlayer({ src, poster, controller }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    controller?.attach(ref.current)
  }, [controller])

  return (
    <motion.div
      className="rounded-2xl overflow-hidden border border-[rgba(196,164,79,0.25)] bg-[#0F0F0F]/60 backdrop-blur"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      <video
        ref={ref}
        className="w-full aspect-video bg-black"
        src={"https://gentle-giants.sfo3.cdn.digitaloceanspaces.com/grentle-giants.mp4"}
        poster={poster}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="flex items-center justify-between px-4 py-3 text-xs text-[rgba(243,233,210,0.8)]">
        <span>{isPlaying ? 'Playing' : 'Paused'}</span>
        <span className="gold">Double-click video for fullscreen</span>
      </div>
    </motion.div>
  )
}
