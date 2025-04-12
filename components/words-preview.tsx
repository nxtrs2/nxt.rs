import Link from "next/link";
import type { ContentItem } from "@/types/content";

interface WordsPreviewProps {
  entry: ContentItem;
}

export default function WordsPreview({ entry }: WordsPreviewProps) {
  return (
    <div className="space-y-2  md:max-w-[485px]">
      <Link
        href={`/words/${entry.id}`}
        className="block hover:opacity-80 transition-opacity"
      >
        <h3 className="content-bg py-1 px-3 inline-block font-roboto-slab text-xl font-normal dark:bg-black dark:bg-opacity-60">
          WORDS: {entry.title}
        </h3>

        <div
          className="content-bg mt-1 prose prose-sm dark:prose-invert dark:bg-black dark:bg-opacity-60 p-3"
          dangerouslySetInnerHTML={{
            __html: entry.contentHtml.substring(0, 200) + "...",
          }}
        />
      </Link>
    </div>
  );
}
