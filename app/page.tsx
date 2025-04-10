import { getAllMarkdownFiles } from "@/lib/markdown";
import CodePreview from "@/components/code-preview";
import WordsPreview from "@/components/words-preview";
import MusicPreview from "@/components/music-preview";

export default async function Home() {
  const codeEntries = await getAllMarkdownFiles("code");
  const wordsEntries = await getAllMarkdownFiles("words");
  const musicEntries = await getAllMarkdownFiles("music");

  return (
    <div className="space-y-8 pb-32">
      {codeEntries.length > 0 && <CodePreview entry={codeEntries[0]} />}

      {wordsEntries.length > 0 && <WordsPreview entry={wordsEntries[0]} />}

      {musicEntries.length > 0 && <MusicPreview entry={musicEntries[0]} />}
    </div>
  );
}
