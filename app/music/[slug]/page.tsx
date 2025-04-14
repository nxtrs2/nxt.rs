import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { MusicContent } from "@/types/content";

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles<MusicContent>("music");

  return entries.map((entry) => ({
    slug: entry.id,
  }));
}

type Params = Promise<{ slug: string }>;

export default async function MusicEntry(props: { params: Params }) {
  const params = props.params;
  const slug = (await params).slug;
  const entry = await getMarkdownData<MusicContent>("music", slug);

  return (
    <div className="space-y-2  ">
      <div className="flex items-center justify-between">
        <h1 className="inline-block py-1 px-3 font-roboto-slab md:text-xl font-normal content-bg dark:bg-black dark:bg-opacity-60">
          {entry.title}
        </h1>{" "}
        <Link href={`/music/`} className="text-sm ml-2">
          <ArrowLeft className="h-8 w-8" />
        </Link>
      </div>
      <div className="md:items-start">
        {entry.coverImage && !entry.isSoundcloud && (
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
          {entry.songUrl && entry.isSoundcloud && (
            <>
              <iframe
                width="100%"
                height="166"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                  entry.songUrl
                )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
                style={{ border: "none" }}
              ></iframe>
              <div
                style={{
                  fontSize: "10px",
                  color: "#cccccc",
                  lineBreak: "anywhere",
                  wordBreak: "normal",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  fontFamily:
                    "Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Garuda, Verdana, Tahoma, sans-serif",
                  fontWeight: 100,
                }}
              ></div>
            </>
          )}
          {entry.songUrl && !entry.isSoundcloud && (
            <audio controls className="w-full">
              <source src={entry.songUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <div className="content-bg mt-1 prose prose-sm dark:prose-invert p-2 dark:bg-black dark:bg-opacity-60">
            {entry.description && (
              <div className="prose prose-sm dark:prose-invert">
                <p>{entry.description}</p>
              </div>
            )}
          </div>

          {entry.tracks && (
            <div className="content-bg prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
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
