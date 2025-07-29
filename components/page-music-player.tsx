"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageMusicPlayerProps {
  audioFile: string;
  title: string;
  coverImage?: string;
  video?: string;
  className?: string;
  contentHtml?: string;
  tracks?: string[];
}

export default function PageMusicPlayer({
  audioFile,
  title,
  coverImage,
  video,
  className,
  contentHtml,
  tracks,
}: PageMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
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
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Main Player Container */}
      <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/3] rounded-lg overflow-hidden bg-black">
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

        {/* Player Controls Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
          {/* Title and Play Button Row */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            {/* Play Button */}
            <button
              onClick={togglePlay}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 md:p-4 transition-all duration-200 transform hover:scale-105 flex-shrink-0"
              disabled={!isReady}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 md:h-8 md:w-8" />
              ) : (
                <Play className="h-6 w-6 md:h-8 md:w-8 ml-1" />
              )}
            </button>

            {/* Title */}
            <h2 className="text-white font-roboto-slab text-lg md:text-xl lg:text-2xl text-start bg-black/60 backdrop-blur-sm px-3 py-2 rounded">
              {title}
            </h2>
          </div>

          {/* Progress Bar */}
          <div
            className="mb-4 md:mb-6 cursor-pointer bg-white/20 rounded-full h-3 md:h-4 relative backdrop-blur-sm"
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

            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={toggleMute}
                className="hover:text-gray-300 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5 md:h-6 md:w-6" />
                ) : (
                  <Volume2 className="h-5 w-5 md:h-6 md:w-6" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 md:w-20 h-2 md:h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Permanent Info Section */}
      {(contentHtml || tracks) && (
        <div className="mt-6 md:mt-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 md:p-8 text-white">
            {contentHtml && (
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
              </div>
            )}
            {tracks && tracks.length > 0 && (
              <div className="mt-6 md:mt-8">
                <h3 className="font-roboto-slab text-lg md:text-xl font-normal mb-4">
                  Tracks
                </h3>
                <ol className="list-decimal list-inside space-y-2 md:space-y-3">
                  {tracks.map((track: string, idx: number) => (
                    <li key={idx} className="text-sm md:text-base">
                      {track}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
