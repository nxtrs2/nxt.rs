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

type Params = Promise<{ slug: string }>;

export default async function CodeEntry(props: { params: Params }) {
  const params = props.params;
  const slug = (await params).slug;
  const entry = await getMarkdownData<CodeContent>("code", slug);

  return (
    <div className="space-y-2 mb-32 md:mb-0  ">
      <div className="flex items-center justify-between">
        <h1 className="inline-block py-1 px-3 font-roboto-slab text-2xl font-normal content-bg dark:bg-black dark:bg-opacity-60">
          {entry.title}
        </h1>{" "}
        <Link href={`/code/`} className="text-sm ml-2">
          <ArrowLeft className="h-8 w-8" />
        </Link>
      </div>

      {entry.images && entry.images.length > 0 && (
        <div className="my-6">
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

      <div
        className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60"
        style={{ maxHeight: "800px", overflowY: "auto" }}
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

      {/* <div className="flex justify-between text-sm text-gray-200 dark:text-gray-400 mt-6">
        {entry.created && (
          <p className="m-0">Created: {formatDate(entry.created)}</p>
        )}
        {entry.updated && (
          <p className="m-0">Updated: {formatDate(entry.updated)}</p>
        )}
      </div> */}
    </div>
  );
}
