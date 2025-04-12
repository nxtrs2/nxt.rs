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

export default async function PhotoGalleryPage({
  params,
}: {
  params: { slug: string };
}) {
  const gallery = await getMarkdownData<PhotoGallery>("photos", params.slug);

  return (
    <div className="space-y-6 pb-24">
      <h1 className="font-roboto-slab text-2xl font-normal">{gallery.title}</h1>

      {gallery.description && (
        <div className="prose prose-sm dark:prose-invert">
          <p>{gallery.description}</p>
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
                <p className="text-sm text-center text-gray-600 dark:text-gray-400 italic">
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
