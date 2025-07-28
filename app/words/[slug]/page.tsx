import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { WordsContent } from "@/types/content";
import MarkdownContent from "@/components/MarkDownContent";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles<WordsContent>("words");

  return entries.map((entry) => ({
    slug: entry.id,
  }));
}

type Params = Promise<{ slug: string }>;

export default async function WordEntry(props: { params: Params }) {
  const params = props.params;
  const slug = (await params).slug;
  const entry = await getMarkdownData<WordsContent>("words", slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-2 mb-32 md:mb-0  ">
      <div className="flex items-center justify-between">
        <h1 className="inline-block py-1 px-3 font-roboto-slab text-2xl font-normal content-bg dark:bg-black dark:bg-opacity-60">
          {entry.title}
        </h1>
        <Link href={`/words/`} className="text-sm ml-2">
          <ArrowLeft className="h-8 w-8" />
        </Link>
      </div>

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

      {/* <div
        className="prose prose-sm dark:prose-invert content-bg p-2 dark:bg-black dark:bg-opacity-60"
        style={{ maxHeight: "800px", overflowY: "auto" }}
        dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
      /> */}
      <div className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
        <MarkdownContent content={entry.contentHtml} />
      </div>

      {/* <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-6">
        {entry.created && (
          <p className="mb-0">Created: {formatDate(entry.created)}</p>
        )}
        {entry.updated && (
          <p className="mb-0">Updated: {formatDate(entry.updated)}</p>
        )}
      </div> */}
    </div>
  );
}
