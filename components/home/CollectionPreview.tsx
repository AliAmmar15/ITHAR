import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/animations/FadeUp'

export function CollectionPreview() {
  return (
    <section className="section-padding-sm bg-charcoal">
      <div className="container mx-auto">
        <FadeUp className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-charcoal-mid">
          {/* Main collection */}
          <Link
            href="/collections/risers-collection"
            className="group relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] overflow-hidden bg-black"
          >
            <Image
              src="/images/collection-risers.svg"
              alt="The Risers Collection"
              fill
              className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="label-tag text-gold mb-3">Season 01</p>
              <h3 className="font-serif text-display-sm font-light text-off-white mb-4">
                The Risers
                <br />
                Collection
              </h3>
              <span className="btn-text text-gold group-hover:gap-3 transition-all duration-200">
                Explore <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          {/* Stacked right */}
          <div className="flex flex-col gap-px">
            <Link
              href="/products/wilayah-hoodie"
              className="group relative flex-1 min-h-[280px] lg:min-h-0 overflow-hidden bg-black"
            >
              <Image
                src="/images/wilayah-hoodie-back.svg"
                alt="The Wilayah Hoodie — Back Design"
                fill
                className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="label-tag text-gold mb-1">Signature Piece</p>
                <h4 className="font-serif text-xl font-light text-off-white">
                  The Wilayah Hoodie
                </h4>
              </div>
            </Link>

            <Link
              href="/waitlist"
              className="group relative flex-1 min-h-[280px] lg:min-h-0 overflow-hidden bg-black flex items-center justify-center"
            >
              {/* Islamic geometric pattern background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B89A67' fill-opacity='1'%3E%3Cpath d='M30 0l7.5 13h15L45 26l7.5 13H37.5L30 52.5 22.5 39H7.5L15 26l-7.5-13h15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px',
                }}
              />
              <div className="relative z-10 text-center p-8">
                <p className="font-arabic text-gold text-4xl mb-4" lang="ar">
                  ٣١٣
                </p>
                <h4 className="font-serif text-xl font-light text-off-white mb-2">
                  Join the Waitlist
                </h4>
                <p className="text-stone text-xs tracking-wide">
                  Limited first edition. Early access only.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-gold text-xs tracking-wider uppercase font-medium">
                  Reserve Your Spot <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
