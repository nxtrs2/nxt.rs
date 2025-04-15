import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { CodeContent } from "@/types/content";

export default async function CodePage() {
  const entries = (await getAllMarkdownFiles<CodeContent>("code")).slice(0, 4);

  return (
    <div className="space-y-2 mb-32 m:mb-0 ">
      <h1 className="font-roboto-slab text-2xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
        Code
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-2 pb-2">
            <Link href={`/code/${entry.id}`} className="block">
              {entry.image && (
                <div className="flex flex-row md:w-[100%] md:h-[200px] w-[100%] h-[180px] group overflow-hidden">
                  <Image
                    src={entry.image || "/placeholder.svg"}
                    alt={entry.title}
                    width={800}
                    height={400}
                    className="object-cover content-bg dark:bg-black dark:bg-opacity-60 transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="content-bg prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
                <h2 className="font-roboto-slab md:text-xl font-normal inline-block dark:bg-black dark:bg-opacity-60">
                  {entry.title}
                </h2>
                <div className="mt-2 prose prose-sm dark:prose-invert hidden md:block">
                  {entry.description}
                </div>
                {/* {entry.created && (
                  <p className="m-0 text-sm text-gray-500 dark:text-gray-400 ">
                    {formatDate(entry.created)}
                  </p>
                )} */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
