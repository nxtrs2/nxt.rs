import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { CodeContent } from "@/types/content";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles<CodeContent>("code");

  return entries.map((entry) => ({
    slug: entry.id,
  }));
}

export default async function CodeEntry({
  params,
}: {
  params: { slug: string };
}) {
  const entry = await getMarkdownData<CodeContent>("code", params.slug);

  return (
    <div className="p-3 mb-20  space-y-6 md:max-w-[475px] dark:bg-black dark:bg-opacity-60">
      <div className="flex items-center justify-between">
        <h1 className="content-bg inline-block py-1 px-3 font-roboto-slab text-2xl font-normal">
          {entry.title}
        </h1>{" "}
        <Link href={`/code/`} className="text-sm ml-2">
          <ArrowLeft className="h-8 w-8" />
        </Link>
      </div>

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
        className="content-bg inline-block  py-1 px-3 prose prose-sm dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
      />

      {entry.link && (
        <p className="my-4">
          <Link
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            View Project
          </Link>
        </p>
      )}

      {entry.images && entry.images.length > 0 && (
        <div className="my-6">
          <h2 className="content-bg inline-block  py-1 px-3 font-roboto-slab text-xl font-normal mb-4">
            Screens
          </h2>
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

      <div className="flex justify-between text-sm text-gray-200 dark:text-gray-400 mt-6">
        {entry.created && (
          <p className="m-0">Created: {formatDate(entry.created)}</p>
        )}
        {entry.updated && (
          <p className="m-0">Updated: {formatDate(entry.updated)}</p>
        )}
      </div>
    </div>
  );
}
