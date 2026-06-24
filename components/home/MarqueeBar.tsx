import { cn } from '@/lib/utils'

const items = [
  'Loyalty',
  '·',
  'Justice',
  '·',
  'Courage',
  '·',
  'Patience',
  '·',
  'Sacrifice',
  '·',
  'Hope',
  '·',
  'Devotion',
  '·',
  'وفاء',
  '·',
  'عدل',
  '·',
  'شجاعة',
  '·',
  'صبر',
  '·',
  'تضحية',
  '·',
  'أمل',
  '·',
  'إخلاص',
  '·',
]

export function MarqueeBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden border-y border-charcoal-mid bg-charcoal py-3.5',
        className
      )}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={cn(
              'mx-4 text-[10px] font-medium tracking-brand uppercase',
              item === '·'
                ? 'text-gold'
                : item.match(/[؀-ۿ]/)
                ? 'font-arabic text-warm-gray text-sm'
                : 'text-stone'
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
