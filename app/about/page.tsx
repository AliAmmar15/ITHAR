import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/FadeUp'
import { MarqueeBar } from '@/components/home/MarqueeBar'
import { BRAND_VALUES } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About ITHAR',
  description: 'The story behind ITHAR â€” a brand built on the word selflessness, inspired by the Ahlulbayt (Ø¹).',
}

export default function AboutPage() {
  return (
    <div className="bg-black pt-16 md:pt-18">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src="/images/about-hero.jpg"
          alt="ITHAR â€” About"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative z-10 container mx-auto pb-16 md:pb-24">
          <FadeUp>
            <p className="label-tag text-gold mb-4">Our Story</p>
            <h1 className="font-serif font-light text-off-white leading-none tracking-tighter"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}>
              A Word With<br />No Translation.
            </h1>
          </FadeUp>
        </div>
      </section>

      <MarqueeBar />

      {/* Manifesto */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <FadeUp>
            <div className="space-y-7 text-warm-gray text-base md:text-lg leading-relaxed">
              <p>There is a word in Arabic that has no perfect translation.</p>
              <p className="font-arabic text-gold text-4xl text-center py-4" lang="ar" dir="rtl">
                Ø¥ÙŠØ«Ø§Ø±
              </p>
              <p>
                <em className="text-off-white">Ithar</em> â€” means to give preference to others
                over yourself. To choose sacrifice when selfishness is easier. To stand for
                something when standing costs you everything.
              </p>
              <p>
                This brand was built on that word. Inspired by those who lived it fully â€”
                the Ahlulbayt (Ø¹) â€” whose loyalty, courage, patience, and devotion
                wrote the greatest story ever lived.
              </p>
              <p>
                The Prophet ï·º declared at Ghadir Khumm on the 18th of Dhul Hijjah, 10 AH:
              </p>
              <blockquote className="border-l-2 border-gold pl-6 my-8">
                <p className="font-arabic text-gold text-2xl mb-3" lang="ar" dir="rtl">
                  Ù…Ù† ÙƒÙ†Øª Ù…ÙˆÙ„Ø§Ù‡ ÙÙ‡Ø°Ø§ Ø¹Ù„ÙŠ Ù…ÙˆÙ„Ø§Ù‡
                </p>
                <p className="text-off-white italic font-serif text-lg">
                  &ldquo;Whoever I am his master, then Ali is his master.&rdquo;
                </p>
              </blockquote>
              <p>
                The Wilayah Hoodie carries this declaration on its back â€” not as decoration,
                but as a statement of where we stand.
              </p>
              <p className="text-off-white font-light text-xl md:text-2xl">
                ITHAR is not just clothing.<br />
                It is a declaration.
              </p>
              <p>
                A reminder of who you are and who you choose to be.
                Wear it with intention. Rise with purpose.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-charcoal border-y border-charcoal-mid">
        <div className="container mx-auto">
          <FadeUp className="text-center mb-14">
            <p className="label-tag text-gold mb-4">What We Stand For</p>
            <h2 className="font-serif text-display-md font-light text-off-white">Seven Principles</h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {BRAND_VALUES.slice(0, 4).map((val) => (
              <StaggerItem key={val.english}>
                <div className="text-center">
                  <p className="font-arabic text-gold text-2xl mb-2" lang="ar" dir="rtl">{val.arabic}</p>
                  <p className="font-serif text-off-white text-lg font-light">{val.english}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mt-6">
            {BRAND_VALUES.slice(4).map((val) => (
              <StaggerItem key={val.english}>
                <div className="text-center">
                  <p className="font-arabic text-gold text-2xl mb-2" lang="ar" dir="rtl">{val.arabic}</p>
                  <p className="font-serif text-off-white text-lg font-light">{val.english}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black">
        <div className="container mx-auto text-center max-w-lg">
          <FadeUp>
            <Image
              src="/images/logo-gold.svg"
              alt="ITHAR"
              width={48}
              height={48}
              className="w-10 h-10 object-contain mx-auto mb-8"
            />
            <h2 className="font-serif text-display-sm font-light text-off-white mb-6">
              Ready to Rise?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/waitlist" className="btn-gold px-10">Join Waitlist</Link>
              <Link href="/shop" className="btn-outline px-10">Explore Collection</Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
