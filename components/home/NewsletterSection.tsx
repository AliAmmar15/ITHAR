import { FadeUp } from '@/components/animations/FadeUp'
import { NewsletterForm } from '@/components/forms/NewsletterForm'

export function NewsletterSection() {
  return (
    <section className="section-padding bg-charcoal border-t border-charcoal-mid">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <p className="label-tag text-gold mb-6">The Risers List</p>
            <h2 className="font-serif text-display-md font-light text-off-white mb-6 leading-tight">
              Be First.
              <br />
              <span className="italic text-gold">Always.</span>
            </h2>
            <p className="text-warm-gray text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Drop announcements. Exclusive access. Brand stories.
              Join the list that rises before everyone else.
            </p>
            <NewsletterForm
              source="homepage-newsletter"
              placeholder="Enter your email address"
            />
            <p className="text-stone text-xs mt-4 tracking-wide">
              No spam. No filler. Unsubscribe anytime.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
