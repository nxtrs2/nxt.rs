"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleMusicPlayerProps {
  audioFile: string;
  title: string;
  coverImage?: string;
  className?: string;
}

export default function SimpleMusicPlayer({
  audioFile,
  title,
  coverImage,
  className,
}: SimpleMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

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
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
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
        "bg-black dark:bg-gray-900 rounded-lg overflow-hidden relative",
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

      {/* Cover Image Background */}
      {coverImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        />
      )}

      <div className="relative z-10 p-3 md:p-4">
        {/* Compact Layout for Small Screens */}
        <div className="md:hidden">
          {/* Single Row Layout */}
          <div className="flex items-center gap-2 mb-2">
            {/* Play Button */}
            <div className="flex flex-row items-center gap-2">
              <button
                onClick={togglePlay}
                className="bg-black/40 hover:bg-orange-600 text-white rounded-full p-2 transition-colors flex-shrink-0"
                disabled={!isReady}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </button>

              {/* Title and Time */}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-roboto-slab text-sm truncate">
                  {title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Volume */}
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-3 w-3" />
              ) : (
                <Volume2 className="h-3 w-3" />
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div
            className="cursor-pointer bg-gray-700 rounded-full h-1.5 relative"
            onClick={handleSeek}
          >
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Expanded Layout for Medium+ Screens */}
        <div className="hidden md:block">
          {/* Header with Play Button and Title */}
          <div className="flex items-center gap-1 mb-3">
            {/* Large Orange Play Button */}
            <button
              onClick={togglePlay}
              className=" bg-black/40 hover:bg-orange-600 border rounded-full p-4 transition-colors flex-shrink-0 m-1"
              disabled={!isReady}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </button>

            {/* Title and Artist */}
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="text-white font-roboto-slab text-sm truncate bg-black p-1">
                {title}
              </h3>
              <p className="text-gray-300 text-sm truncate bg-black p-1 inline-block">
                NXTRS
              </p>
            </div>

            {/* Duration */}
            <div className="text-white text-sm flex-shrink-0">
              {formatTime(duration)}
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className="mb-3 cursor-pointer bg-gray-700 rounded-full h-2 relative"
            onClick={handleSeek}
          >
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between">
            {/* Current Time */}
            <div className="text-white text-sm">{formatTime(currentTime)}</div>

            {/* Volume Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
