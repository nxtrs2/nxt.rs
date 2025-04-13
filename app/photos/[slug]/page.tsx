import { getMarkdownData, getAllMarkdownFiles } from "@/lib/markdown";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { PhotoGallery } from "@/types/content";

export async function generateStaticParams() {
  const galleries = await getAllMarkdownFiles<PhotoGallery>("photos");

  return galleries.map((gallery) => ({
    slug: gallery.id,
  }));
}

type Params = Promise<{ slug: string }>;

export default async function PhotoGalleryPage(props: { params: Params }) {
  const params = props.params;
  const slug = (await params).slug;
  const gallery = await getMarkdownData<PhotoGallery>("photos", slug);

  return (
    <div className="space-y-8 pb-24 md:max-w-[475px] max-h-[1000px] overflow-auto">
      <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
        {gallery.title}
      </h1>

      {gallery.description && (
        <div className="content-bg mt-1 prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60">
          <p className="mb-0">{gallery.description}</p>
        </div>
      )}

      {gallery.heroImage && (
        <div className="my-6">
          <Image
            src={gallery.heroImage || "/placeholder.svg"}
            alt={gallery.title}
            width={800}
            height={500}
            className="object-cover w-full"
          />
        </div>
      )}

      {gallery.images && gallery.images.length > 0 && (
        <div className="space-y-8 my-8">
          {gallery.images.map((img, idx) => (
            <div key={idx} className="space-y-2">
              <Image
                src={img.url || "/placeholder.svg?height=600&width=800"}
                alt={img.caption || `Image ${idx + 1}`}
                width={800}
                height={600}
                className="object-cover w-full"
              />
              {img.caption && (
                <p className="text-sm text-center content-bg italic dark:bg-black dark:bg-opacity-60">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-6">
        {gallery.created && <p>Created: {formatDate(gallery.created)}</p>}
        {gallery.updated && <p>Updated: {formatDate(gallery.updated)}</p>}
      </div>
    </div>
  );
}
