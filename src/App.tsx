import Header from './components/Header/Header'
import VideoPlayer, { VideoController } from './components/VideoPlayer/VideoPlayer'
import ThemedGame from './components/Game/ThemedGame'
import RecipeCard from './components/Recipes/RecipeCard'
import { theme } from './lib/theme'
import { motion } from 'framer-motion'
import { useMemo } from 'react'


export default function App() {
  const vc = useMemo(() => new VideoController(), [])

  return (
    <div className="relative min-h-dvh isolate">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage: 'url(/assets/bg-tweed-placeholder.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '50% 40%',
          }}
          aria-hidden
        />
        <Header crestSrc="/assets/crest-placeholder.png" />
      </section>

      {/* Smoke band between header and game */}
      {/* <section className="relative">
  <SmokeVideoBand
    height={160}
    opacity={0.30}
    hevcSrc="/assets/smoke-hevc.mov"     // HEVC + alpha
    webmSrc="/assets/smoke-alpha.webm"    // VP9 + alpha
  />
</section> */}

      <main className="relative w-full max-w-6xl mx-auto px-6 pb-24 space-y-10">
        {/* Game row */}
        <section className="pt-8">
          <ThemedGame />
        </section>

        {/* Recipes row */}
        <section className="grid gap-6 md:grid-cols-2">
          <RecipeCard
            kind="snack"
            title="Charcuterie with Dark Chocolate & Sea Salt"
            image="/assets/snack-placeholder.jpg"
            bullets={[
              'Sharp cheddar, aged gouda, cured meats',
              '72% dark chocolate + flaky salt',
              'Figs, Marcona almonds, seeded crackers',
            ]}
          />
          <RecipeCard
            kind="cocktail"
            title="Old Fashioned, Orange Bitters"
            image="/assets/cocktail-placeholder.jpg"
            bullets={[
              '2 oz bourbon/rye, 1 sugar cube',
              '3 dashes orange bitters, orange peel',
              'Big cube; stir 20–30s',
            ]}
          />
          <RecipeCard
            kind="cocktail"
            title="Ely's Fuck-All Whiskey"
            image="/assets/muppet.jpg"
            bullets={[
              "Pick a whiskey. Any bottle.",
              "Pour 2 to 3 oz into a glass.",
              "That's it.",
            ]}
          />
          <RecipeCard
            kind="cocktail"
            title="Ely's Creativity on Display"
            image="/assets/beer.jpg"
            bullets={[
              "Beer.",
              "Open one. Then another.",
              "Repeat until ideas feel brilliant.",
            ]}
          />
        </section>

        {/* Video */}
        <section className="space-y-3">
          <motion.h2
            className="text-xl font-semibold"
            style={{ fontFamily: theme.titleFont }}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Feature Presentation
          </motion.h2>
          <VideoPlayer
            src="https://gentle-giants.sfo3.cdn.digitaloceanspaces.com/grentle-giants.mp4"
            poster="/assets/the-gentlemen-poster-placeholder.jpg"
            controller={vc}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-xs opacity-60">
        For private movie night use...PPPFFFFTTT
      </footer>
    </div>
  )
}
