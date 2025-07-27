import Link from "next/link";
import SimpleMusicPlayer from "./simple-music-player";
import type { ContentItem } from "@/types/content";

interface MusicPreviewProps {
  entry: ContentItem;
}

export default function MusicPreview({ entry }: MusicPreviewProps) {
  // Extract SoundCloud track ID from URL
  const getSoundCloudEmbedUrl = (url: string) => {
    // SoundCloud URLs are typically like: https://soundcloud.com/user/track-name
    // We need to convert to embed format: https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user/track-name
    const encodedUrl = encodeURIComponent(url);
    return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
  };

  return (
    <div className="relative">
      {entry.audioFile ? (
        // Use simple player for hosted audio files
        <SimpleMusicPlayer
          audioFile={entry.audioFile}
          title={entry.title}
          coverImage={entry.coverImage}
          className="h-[90px] md:h-[150px]"
        />
      ) : entry.isSoundcloud && entry.songUrl ? (
        // Fallback to SoundCloud for external tracks
        <div className="w-full h-[90px] md:h-[150px]">
          <iframe
            width="100%"
            height="100%"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={getSoundCloudEmbedUrl(entry.songUrl)}
            title={entry.title}
            className="w-full h-full"
          />
        </div>
      ) : (
        // No audio available
        <div className="w-full h-[90px] md:h-[150px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Audio player not available
          </p>
        </div>
      )}

      <Link
        href={`/music/${entry.id}`}
        className="block py-1 px-3 font-roboto-slab text-white bg-black dark:bg-opacity-60 hover:bg-opacity-80 transition-opacity"
      >
        {entry.title}
      </Link>
    </div>
  );
}
