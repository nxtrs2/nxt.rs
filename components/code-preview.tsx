import Link from "next/link";

export default function CodePreview({ entry }: { entry: any }) {
  return (
    <div className="space-y-2 md:max-w-[490px]">
      <Link
        href={`/code/${entry.id}`}
        className="block hover:opacity-80 transition-opacity"
      >
        <h3 className="inline-block content-bg font-roboto-slab text-xl dark:bg-black dark:bg-opacity-60">
          CODE: {entry.title}
        </h3>
        <div
          className="content-bg mt-1 prose prose-sm dark:prose-invert p-5 dark:bg-black dark:bg-opacity-60"
          dangerouslySetInnerHTML={{
            __html: entry.contentHtml.substring(0, 200) + "...",
          }}
        />
      </Link>
    </div>
  );
}
