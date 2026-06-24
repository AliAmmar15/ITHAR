import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { auth } from '@/lib/auth'

const f = createUploadthing()

export const ourFileRouter: FileRouter = {
  productImage: f({ image: { maxFileSize: '8MB', maxFileCount: 10 } })
    .middleware(async () => {
      const session = await auth()
      const role = (session?.user as any)?.role
      if (!session || (role !== 'ADMIN' && role !== 'SUPERADMIN')) {
        throw new Error('Unauthorized')
      }
      return { userId: session.user!.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for user:', metadata.userId)
      console.log('File URL:', file.url)
      return { url: file.url }
    }),
}

export type OurFileRouter = typeof ourFileRouter
