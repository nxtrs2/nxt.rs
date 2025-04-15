import { getAllMarkdownFiles } from "@/lib/markdown";
import CodePreview from "@/components/code-preview";
import WordsPreview from "@/components/words-preview";
import MusicPreview from "@/components/music-preview";
import type { MusicContent } from "@/types/content";
import type { CodeContent } from "@/types/content";
import type { WordsContent } from "@/types/content";
import type { PhotoGallery } from "@/types/content";
import GalleryPreview from "@/components/gallery-preview";
import Link from "next/link";

export default async function Home() {
  const codeEntries = await getAllMarkdownFiles<CodeContent>("code");
  const wordsEntries = await getAllMarkdownFiles<WordsContent>("words");
  const musicEntries = await getAllMarkdownFiles<MusicContent>("music");
  const photoEntries = await getAllMarkdownFiles<PhotoGallery>("photos");

  const allEntries = [
    ...codeEntries.map((entry) => ({ ...entry, type: "code" })),
    // ...wordsEntries.map((entry) => ({ ...entry, type: "words" })),
    // ...musicEntries.map((entry) => ({ ...entry, type: "music" })),
    // ...photoEntries.map((entry) => ({ ...entry, type: "photos" })),
  ].slice(0, 9);

  const sortedEntries = allEntries.sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
  );

  return (
    <div className="pb-32">
      <p className="content-bg prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
        This is the website of NXTRS, a software engineer, amateur musician and
        somewhat of a writer. I am known by some simply as Simon. Here you can
        find my latest work in coding, music and whatever else. You can read
        more <Link href="/about">here</Link>.
      </p>
      <h1 className="font-roboto-slab text-2xl font-normal content-bg px-3 my-2 inline-block dark:bg-black dark:bg-opacity-60">
        Here's the Latest
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedEntries.map((entry, index) => {
          if (entry.type === "code") {
            return <CodePreview key={index} entry={entry} />;
          }
          /* else if (entry.type === "words") {
          return <WordsPreview key={index} entry={entry} />;
        }
          */
          /* else if (entry.type === "music") {
          return <MusicPreview key={index} entry={entry} />;
        }*/
          // } else if (entry.type === "photos") {
          //   return <GalleryPreview key={index} entry={entry} />;
          // }
        })}
      </div>
    </div>
  );
}
