import { getMarkdownData } from "@/lib/markdown";
import MarkdownContent from "@/components/MarkDownContent";
import fs from "fs";
import path from "path";
import type { PageContent } from "@/types/content";

export async function generateStaticParams() {
  const pagesDir = path.join(process.cwd(), "content", "pages");

  // Check if directory exists
  if (!fs.existsSync(pagesDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(pagesDir);

  // Filter out non-markdown files
  const markdownFiles = fileNames.filter((fileName) =>
    fileName.endsWith(".md")
  );

  return markdownFiles.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}
type Params = Promise<{ slug: string }>;

export default async function Page(props: { params: Params }) {
  const params = props.params;
  const slug = (await params).slug;
  const page = await getMarkdownData<PageContent>("pages", slug);

  return (
    <div className="p-3 content-bg space-y-6 md:max-w-[475px] dark:bg-black dark:bg-opacity-60 mb-20">
      <h1 className="font-roboto-slab text-2xl font-normal">{page.title}</h1>

      {/* <div
        className="prose prose-sm dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: page.contentHtml }}
      /> */}
      <MarkdownContent content={page.contentHtml} />
    </div>
  );
}
