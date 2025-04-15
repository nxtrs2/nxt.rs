import Link from "next/link";
import Image from "next/image";
import type { ContentItem } from "@/types/content";

interface CodePreviewProps {
  entry: ContentItem;
}

export default function CodePreview({ entry }: CodePreviewProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 bg-black text-white p-1 text-sm z-10">
        CODE
      </div>
      <Link
        href={`/code/${entry.id}`}
        className="block hover:opacity-80 transition-opacity"
      >
        {entry.image && (
          <div className="flex flex-row md:w-[100%] md:h-[200px] w-[100%] h-[180px] group overflow-hidden">
            <Image
              src={entry.image || "/placeholder.svg"}
              alt={entry.title}
              width={600}
              height={300}
              className="object-cover content-bg dark:bg-black dark:bg-opacity-60 transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <h3 className="py-1 px-3 font-roboto-slab text-white bg-black dark:bg-opacity-60">
          {entry.title}
        </h3>
        {/* <div
          className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60"
          dangerouslySetInnerHTML={{
            __html: entry.contentHtml.substring(0, 200) + "...",
          }}
        /> */}
      </Link>
    </div>
  );
}
