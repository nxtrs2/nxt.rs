import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { CodeContent } from "@/types/content";

export default async function CodePage() {
  const entries = await getAllMarkdownFiles<CodeContent>("code");

  return (
    <div className="space-y-2 md:max-w-[475px] ">
      <h1 className="content-bg inline-block py-1 px-3 font-roboto-slab text-2xl font-normal">
        Code
      </h1>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-2 pb-2">
            <Link
              href={`/code/${entry.id}`}
              className="block hover:opacity-80 transition-opacity"
            >
              <h2 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
                {entry.title}
              </h2>
              <div className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
                {/* {entry.image && (
                  <div className="mt-2 mb-2">
                    <Image
                      src={entry.image || "/placeholder.svg"}
                      alt={entry.title}
                      width={800}
                      height={400}
                      className="object-cover w-full"
                    />
                  </div>
                )} */}
                <div
                  className="mt-2 prose prose-sm dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html: entry.contentHtml.substring(0, 200) + "...",
                  }}
                />
                {entry.created && (
                  <p className="m-0 text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {formatDate(entry.created)}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
