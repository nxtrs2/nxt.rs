import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export default async function WordsPage() {
  const entries = await getAllMarkdownFiles("words");

  return (
    <div className="space-y-2 md:max-w-[475px] mb-32 m:mb-0">
      <h1 className="font-roboto-slab text-2xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
        Words
      </h1>

      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-2">
            <Link
              href={`/words/${entry.id}`}
              className="block hover:opacity-80 transition-opacity"
            >
              <h2 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
                {entry.title}
              </h2>
              <div className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
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
                  dangerouslySetInnerHTML={{
                    __html: entry.contentHtml.substring(0, 200) + "...",
                  }}
                />
                {entry.created && (
                  <p className="mb-0 text-sm text-gray-500 dark:text-gray-400 mt-2">
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
