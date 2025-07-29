"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ModalMusicPlayer from "./modal-music-player";
import type { MusicContent, ContentItem } from "@/types/content";

interface MusicPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  music: (MusicContent & ContentItem) | null;
}

export default function MusicPlayerModal({
  isOpen,
  onClose,
  music,
}: MusicPlayerModalProps) {
  if (!music) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-fit p-0 bg-transparent border-none animate-in fade-in duration-1000">
        <DialogTitle className="sr-only">
          Now Playing: {music.title}
        </DialogTitle>
        <ModalMusicPlayer
          audioFile={music.audioFile || music.songUrl}
          title={music.title}
          coverImage={music.coverImage}
          video={music.video}
          contentHtml={music.contentHtml}
          tracks={music.tracks}
          trackId={music.id}
        />
      </DialogContent>
    </Dialog>
  );
}
