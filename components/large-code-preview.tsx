import Link from "next/link";
import Image from "next/image";
import type { ContentItem } from "@/types/content";

interface LargeCodePreviewProps {
  entry: ContentItem;
}

export default function LargeCodePreview({ entry }: LargeCodePreviewProps) {
  return (
    <div className="relative group">
      <div className="absolute top-0 left-0 bg-black text-white p-2 text-sm z-10">
        CODE
      </div>
      <Link
        href={`/code/${entry.id}`}
        className="block hover:opacity-90 transition-opacity"
      >
        {entry.image && (
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden">
            <Image
              src={entry.image || "/placeholder.svg"}
              alt={entry.title}
              width={800}
              height={400}
              className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
      <div className="bg-black dark:bg-opacity-60 p-4">
        <Link
          href={`/code/${entry.id}`}
          className="block hover:opacity-90 transition-opacity"
        >
          <h3 className="font-roboto-slab text-white text-xl mb-2">
            {entry.title}
          </h3>
          {entry.description && (
            <p className="text-gray-300 text-sm mb-3">{entry.description}</p>
          )}
        </Link>
        <div className="flex justify-end items-center">
          {/* <span className="text-gray-400 text-sm">
              {entry.created && new Date(entry.created).toLocaleDateString()}
            </span> */}
          <Link
            href={`/code`}
            className="block hover:opacity-90 transition-opacity"
          >
            <span className="text-white hover:text-gray-300 transition-colors">
              View all Code →
            </span>
          </Link>

          {/* <span className="text-white hover:text-gray-300 transition-colors">
              View →
            </span> */}
        </div>
      </div>
    </div>
  );
}
