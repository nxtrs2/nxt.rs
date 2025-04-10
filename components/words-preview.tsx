import Link from "next/link";

export default function WordsPreview({ entry }: { entry: any }) {
  return (
    <div className="space-y-2  md:max-w-[490px]">
      <Link
        href={`/words/${entry.id}`}
        className="block hover:opacity-80 transition-opacity"
      >
        <h3 className="content-bg py-2 px-5 inline-block  font-roboto-slab text-xl font-normal dark:bg-black dark:bg-opacity-60">
          WORDS: {entry.title}
        </h3>

        <div
          className="content-bg mt-1 prose prose-sm dark:prose-invert dark:bg-black dark:bg-opacity-60"
          dangerouslySetInnerHTML={{
            __html: entry.contentHtml.substring(0, 200) + "...",
          }}
        />
      </Link>
    </div>
  );
}
