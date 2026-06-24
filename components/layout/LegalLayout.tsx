import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FadeUp } from '@/components/animations/FadeUp'

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="bg-black pt-16 md:pt-18 min-h-screen">
      <div className="container mx-auto py-12 md:py-16 max-w-2xl">
        <FadeUp>
          <Link href="/" className="btn-text mb-8 inline-flex">
            <ArrowLeft size={13} /> Home
          </Link>
          <p className="label-tag text-stone mb-3">Last updated: {lastUpdated}</p>
          <h1 className="font-serif text-display-sm font-light text-off-white mb-10">{title}</h1>
          <div className="w-12 h-px bg-gold mb-10" />

          <div
            className="prose prose-invert prose-sm md:prose-base max-w-none
              prose-headings:font-serif prose-headings:font-light prose-headings:text-off-white
              prose-headings:mt-10 prose-headings:mb-4
              prose-p:text-warm-gray prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-gold prose-a:no-underline hover:prose-a:underline
              prose-ul:text-warm-gray prose-ol:text-warm-gray
              prose-li:mb-1
              prose-table:text-sm
              prose-th:text-stone prose-th:font-medium prose-th:py-2 prose-th:pr-6 prose-th:text-left prose-th:border-b prose-th:border-charcoal-mid
              prose-td:text-warm-gray prose-td:py-2 prose-td:pr-6 prose-td:border-b prose-td:border-charcoal-mid
              prose-hr:border-charcoal-mid"
          >
            {children}
          </div>
        </FadeUp>
      </div>
    </div>
  )
}
