import React, { useState, useEffect, useRef, use } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const BackgroundMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Use a public domain or royalty-free track
  const audioSrc = "https://www.bensound.com/bensound-music/bensound-sunny.mp3";

  // Function to toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          // Autoplay was prevented, handle this gracefully
          console.error("Autoplay was prevented:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={audioSrc} loop muted={!isPlaying}></audio>
      <button
        onClick={togglePlay}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 p-2 text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-indigo-500"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          // Pause Icon SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-pause"
          >
            <rect x="6" y="4" width="4" height="16" rx="1"></rect>
            <rect x="14" y="4" width="4" height="16" rx="1"></rect>
          </svg>
        ) : (
          // Play Icon SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-play"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>
    </div>
  );
};
