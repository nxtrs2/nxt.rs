import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Image from "next/image";
// import { formatDate } from "@/lib/utils";
import type { PhotoGallery } from "@/types/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const entries = await getAllMarkdownFiles<PhotoGallery>("photos");

  return entries.map((entry) => ({
    slug: entry.id,
  }));
}

type Params = Promise<{ slug: string }>;

export default async function PhotoGalleryPage(props: { params: Params }) {
  const params = props.params;
  const slug = (await params).slug;
  const gallery = await getMarkdownData<PhotoGallery>("photos", slug);

  if (!gallery) {
    notFound();
  }

  return (
    <div className="space-y-5 pb-24">
      <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
        {gallery.title}
      </h1>

      {gallery.description && (
        <div className="content-bg prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
          <p className="mb-0">{gallery.description}</p>
        </div>
      )}

      {/* {gallery.heroImage && (
        <div className="my-6">
          <Image
            src={gallery.heroImage || "/placeholder.svg"}
            alt={gallery.title}
            width={800}
            height={500}
            className="object-cover w-full"
          />
        </div>
      )} */}
      <div className="grid grid-cols-2 max-h-[1000px] overflow-y-auto gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gallery.images && gallery.images.length > 0 && (
          <>
            {gallery.images.map((img, idx) => (
              <div key={idx}>
                <Image
                  src={img.url || "/placeholder.svg?height=600&width=800"}
                  alt={img.caption || `Image ${idx + 1}`}
                  width={400}
                  height={400}
                />
                {img.caption && (
                  <p className="text-sm text-center content-bg italic dark:bg-black dark:bg-opacity-60">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      {/* <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-6">
        {gallery.created && <p>Created: {formatDate(gallery.created)}</p>}
        {gallery.updated && <p>Updated: {formatDate(gallery.updated)}</p>}
      </div> */}
    </div>
  );
}
