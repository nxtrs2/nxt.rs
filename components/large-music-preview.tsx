import Link from "next/link";
import Image from "next/image";
import type { ContentItem } from "@/types/content";

interface LargeMusicPreviewProps {
  entry: ContentItem;
}

export default function LargeMusicPreview({ entry }: LargeMusicPreviewProps) {
  return (
    <div className="relative group">
      <div className="absolute top-0 left-0 bg-black text-white p-2 text-sm z-10">
        MUSIC
      </div>
      <Link
        href={`/music/${entry.id}`}
        className="block hover:opacity-90 transition-opacity"
      >
        {entry.coverImage && (
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
            <Image
              src={entry.coverImage || "/placeholder.svg"}
              alt={entry.title}
              width={800}
              height={400}
              className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="bg-black dark:bg-opacity-60 p-4">
          <h3 className="font-roboto-slab text-white text-xl mb-2">
            {entry.title}
          </h3>
          {entry.description && (
            <p className="text-gray-300 text-sm mb-3">{entry.description}</p>
          )}
          <div className="flex justify-end items-center">
            {/* <span className="text-gray-400 text-sm">
              {entry.created && new Date(entry.created).toLocaleDateString()}
            </span> */}
            <span className="text-white hover:text-gray-300 transition-colors">
              Listen →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
