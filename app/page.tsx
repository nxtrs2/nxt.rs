import { getAllMarkdownFiles } from "@/lib/markdown";
import LargeCodePreview from "@/components/large-code-preview";
import LargeWordsPreview from "@/components/large-words-preview";
import LargeMusicPreview from "@/components/large-music-preview";
import type { MusicContent } from "@/types/content";
import type { CodeContent } from "@/types/content";
import type { WordsContent } from "@/types/content";
import type { PhotoGallery } from "@/types/content";
import Link from "next/link";

export default async function Home() {
  const codeEntries = await getAllMarkdownFiles<CodeContent>("code");
  const wordsEntries = await getAllMarkdownFiles<WordsContent>("words");
  const musicEntries = await getAllMarkdownFiles<MusicContent>("music");
  const photoEntries = await getAllMarkdownFiles<PhotoGallery>("photos");

  // Get the latest entry from each category
  const latestCode = codeEntries[0];
  const latestWords = wordsEntries[0];
  const latestMusic = musicEntries[0];

  return (
    <div className="pb-32 ">
      <p className="content-bg prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60 mb-2">
        Welcome to NXT.RS - my portfolio of works showcasing some of my work as
        a Software engineer, amateur musician and writer. You can read more{" "}
        <Link href="/about">here</Link>.
      </p>
      <h1 className="font-roboto-slab text-2xl font-normal content-bg px-3 my-2 inline-block dark:bg-black dark:bg-opacity-60">
        Most recent work
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {latestCode && <LargeCodePreview entry={latestCode} />}

        {latestMusic && <LargeMusicPreview entry={latestMusic} />}

        {latestWords && <LargeWordsPreview entry={latestWords} />}
      </div>
      /
    </div>
  );
}
