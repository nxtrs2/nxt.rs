import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { PhotoGallery } from "@/types/content";

export default async function PhotosPage() {
  const galleries = await getAllMarkdownFiles<PhotoGallery>("photos");

  return (
    <div className="space-y-8 pb-24 md:max-w-[485px]">
      <h1 className="py-1 px-3 inline-block content-bg font-roboto-slab text-2xl dark:bg-black dark:bg-opacity-60 dark:border-l-2 dark:border-white">
        Photos
      </h1>

      <div className="grid grid-cols-1 max-h-[1000px] overflow-y-auto gap-4 md:grid-cols-2 lg:grid-cols-2">
        {galleries.map((gallery) => (
          <Link
            key={gallery.id}
            href={`/photos/${gallery.id}`}
            className="block hover:opacity-80 transition-opacity mb-8"
          >
            <div className="space-y-2">
              {gallery.heroImage && (
                <Image
                  src={gallery.heroImage || "/placeholder.svg"}
                  alt={gallery.title}
                  width={480}
                  height={380}
                  className="object-cover w-full h-48"
                />
              )}
              <h2 className="py-1 px-3 font-roboto-slab text-lg font-normal content-bg  dark:bg-black dark:bg-opacity-60">
                {gallery.title} ss
              </h2>
              {/* {gallery.created && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatDate(gallery.created)}
        </p>
          )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
