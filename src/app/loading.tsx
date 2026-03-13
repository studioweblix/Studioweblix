export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#5a6d6b] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/60 text-sm">Laden…</p>
      </div>
    </div>
  )
}
