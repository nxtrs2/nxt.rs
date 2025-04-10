import { getAllMarkdownFiles } from "@/lib/markdown"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export default async function PhotosPage() {
  const galleries = await getAllMarkdownFiles("photos")

  return (
    <div className="space-y-8 pb-24">
      <h1 className="font-roboto-slab text-2xl font-normal mb-6">Photos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {galleries.map((gallery) => (
          <Link key={gallery.id} href={`/photos/${gallery.id}`} className="block hover:opacity-80 transition-opacity">
            <div className="space-y-2">
              {gallery.heroImage && (
                <Image
                  src={gallery.heroImage || "/placeholder.svg"}
                  alt={gallery.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
              )}
              <h2 className="font-roboto-slab text-lg font-normal">{gallery.title}</h2>
              {gallery.created && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(gallery.created)}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
