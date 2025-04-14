import { getAllMarkdownFiles } from "@/lib/markdown";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { PhotoGallery } from "@/types/content";

export default async function PhotosPage() {
  const galleries = await getAllMarkdownFiles<PhotoGallery>("photos");

  return (
    <div className="space-y-5 pb-24">
      <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
        Photos
      </h1>

      <div className="grid grid-cols-2 max-h-[1000px] overflow-y-auto gap-4 md:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery) => (
          <Link
            key={gallery.id}
            href={`/photos/${gallery.id}`}
            className="block"
          >
            <div className="">
              {gallery.heroImage && (
                <div className="flex flex-row md:w-[100%] md:h-[200px] w-[100%] h-[180px] group overflow-hidden">
                  <Image
                    src={gallery.heroImage || "/placeholder.svg"}
                    alt={gallery.title}
                    width={200}
                    height={200}
                    className="object-cover content-bg dark:bg-black dark:bg-opacity-60 transform transition-transform duration-300 group-hover:scale-110"
                  />{" "}
                </div>
              )}
              <h2 className="py-3 px-1 dark:opacity-55 font-roboto-slab font-normal content-bg  dark:bg-black dark:bg-opacity-60">
                {gallery.title}
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
