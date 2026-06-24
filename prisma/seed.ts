import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  console.log('🌱 Seeding ITHAR database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@ITHAR2025', 12)
  const admin = await db.user.upsert({
    where: { email: 'admin@ithar.co' },
    update: {},
    create: {
      name: 'ITHAR Admin',
      email: 'admin@ithar.co',
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })
  console.log('✓ Admin user created:', admin.email)

  // Create collection
  const collection = await db.collection.upsert({
    where: { slug: 'risers-collection' },
    update: {},
    create: {
      name: 'The Risers Collection',
      slug: 'risers-collection',
      description: 'Season 01. Built on principle. The debut collection from ITHAR.',
      story: 'The Risers Collection is not a fashion statement — it is a declaration. Each piece carries the weight of the values that inspired this brand: loyalty, justice, courage, patience, sacrifice, hope, and devotion.',
      isActive: true,
      isFeatured: true,
      seoTitle: 'The Risers Collection — ITHAR',
      seoDesc: 'Season 01 from ITHAR. Premium streetwear built on principle.',
    },
  })
  console.log('✓ Collection created:', collection.name)

  // Create The Wilayah Hoodie
  const hoodie = await db.product.upsert({
    where: { slug: 'wilayah-hoodie' },
    update: {},
    create: {
      name: 'The Wilayah Hoodie',
      slug: 'wilayah-hoodie',
      description: 'Named after the declaration of Ghadir Khumm. Worn as a statement of allegiance. Built to last — in fabric and in meaning.',
      story: 'On the 18th of Dhul Hijjah, 10 AH, the Prophet Muhammad ﷺ stopped at Ghadir Khumm and declared: "Whoever I am his master, then Ali is his master." This hoodie carries that declaration on its back — not as decoration, but as a position.\n\nThe Wilayah Hoodie is the first piece from The Risers Collection. It was designed to endure — in construction and in meaning.',
      fabric: '450 GSM heavyweight French terry cotton. Garment-washed for a broken-in feel from day one. Oversized fit with dropped shoulders. Flat black drawstrings. Matte black hardware. Antique gold embroidered calligraphy on the back.\n\n• 100% Cotton French Terry\n• 450 GSM weight\n• Garment-washed finish\n• Oversized, dropped shoulder fit\n• Flat black drawstrings\n• Matte black metal hardware\n• Antique gold embroidery',
      careInstructions: '• Machine wash cold, inside out\n• Do not bleach\n• Tumble dry low\n• Do not iron directly on embroidery\n• Do not dry clean',
      price: 120,
      comparePrice: null,
      status: 'ACTIVE',
      isNew: true,
      isFeatured: true,
      seoTitle: 'The Wilayah Hoodie — ITHAR',
      seoDesc: '450 GSM heavyweight French terry hoodie. Oversized fit. Antique gold Arabic calligraphy. The Risers Collection.',
    },
  })
  console.log('✓ Product created:', hoodie.name)

  // Link product to collection
  await db.collectionProduct.upsert({
    where: { collectionId_productId: { collectionId: collection.id, productId: hoodie.id } },
    update: {},
    create: { collectionId: collection.id, productId: hoodie.id, sortOrder: 0 },
  })

  // Create variants
  const variant = await db.variant.upsert({
    where: { sku: 'WH-BLACK-001' },
    update: {},
    create: {
      productId: hoodie.id,
      name: 'Midnight Black',
      color: 'Black',
      colorHex: '#0B0B0B',
      sku: 'WH-BLACK-001',
    },
  })

  // Create sizes
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const stockLevels = [8, 15, 25, 30, 20, 12]

  for (let i = 0; i < sizes.length; i++) {
    await db.sizeStock.upsert({
      where: { sku: `WH-BLACK-${sizes[i]}` },
      update: {},
      create: {
        variantId: variant.id,
        size: sizes[i],
        stock: stockLevels[i],
        sku: `WH-BLACK-${sizes[i]}`,
      },
    })
  }
  console.log('✓ Variants and sizes created')

  // Create sample article
  await db.article.upsert({
    where: { slug: 'the-meaning-of-ghadir' },
    update: {},
    create: {
      title: 'The Meaning of Ghadir',
      slug: 'the-meaning-of-ghadir',
      excerpt: 'On the 18th of Dhul Hijjah, 10 AH, a declaration was made that changed everything. What Ghadir means for those who rise.',
      content: '<p>On the 18th of Dhul Hijjah, 10 AH, the Prophet Muhammad ﷺ stopped at a pool called Ghadir Khumm on the return from his final pilgrimage.</p><p>In the heat of the Arabian sun, he gathered over 100,000 companions and delivered a sermon that would echo through history.</p><blockquote><p dir="rtl">من كنت مولاه فهذا علي مولاه</p></blockquote><p><em>"Whoever I am his master, then Ali is his master."</em></p><p>This is not simply a historical event. It is a declaration of position. An act of clarity. A statement that demanded a response from every person present — and every person who would come after.</p><p>ITHAR was built on this declaration. The Wilayah Hoodie carries it on its back — in gold, on black — because some truths deserve to be worn.</p>',
      status: 'PUBLISHED',
      publishedAt: new Date('2025-06-18'),
      tags: ['Ghadir', 'Ahlulbayt', 'History'],
      seoTitle: 'The Meaning of Ghadir — ITHAR Journal',
      seoDesc: 'On the declaration of Ghadir Khumm and what it means for those who rise.',
    },
  })
  console.log('✓ Sample article created')

  console.log('\n✅ Database seeded successfully!')
  console.log('\nAdmin credentials:')
  console.log('Email: admin@ithar.co')
  console.log('Password: Admin@ITHAR2025')
  console.log('\n⚠️  Change the admin password immediately after first login!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
