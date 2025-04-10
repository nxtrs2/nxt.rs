import { getAllMarkdownFiles } from "@/lib/markdown"
import Link from "next/link"
import Image from "next/image"

export default async function MusicPage() {
  const entries = await getAllMarkdownFiles("music")

  return (
    <div className="space-y-8 pb-24">
      <h1 className="font-roboto-slab text-2xl font-normal mb-6">Music</h1>

      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-2">
            <Link href={`/music/${entry.id}`} className="block hover:opacity-80 transition-opacity">
              <div className="flex items-start space-x-4">
                {entry.coverImage && (
                  <div className="flex-shrink-0">
                    <Image
                      src={entry.coverImage || "/placeholder.svg"}
                      alt={entry.title}
                      width={120}
                      height={120}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h2 className="font-roboto-slab text-xl font-normal">{entry.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{entry.isAlbum ? "Album" : "Single"}</p>
                  {entry.description && <p className="text-sm mt-2">{entry.description.substring(0, 100)}...</p>}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
