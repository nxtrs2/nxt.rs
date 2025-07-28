import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="inline-block py-1 px-3 font-roboto-slab md:text-xl font-normal content-bg dark:bg-black dark:bg-opacity-60">
          Page Not Found
        </h1>
        <Link href="/" className="text-sm ml-2">
          <Home className="h-8 w-8" />
        </Link>
      </div>

      {/* Error Content */}
      <div className="content-bg prose prose-sm dark:prose-invert p-6 dark:bg-black dark:bg-opacity-60 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl font-bold text-gray-300">404</div>
          <h2 className="font-roboto-slab text-xl font-normal">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            The page you're looking for doesn't exist or may have been moved.
            Please check the URL or return to the homepage.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
