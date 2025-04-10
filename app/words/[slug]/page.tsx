import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles("words")

  return entries.map((entry) => ({
    slug: entry.id,
  }))
}

export default async function WordEntry({ params }: { params: { slug: string } }) {
  const entry = await getMarkdownData("words", params.slug)

  return (
    <div className="space-y-6 pb-24">
      <h1 className="font-roboto-slab text-2xl font-normal">{entry.title}</h1>

      {entry.heroImage && (
        <div className="my-4">
          <Image
            src={entry.heroImage || "/placeholder.svg"}
            alt={entry.title}
            width={800}
            height={400}
            className="object-cover w-full"
          />
        </div>
      )}

      <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: entry.contentHtml }} />

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-6">
        {entry.created && <p>Created: {formatDate(entry.created)}</p>}
        {entry.updated && <p>Updated: {formatDate(entry.updated)}</p>}
      </div>
    </div>
  )
}
