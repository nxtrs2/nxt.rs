import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles("code");

  return entries.map((entry) => ({
    slug: entry.id,
  }));
}

export default async function CodeEntry({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getMarkdownData("code", params.slug);

  return (
    <div className="p-3 content-bg space-y-6 md:max-w-[490px] dark:bg-black dark:bg-opacity-60">
      <h1 className="font-roboto-slab text-2xl font-normal">{entry.title}</h1>

      {entry.image && (
        <div className="my-4">
          <Image
            src={entry.image || "/placeholder.svg"}
            alt={entry.title}
            width={800}
            height={400}
            className="object-cover w-full"
          />
        </div>
      )}

      <div
        className="prose prose-sm dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
      />

      {entry.link && (
        <div className="my-4">
          <Link
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Project
          </Link>
        </div>
      )}

      {entry.images && entry.images.length > 0 && (
        <div className="my-6">
          <h2 className="font-roboto-slab text-xl font-normal mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entry.images.map((img: string, idx: number) => (
              <div key={idx} className="overflow-hidden">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${entry.title} - Image ${idx + 1}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-6">
        {entry.created && <p>Created: {formatDate(entry.created)}</p>}
        {entry.updated && <p>Updated: {formatDate(entry.updated)}</p>}
      </div>
    </div>
  );
}
