import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TimelineView = ({
  contributors,
  recipientName,
  handleStarClick,
}) => {
  // Sort contributors by created_at date to ensure correct order
  const sortedContributors = [...contributors].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  const timelineItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-slate-800 font-['Baloo_2'] text-white pt-24 md:pt-16">
      <div className="relative z-10 flex h-full flex-col items-center p-4">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-lime-400 md:text-6xl">
          {recipientName}'s Wish Timeline
        </h1>
        <p className="mb-12 text-center text-lg italic text-gray-300 md:text-xl">
          Wishes, in the order they were received.
        </p>

        <div className="relative w-full max-w-2xl px-4">
          {/* The main vertical timeline line */}
          <div className="absolute inset-y-0 left-1/2 -ml-0.5 w-1 rounded-full bg-lime-500"></div>

          {sortedContributors.map((wish, index) => {
            const isEven = index % 2 === 0;
            const date = new Date(wish.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <motion.div
                key={wish.id}
                className={`mb-8 flex items-center w-full ${
                  isEven
                    ? "flex-row-reverse left-0"
                    : "left-1/2 -translate-x-1/2"
                }`}
                variants={timelineItemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => handleStarClick(wish)}
              >
                <div className="flex w-1/2 justify-center">
                  <div
                    className={`relative cursor-pointer rounded-lg p-4 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      isEven ? "bg-lime-700 md:mr-8" : "bg-green-700 md:ml-8"
                    }`}
                  >
                    {/* Timeline node */}
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 rounded-full h-4 w-4 bg-lime-400 border-2 border-white z-10 ${
                        isEven ? "-right-2" : "-left-2"
                      }`}
                    ></div>

                    <h3 className="mb-1 text-xl font-bold text-white">
                      {wish.contributor_name}
                    </h3>
                    <p className="text-gray-200 text-sm">{date}</p>
                    <p className="mt-2 italic text-gray-300">
                      "{wish.message.substring(0, 50)}..."
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
