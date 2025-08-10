import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrapbookView = ({
  contributors,
  recipientName,
  handleStarClick,
}) => {
  const wishesPerPage = 6;
  const [page, setPage] = useState(0);

  const paginatedWishes = [];
  for (let i = 0; i < contributors.length; i += wishesPerPage) {
    paginatedWishes.push(contributors.slice(i, i + wishesPerPage));
  }

  const pageVariants = {
    initial: { opacity: 0, x: "100vw" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "-100vw" },
  };

  const handleNextPage = () => {
    setPage((prev) => (prev + 1) % paginatedWishes.length);
  };

  const handlePrevPage = () => {
    setPage(
      (prev) => (prev - 1 + paginatedWishes.length) % paginatedWishes.length
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-['Playfair_Display'] text-gray-800 pt-24 md:pt-16">
      {/* Dynamic Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(http://googleusercontent.com/file_content/1)`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 200,
          repeat: Infinity,
          ease: "linear",
        }}
      ></motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-center text-4xl font-bold text-rose-800 md:text-5xl">
          Tim's Scrapbook of Wishes
        </h1>
        <p className="mb-8 text-center text-xl italic text-gray-600">
          A collection of memories and kind words.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-dashed border-yellow-500 bg-white p-6 shadow-xl md:p-12 min-h-[60vh]"
          >
            <h2 className="mb-8 text-center text-3xl font-bold text-amber-900">
              Page {page + 1}
            </h2>
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
              {paginatedWishes[page].map((wish, index) => (
                <motion.div
                  key={wish.id}
                  className="relative cursor-pointer rounded-lg bg-red-50 p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                  initial={{ scale: 0.8, rotate: (Math.random() - 0.5) * 10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleStarClick(wish)}
                >
                  <div className="absolute -left-3 -top-3 -rotate-12 rounded-full bg-amber-200 px-3 py-1 text-sm font-bold text-amber-800 shadow-sm">
                    {wish.contributor_name}
                  </div>
                  <p className="mt-4 italic text-gray-700">
                    "
                    {wish.message && wish.message.length > 100
                      ? `${wish.message.substring(0, 100)}...`
                      : wish.message}
                    "
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Page navigation buttons */}
        <div className="mt-8 flex space-x-4">
          <button
            onClick={handlePrevPage}
            className="flex items-center rounded-full bg-rose-600 px-6 py-3 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-rose-500 disabled:opacity-50"
            disabled={page === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="flex items-center rounded-full bg-rose-600 px-6 py-3 text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-rose-500 disabled:opacity-50"
            disabled={page === paginatedWishes.length - 1}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
