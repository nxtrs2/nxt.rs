import Image from "next/image";
import Link from "next/link";

export default function MusicPreview({ entry }: { entry: any }) {
  return (
    <div className="space-y-2 md:max-w-[490px]">
      <Link
        href={`/music/${entry.id}`}
        className=" block hover:opacity-80 transition-opacity"
      >
        <h3 className="content-bg inline-block font-roboto-slab text-xl font-normal dark:bg-black dark:bg-opacity-60">
          MUSIC: {entry.title}
        </h3>
        <div className="flex items-start space-x-4 mt-1">
          {entry.coverImage && (
            <div className="flex flex-row">
              <Image
                src={entry.coverImage || "/placeholder.svg"}
                alt={entry.title}
                width={200}
                height={200}
                className="object-cover content-bg dark:bg-black dark:bg-opacity-60"
              />

              <div className=" content-bg dark:bg-black dark:bg-opacity-60 flex flex-col justify-between">
                <p className=" text-gray-800 dark:text-gray-200">
                  {entry.isAlbum ? "Album" : "Single"} Set of paragraphs with
                  more text here going on at length about something interesting.
                </p>
                <div> {entry.isAlbum ? "Album" : "Track"}</div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
