import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundMusicPlayer } from "./components/BackgroundMusicPlayer";
import { ConstellationView } from "./components/views/ConstellationView";
import { ScrapbookView } from "./components/views/ScrapbookView";
import { MemoryWallView } from "./components/views/MemoryWallView";
import { GiftBoxView } from "./components/views/GiftBoxView";
import { TimelineView } from "./components/views/TimelineView";
import { WishModal } from "./components/WishModal";
import { UtilityModal } from "./components/UtilityModal.JSX";
import { Loading } from "./components/LoadingComponent";

const App = () => {
  const [viewMethod, setViewMethod] = useState("constellation");
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [selectedWish, setSelectedWish] = useState(null);
  const [utilityModal, setUtilityModal] = useState(null);
  const [wishDataState, setWishDataState] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.thewishweaver.com/card/guest/details/bd7fe896-f9f7-4a4f-8896-4c49614e2d2a?page=1&limit=500&order=ASC"
    )
      .then((res) => res.json())
      .then((data) => setWishDataState(data))
      .catch(() => setWishDataState(null));
  }, []);

  console.log("Wish Data State:", wishDataState);

  const wishDataToUse = wishDataState;
  //  || wishData;
  const contributors = wishDataToUse?.data?.contributors;
  const recipientName = wishDataToUse?.data?.recipient;
  const mainWish = contributors && contributors[contributors.length - 1];

  const handleStarClick = (wish) => {
    setSelectedWish(wish);
  };

  const handleCloseModal = () => {
    setSelectedWish(null);
  };

  const handleUtilityClick = (modalType) => {
    setUtilityModal(modalType);
  };

  const handleCloseUtilityModal = () => {
    setUtilityModal(null);
  };

  const handleNavigate = (direction) => {
    const currentIndex = contributors.findIndex(
      (w) => w.id === selectedWish.id
    );
    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % contributors.length;
    } else {
      newIndex = (currentIndex - 1 + contributors.length) % contributors.length;
    }
    setSelectedWish(contributors[newIndex]);
  };

  if (!wishDataState) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Dancing+Script:wght@400..700&display=swap');
          .font-['Baloo_2'] {
            font-family: 'Baloo 2', cursive;
          }
          .font-['Playfair_Display'] {
            font-family: 'Playfair Display', serif;
          }
          .font-['Dancing_Script'] {
            font-family: 'Dancing Script', cursive;
          }
        `}
      </style>

      {/* Fixed Navigation Tab */}
      <nav className="fixed left-0 right-0 top-0 z-40 flex flex-wrap justify-center space-x-2 bg-slate-900/80 p-4 shadow-lg backdrop-blur-sm text-white md:space-x-4">
        <button
          className={`rounded-full px-4 py-2 font-bold transition-colors duration-300 ${
            viewMethod === "constellation"
              ? "bg-violet-600"
              : "bg-transparent hover:bg-white/10"
          }`}
          onClick={() => {
            setViewMethod("constellation");
            setIsUnwrapped(false);
          }}
        >
          Constellation
        </button>
        <button
          className={`rounded-full px-4 py-2 font-bold transition-colors duration-300 ${
            viewMethod === "scrapbook"
              ? "bg-rose-600"
              : "bg-transparent hover:bg-white/10"
          }`}
          onClick={() => {
            setViewMethod("scrapbook");
            setIsUnwrapped(false);
          }}
        >
          Scrapbook
        </button>
        <button
          className={`rounded-full px-4 py-2 font-bold transition-colors duration-300 ${
            viewMethod === "giftbox"
              ? "bg-purple-600"
              : "bg-transparent hover:bg-white/10"
          }`}
          onClick={() => {
            setViewMethod("giftbox");
            setIsUnwrapped(false);
          }}
        >
          Gift Box
        </button>
        <button
          className={`rounded-full px-4 py-2 font-bold transition-colors duration-300 ${
            viewMethod === "memorywall"
              ? "bg-orange-600"
              : "bg-transparent hover:bg-white/10"
          }`}
          onClick={() => {
            setViewMethod("memorywall");
            setIsUnwrapped(false);
          }}
        >
          Memory Wall
        </button>
        <button
          className={`rounded-full px-4 py-2 font-bold transition-colors duration-300 ${
            viewMethod === "timeline"
              ? "bg-lime-600"
              : "bg-transparent hover:bg-white/10"
          }`}
          onClick={() => {
            setViewMethod("timeline");
            setIsUnwrapped(false);
          }}
        >
          Timeline
        </button>
      </nav>

      <>
        {/* Main Content View with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMethod}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {viewMethod === "constellation" && (
              <ConstellationView
                contributors={contributors}
                recipientName={recipientName}
                handleStarClick={handleStarClick}
                mainWish={mainWish}
              />
            )}
            {viewMethod === "scrapbook" && (
              <ScrapbookView
                contributors={contributors}
                recipientName={recipientName}
                handleStarClick={handleStarClick}
              />
            )}
            {viewMethod === "memorywall" && (
              <MemoryWallView
                contributors={contributors}
                handleStarClick={handleStarClick}
              />
            )}
            {viewMethod === "giftbox" && (
              <GiftBoxView
                contributors={contributors}
                recipientName={recipientName}
                handleStarClick={handleStarClick}
                isUnwrapped={isUnwrapped}
                setIsUnwrapped={setIsUnwrapped}
              />
            )}
            {viewMethod === "timeline" && (
              <TimelineView
                contributors={contributors}
                recipientName={recipientName}
                handleStarClick={handleStarClick}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating utility buttons */}
        <div className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 flex-wrap justify-center space-x-2 md:space-x-4 w-full gap-2">
          <button
            className="rounded-full bg-violet-600 px-4 py-2 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-violet-500"
            onClick={() => handleUtilityClick("redeem")}
          >
            Redeem Gift
          </button>
          <button
            className="rounded-full bg-indigo-600 px-4 py-2 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-indigo-500"
            onClick={() => handleUtilityClick("reply")}
          >
            Reply
          </button>
          <button
            className="rounded-full bg-purple-600 px-4 py-2 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-purple-500"
            onClick={() => handleUtilityClick("download")}
          >
            Download
          </button>
          <button
            className="rounded-full bg-fuchsia-600 px-4 py-2 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-fuchsia-500"
            onClick={() => handleUtilityClick("share")}
          >
            Share
          </button>
        </div>

        {/* Music player component */}
        <BackgroundMusicPlayer />

        {/* Modals with animations */}
        <AnimatePresence>
          {selectedWish && (
            <WishModal
              wish={selectedWish}
              contributors={contributors}
              onClose={handleCloseModal}
              onNavigate={handleNavigate}
            />
          )}
          {utilityModal && (
            <UtilityModal
              modalType={utilityModal}
              onClose={handleCloseUtilityModal}
            />
          )}
        </AnimatePresence>
      </>
    </div>
  );
};

export default App;
