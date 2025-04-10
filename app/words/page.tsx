import { getAllMarkdownFiles } from "@/lib/markdown"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export default async function WordsPage() {
  const entries = await getAllMarkdownFiles("words")

  return (
    <div className="space-y-8 pb-24">
      <h1 className="font-roboto-slab text-2xl font-normal mb-6">Words</h1>

      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-2">
            <Link href={`/words/${entry.id}`} className="block hover:opacity-80 transition-opacity">
              <h2 className="font-roboto-slab text-xl font-normal">{entry.title}</h2>
              {entry.heroImage && (
                <div className="mt-2 mb-2">
                  <Image
                    src={entry.heroImage || "/placeholder.svg"}
                    alt={entry.title}
                    width={800}
                    height={400}
                    className="object-cover w-full h-48"
                  />
                </div>
              )}
              <div
                className="mt-2 prose prose-sm dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: entry.contentHtml.substring(0, 200) + "..." }}
              />
              {entry.created && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{formatDate(entry.created)}</p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
