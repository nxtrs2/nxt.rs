"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, X, Info, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalMusicPlayerProps {
  audioFile: string;
  title: string;
  coverImage?: string;
  video?: string;
  className?: string;
  contentHtml?: string;
  tracks?: string[];
  trackId?: string;
  onClose?: () => void;
}

export default function ModalMusicPlayer({
  audioFile,
  title,
  coverImage,
  video,
  className,
  contentHtml,
  tracks,
  trackId,
  onClose,
}: ModalMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyAnimation, setCopyAnimation] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsReady(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      // Pause video when audio is paused
      if (video && videoRef.current) {
        videoRef.current.pause();
      }
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      // Start video when audio starts playing
      if (video && !videoStarted) {
        setVideoStarted(true);
        // Start the video element
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.error("Error playing video:", error);
          });
        }
      } else if (video && videoRef.current) {
        // Resume video if it was already started
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(newVolume);
    audio.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      handleVolumeChange(volume);
    } else {
      handleVolumeChange(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "relative w-96 h-96 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] rounded-lg overflow-hidden bg-black",
        className
      )}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioFile}
        preload="metadata"
        onError={(e) => console.error("Audio error:", e)}
      />

      {/* Video Background */}
      {video && isClient && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          poster={coverImage}
        >
          <source src={`/images/music/videos/${video}`} type="video/mp4" />
          {/* Fallback to cover image if video fails to load */}
          {coverImage && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${coverImage})` }}
            />
          )}
        </video>
      )}

      {/* Album Cover Background (fallback when no video) */}
      {!video && coverImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-200 transform hover:scale-105"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        {/* Info Box */}
        <div
          className={`transition-opacity duration-1000 ease-in-out mb-3 md:mb-4 ${
            showInfo
              ? "opacity-100"
              : "opacity-0 ease-in-out h-0 overflow-hidden"
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 md:p-6 text-white font-bold text-sm md:text-base">
            {contentHtml && (
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            )}
            {tracks && tracks.length > 0 && (
              <div className="text-center">
                <p className="font-semibold mb-2">Tracks:</p>
                <ul className="space-y-1">
                  {tracks.map((track, index) => (
                    <li key={index}>{track}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Title and Play Button Row */}
        <div className="flex items-center gap-2 md:gap-2 mb-4 md:mb-2">
          {/* Play Button */}
          <div className="flex-1 flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 md:p-3 transition-all duration-200 transform hover:scale-105 flex-shrink-0"
              disabled={!isReady}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <Play className="h-5 w-5 md:h-6 md:w-6 ml-0.5" />
              )}
            </button>

            {/* Title */}
            <h2 className="text-white font-roboto-slab text-xs md:text-md lg:text-sm text-start bg-black p-1 ">
              {title}
            </h2>
          </div>

          {/* Info Button */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-1.5 md:p-2 transition-all duration-200 transform hover:scale-105 flex-shrink-0 cursor-pointer"
          >
            <Info className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          {/* Copy Link Button */}
          <button
            onClick={async () => {
              try {
                // Construct the proper URL to the music track using the track ID
                const trackUrl = trackId
                  ? `${window.location.origin}/music/${trackId}`
                  : `${window.location.origin}/music/${title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")}`;
                await navigator.clipboard.writeText(trackUrl);

                // Show copied feedback with animation
                setCopied(true);
                setCopyAnimation(true);

                // Reset animation after it completes
                setTimeout(() => {
                  setCopyAnimation(false);
                  setCopied(false);
                }, 2000);
              } catch (error) {
                console.error("Failed to copy link:", error);
              }
            }}
            className={`relative cursor-pointer backdrop-blur-sm text-white rounded-full p-1.5 md:p-2 transition-all duration-200 transform hover:scale-105 flex-shrink-0 ${
              copied
                ? "bg-gray-500/80 hover:bg-gray-600/80"
                : "bg-none hover:bg-white/30"
            }`}
            title={copied ? "Link copied!" : "Copy link"}
          >
            {/* Animated "Copied!" text overlay */}
            {copyAnimation && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-medium text-white animate-copy-feedback">
                  Copied!
                </span>
              </div>
            )}

            {copied ? (
              <svg
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <Share2 className="h-4 w-4 md:h-5 md:w-5" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div
          className="mb-3 md:mb-4 cursor-pointer bg-white/20 rounded-full h-2 md:h-3 relative backdrop-blur-sm"
          onClick={handleSeek}
        >
          <div
            className="bg-white h-full rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Time and Controls */}
        <div className="flex items-center justify-between text-white text-sm md:text-base">
          <span>{formatTime(currentTime)}</span>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleMute}
              className="hover:text-gray-300 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-12 md:w-16 h-1 md:h-1.5 rounded-lg  cursor-pointer slider"
            />
          </div>

          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
