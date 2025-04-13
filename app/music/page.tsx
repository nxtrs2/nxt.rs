import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";
import type { MusicContent } from "@/types/content";

export default async function MusicPage() {
  const entries = await getAllMarkdownFiles<MusicContent>("music");

  return (
    <div className="space-y-2 md:max-w-[475px] ">
      <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
        Music
      </h1>

      <div className="space-y-8">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60"
          >
            <Link
              href={`/music/${entry.id}`}
              className="block hover:opacity-80 transition-opacity"
            >
              <div className="flex items-start space-x-4">
                {entry.coverImage && (
                  <div className="flex-shrink-0">
                    <Image
                      src={entry.coverImage || "/placeholder.svg"}
                      alt={entry.title}
                      width={120}
                      height={120}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h2 className="font-roboto-slab text-xl font-normal">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.isAlbum ? "Album" : "Track"}
                  </p>
                  {entry.description && (
                    <p className="text-sm mt-2 mb-0">
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
