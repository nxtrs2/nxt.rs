import Image from "next/image";
import Link from "next/link";
import type { ContentItem } from "@/types/content";

interface MusicPreviewProps {
  entry: ContentItem;
}

export default function MusicPreview({ entry }: MusicPreviewProps) {
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 bg-black text-white p-1 text-sm z-20">
        MUSIC
      </div>
      <Link
        href={`/music/${entry.id}`}
        className=" block hover:opacity-80 transition-opacity"
      >
        {entry.coverImage && (
          <div className="flex flex-row md:w-[100%] md:h-[200px] w-[100%] h-[180px] group overflow-hidden">
            <Image
              src={entry.coverImage || "/placeholder.svg"}
              alt={entry.title}
              width={600}
              height={600}
              className="object-cover content-bg dark:bg-black dark:bg-opacity-60 transform transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <h3 className="py-1 px-3 font-roboto-slab text-white bg-black dark:bg-opacity-60">
          {entry.title}
        </h3>
      </Link>
    </div>
  );
}
