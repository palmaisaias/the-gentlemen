import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type QA = { term: string; definition: string }
type Question = { prompt: string; answer: string; options: string[] }

class GameEngine {
  private bank: QA[]
  private deck: QA[] = []

  constructor(items: QA[]) {
    this.bank = [...items]
    this.reset()
  }

  reset() {
    this.deck = this.shuffle(this.bank)
  }

  hasNext() {
    return this.deck.length > 0
  }

  private sampleDistractors(correct: QA, n: number): string[] {
    const pool = this.bank.filter(q => q.term !== correct.term)
    const picks: string[] = []
    const a = this.shuffle(pool)
    for (let i = 0; i < a.length && picks.length < n; i++) {
      const t = a[i].term
      if (!picks.includes(t)) picks.push(t)
    }
    return picks
  }

  private shuffle<T>(arr: T[]) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  makeQuestion(): Question | null {
    if (!this.hasNext()) return null
    const correct = this.deck.pop()!
    const distractors = this.sampleDistractors(correct, 3)
    const options = this.shuffle([correct.term, ...distractors])
    return { prompt: correct.definition, answer: correct.term, options }
  }
}

const BANK: QA[] = [
  // Original set
  { term: 'grass',   definition: 'informer to the police' },
  { term: 'gaff',    definition: 'house or place' },
  { term: 'quid',    definition: 'one pound sterling' },
  { term: 'dodgy',   definition: 'suspicious or untrustworthy' },
  { term: 'skint',   definition: 'broke, out of money' },
  { term: 'geezer',  definition: 'man, often tough or streetwise' },
  { term: 'nick',    definition: 'to steal; also a police station' },
  { term: 'row',     definition: 'heated argument' },
  { term: 'minder',  definition: 'bodyguard or protector' },
  { term: 'sorted',  definition: 'taken care of, handled' },

  // Added set (no repeats in prompts this round)
  { term: 'bent',            definition: 'corrupt (esp. a cop or official)' },
  { term: 'bird',            definition: 'prison sentence' },
  { term: 'blag',            definition: 'robbery; to obtain by deception' },
  { term: 'banged up',       definition: 'imprisoned, locked up' },
  { term: 'Old Bill',        definition: 'the police' },
  { term: 'plod',            definition: 'police officer; the police' },
  { term: 'copper',          definition: 'police officer' },
  { term: 'screw',           definition: 'prison officer/guard' },
  { term: 'nark',            definition: 'police informant' },
  { term: 'lag',             definition: 'convict; prisoner' },
  { term: 'on remand',       definition: 'held in custody awaiting trial' },
  { term: 'nicked',          definition: 'arrested' },
  { term: 'cosh',            definition: 'blunt weapon used to strike' },
  { term: 'mug',             definition: 'to rob with violence' },
  { term: 'fence',           definition: 'dealer in stolen goods' },
  { term: 'banged to rights',definition: 'caught red-handed with proof' },
  { term: 'tool up',         definition: 'arm oneself with weapons' },
  { term: 'villain',         definition: 'career criminal' },
  { term: 'chancer',         definition: 'opportunist who takes risky chances' },
  { term: 'gaffer',          definition: 'boss; person in charge' },
]

export default function SmokeOverlay() {
  const engine = useMemo(() => new GameEngine(BANK), [])
  const [q, setQ] = useState<Question | null>(null)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(60)
  const [state, setState] = useState<'ready' | 'playing' | 'done'>('ready')
  const [flash, setFlash] = useState<'right' | 'wrong' | null>(null)

  useEffect(() => {
    if (state !== 'playing') return
    const id = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(id)
          setState('done')
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [state])

  function start() {
    engine.reset()
    setScore(0)
    setTime(60)
    setState('playing')
    setFlash(null)
    setQ(engine.makeQuestion())
  }

  function pick(opt: string) {
    if (state !== 'playing' || !q) return
    if (opt === q.answer) {
      setScore(s => s + 1)
      setFlash('right')
    } else {
      setFlash('wrong')
    }
    setTimeout(() => {
      const next = engine.makeQuestion()
      if (!next) {
        // No more questions left this round: finish early to avoid repeats
        setState('done')
      } else {
        setQ(next)
        setFlash(null)
      }
    }, 500)
  }

  return (
    <div className="relative w-full">
      <motion.div
        className="rounded-2xl border border-[rgba(196,164,79,0.25)] bg-[#101314]/80 backdrop-blur p-6 md:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs uppercase tracking-wider opacity-70">Gentlemen’s Lexicon</div>
          <div className="text-xs">
            <span className="mr-3">Score: <span className="gold font-semibold">{score}</span></span>
            <span>Time: <span className="gold font-semibold">{time}s</span></span>
          </div>
        </div>

        {/* States */}
        {state === 'ready' && (
          <div className="text-center py-8">
            <p className="opacity-90 mb-4">Match the definition to the correct Brit-crime slang.</p>
            <button
              onClick={start}
              className="px-5 py-2 rounded-xl border border-[rgba(196,164,79,0.35)] hover:border-[rgba(196,164,79,0.6)]"
            >
              Start
            </button>
          </div>
        )}

        {state === 'playing' && q && (
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={q.prompt}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-5">
                  <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">Definition</div>
                  <div className="text-lg md:text-xl">{q.prompt}</div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => pick(opt)}
                      className="rounded-xl border border-[rgba(196,164,79,0.25)] px-4 py-3 text-left hover:border-[rgba(196,164,79,0.6)]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* feedback flash */}
            <div className="h-6 mt-4">
              {flash === 'right' && <div className="text-green-400 text-sm">Correct</div>}
              {flash === 'wrong' && <div className="text-red-400 text-sm">Try again</div>}
            </div>
          </div>
        )}

        {state === 'done' && (
          <div className="text-center py-8">
            <p className="mb-2">Final score</p>
            <div className="text-4xl gold font-semibold mb-4">{score}</div>
            <button
              onClick={start}
              className="px-5 py-2 rounded-xl border border-[rgba(196,164,79,0.35)] hover:border-[rgba(196,164,79,0.6)]"
            >
              Play again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
