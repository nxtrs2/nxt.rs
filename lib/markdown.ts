import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export async function getMarkdownData(directory: string, filename: string) {
  const fullPath = path.join(process.cwd(), "content", directory, `${filename}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    filename,
    contentHtml,
    ...matterResult.data,
  }
}

export async function getAllMarkdownFiles(directory: string) {
  const fullPath = path.join(process.cwd(), "content", directory)
  const fileNames = fs.readdirSync(fullPath)

  const allData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "")
      const fullData = await getMarkdownData(directory, id)

      return {
        id,
        ...fullData,
      }
    }),
  )

  // Sort by date if available
  return allData.sort((a, b) => {
    if (a.created && b.created) {
      return new Date(b.created).getTime() - new Date(a.created).getTime()
    }
    return 0
  })
}
