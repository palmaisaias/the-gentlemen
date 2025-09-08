type RecipeCardProps = {
  kind: 'snack' | 'cocktail'
  title: string
  image: string // placeholder path
  bullets: string[]
}
export default function RecipeCard({ kind, title, image, bullets }: RecipeCardProps) {
  return (
    <article className="rounded-2xl border border-[rgba(196,164,79,0.2)] p-4 bg-[#121212] grid grid-cols-[96px_1fr] gap-4">
      <img src={image} alt="" className="h-24 w-24 object-cover rounded-xl ring-1 ring-black/30" />
      <div>
        <div className="text-[10px] uppercase tracking-wider opacity-70">{kind}</div>
        <h3 className="text-lg font-semibold gold">{title}</h3>
        <ul className="mt-1 space-y-1 text-sm opacity-90 list-disc list-inside">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </article>
  )
}
