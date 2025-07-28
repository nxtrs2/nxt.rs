import Link from "next/link";
import { ArrowLeft, Music } from "lucide-react";

export default function NotFound() {
  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <h1 className="inline-block py-1 px-3 font-roboto-slab md:text-xl font-normal content-bg dark:bg-black dark:bg-opacity-60">
          Music Not Found
        </h1>
        <Link href={`/music/`} className="text-sm ml-2">
          <ArrowLeft className="h-8 w-8" />
        </Link>
      </div>

      {/* Error Content */}
      <div className="content-bg prose prose-sm dark:prose-invert p-6 dark:bg-black dark:bg-opacity-60 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Music className="h-16 w-16 text-gray-400" />
          <h2 className="font-roboto-slab text-xl font-normal">
            Music Track Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            The music track you're looking for doesn't exist or may have been
            moved. Please check the URL or browse our music collection.
          </p>
          <Link
            href="/music"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Music
          </Link>
        </div>
      </div>
    </div>
  );
}
