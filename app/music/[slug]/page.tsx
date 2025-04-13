import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Image from "next/image";
import type { MusicContent } from "@/types/content";

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles<MusicContent>("music");

  return entries.map((entry) => ({
    slug: entry.id,
  }));
}

export default async function MusicEntry({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getMarkdownData<MusicContent>("music", params.slug);

  return (
    <div className="space-y-2 md:max-w-[475px] ">
      <div className="md:items-start">
        {entry.coverImage && (
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <Image
              src={entry.coverImage || "/placeholder.svg"}
              alt={entry.title}
              width={475}
              height={475}
              className="object-cover"
            />
          </div>
        )}

        <div>
          <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
            {entry.title}
          </h1>

          <div className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
            {entry.description && (
              <div className="prose prose-sm dark:prose-invert">
                <p>{entry.description}</p>
              </div>
            )}
          </div>

          {entry.tracks && (
            <div className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
              <h2 className="font-roboto-slab text-lg font-normal mb-2">
                Tracks
              </h2>
              <ol className="list-decimal list-inside space-y-1">
                {entry.tracks.map((track: string, idx: number) => (
                  <li key={idx} className="text-sm">
                    {track}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
