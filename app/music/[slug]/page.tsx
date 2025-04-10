import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown"
import Image from "next/image"

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles("music")

  return entries.map((entry) => ({
    slug: entry.id,
  }))
}

export default async function MusicEntry({ params }: { params: { slug: string } }) {
  const entry = await getMarkdownData("music", params.slug)

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        {entry.coverImage && (
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <Image
              src={entry.coverImage || "/placeholder.svg"}
              alt={entry.title}
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        )}

        <div>
          <h1 className="font-roboto-slab text-2xl font-normal">{entry.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{entry.isAlbum ? "Album" : "Single"}</p>

          {entry.description && (
            <div className="prose prose-sm dark:prose-invert mb-6">
              <p>{entry.description}</p>
            </div>
          )}

          {entry.tracks && (
            <div className="space-y-2">
              <h2 className="font-roboto-slab text-lg font-normal mb-2">Tracks</h2>
              <ol className="list-decimal list-inside space-y-1">
                {entry.tracks.map((track: string, idx: number) => (
                  <li key={idx} className="text-sm">
                    {track}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
