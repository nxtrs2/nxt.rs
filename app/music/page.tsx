import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";
import type { MusicContent } from "@/types/content";

export default async function MusicPage() {
  const entries = await getAllMarkdownFiles<MusicContent>("music");

  return (
    <div className="space-y-2 mb-32 m:mb-0 ">
      <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
        Music
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {entries.map((entry) => (
          <div key={entry.id}>
            <Link href={`/music/${entry.id}`} className="block">
              {entry.coverImage && (
                <div className="flex flex-row md:w-[100%] md:h-[200px] w-[100%] h-[180px] group overflow-hidden">
                  <Image
                    src={entry.coverImage || "/placeholder.svg"}
                    alt={entry.title}
                    width={400}
                    height={120}
                    className="object-cover content-bg dark:bg-black dark:bg-opacity-60 transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div
                key={entry.id}
                className="content-bg  prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60"
              >
                <div>
                  <h2 className="font-roboto-slab font-normal">
                    {entry.title}
                  </h2>
                  {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.isAlbum ? "Album" : "Track"}
                  </p>
                 */}{" "}
                  {entry.description && (
                    <p className="text-sm mt-2 mb-0 hidden md:block">
                      {entry.description.substring(0, 100)}...
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
