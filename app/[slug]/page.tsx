import { getMarkdownData } from "@/lib/markdown"
import fs from "fs"
import path from "path"

export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), "content", "pages")
  const fileNames = fs.readdirSync(pagesDir)

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getMarkdownData("pages", params.slug)

  return (
    <div className="space-y-6 pb-24">
      <h1 className="font-roboto-slab text-2xl font-normal">{page.title}</h1>

      <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.contentHtml }} />
    </div>
  )
}
