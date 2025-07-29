"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { MusicContent, ContentItem } from "@/types/content";
import MusicPlayerModal from "@/components/music-player-modal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MusicPage() {
  const [entries, setEntries] = useState<(MusicContent & ContentItem)[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<
    (MusicContent & ContentItem) | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/music");
        if (!response.ok) {
          throw new Error("Failed to fetch music data");
        }
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error loading music data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMusicClick = (music: MusicContent & ContentItem) => {
    setSelectedMusic(music);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMusic(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-2 mb-32 m:mb-0">
        <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
          Music
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 dark:bg-gray-700 h-[180px] md:h-[200px] rounded"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-20 mt-2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-32 m:mb-0 ">
      <div className="flex justify-between items-center">
        <h1 className="font-roboto-slab text-xl font-normal content-bg px-3 py-1 inline-block dark:bg-black dark:bg-opacity-60">
          Music
        </h1>
        <Link href="/" className="text-sm ml-2">
          <ArrowLeft className="h-8 w-8" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {entries.map((entry) => (
          <div key={entry.id}>
            <button
              onClick={() => handleMusicClick(entry)}
              className="block w-full text-left"
            >
              {entry.coverImage && (
                <div className="flex flex-row md:w-[100%] md:h-[200px] w-[100%] h-[180px] group overflow-hidden">
                  <Image
                    src={entry.coverImage || "/placeholder.svg"}
                    alt={entry.title}
                    width={400}
                    height={120}
                    className="object-cover content-bg dark:bg-black dark:bg-opacity-60 transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div
                key={entry.id}
                className="content-bg  prose prose-sm dark:prose-invert p-3 dark:bg-black dark:bg-opacity-60"
              >
                <div>
                  <h2 className="font-roboto-slab font-normal">
                    {entry.title}
                  </h2>
                  {entry.description && (
                    <p className="text-sm mt-2 mb-0 hidden md:block">
                      {entry.description.substring(0, 100)}...
                    </p>
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <MusicPlayerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        music={selectedMusic}
      />
    </div>
  );
}
