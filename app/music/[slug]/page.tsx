import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { MusicContent } from "@/types/content";
import PageMusicPlayer from "@/components/page-music-player";
import MarkdownContent from "@/components/MarkDownContent";
import { notFound } from "next/navigation";

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

  // If entry is null (file doesn't exist), show 404
  if (!entry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <h1 className="inline-block py-1 px-3 font-roboto-slab md:text-xl font-normal content-bg dark:bg-black dark:bg-opacity-60">
          {entry.title}
        </h1>
        <Link href={`/music/`} className="text-sm ml-2">
          <ArrowLeft className="h-8 w-8" />
        </Link>
      </div>

      {/* Music Player */}
      {entry.audioFile && (
        <PageMusicPlayer
          audioFile={entry.audioFile}
          title={entry.title}
          coverImage={entry.coverImage}
          video={entry.video}
          contentHtml={entry.contentHtml}
          tracks={entry.tracks}
        />
      )}
    </div>
  );
}
