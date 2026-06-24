import { FadeUp, StaggerContainer, StaggerItem } from '@/components/animations/FadeUp'

const benefits = [
  {
    number: '01',
    title: 'First Access',
    description: 'Shop before the public drop. Waitlist members get 24-hour exclusive window before general release.',
  },
  {
    number: '02',
    title: 'Founding Member',
    description: 'First 313 members receive a numbered certificate of founding membership and exclusive packaging.',
  },
  {
    number: '03',
    title: 'Reserved Allocation',
    description: 'Your preferred size is held for you. No scrambling on drop day — your piece is secured.',
  },
  {
    number: '04',
    title: 'Behind the Drop',
    description: 'Exclusive insight into the design process, production, and the meaning behind each piece.',
  },
]

export function WaitlistBenefits() {
  return (
    <section className="section-padding bg-black">
      <div className="container mx-auto">
        <FadeUp className="text-center mb-16">
          <p className="label-tag text-gold mb-4">Why Join Early</p>
          <h2 className="font-serif text-display-md font-light text-off-white">
            Member Benefits
          </h2>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-charcoal-mid">
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.number}>
              <div className="bg-black p-8 md:p-12 group hover:bg-charcoal transition-colors duration-300">
                <p className="font-mono text-gold/40 text-sm mb-6">{benefit.number}</p>
                <h3 className="font-serif text-xl font-light text-off-white mb-4 group-hover:text-gold transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-stone text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
