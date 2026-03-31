import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SocialProof } from './social-proof'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl animate-glow dark:bg-violet-500/5" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl animate-glow dark:bg-indigo-500/5" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          100% free — no catch
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          Skip the Blank Canvas.{' '}
          <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400">
            Ship Faster.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          Polished Framer templates you can remix in one click — so you spend
          your time on copy and content, not layout and config.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/templates"
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:brightness-110 dark:shadow-violet-500/10 dark:hover:shadow-violet-500/20"
          >
            Pick a Template
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/tools"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface px-8 text-sm font-semibold text-foreground transition-colors hover:bg-accent-subtle hover:border-accent/20"
          >
            Try the Design Tools
          </Link>
        </div>

        <div className="mt-12 flex justify-center">
          <SocialProof />
        </div>
      </div>
    </section>
  )
}
