import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MemoryWallView = ({ contributors, handleStarClick }) => {
  // Generate fixed random positions and rotations for each card on initial render
  const [cardPositions, setCardPositions] = useState([]);
  useEffect(() => {
    const positions = contributors.map(() => ({
      top: `${10 + Math.random() * 80}vh`,
      left: `${10 + Math.random() * 80}vw`,
      rotate: `${Math.random() * 20 - 10}deg`, // Random rotation between -10 and 10 degrees
    }));
    setCardPositions(positions);
  }, [contributors.length]);

  // Variants for the card animation
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-orange-200 font-['Baloo_2'] text-gray-800 pt-24 md:pt-16">
      {/* Memory Wall Texture Background */}
      <div className="fixed inset-0 z-0 bg-[url('https://placehold.co/100x100/A0522D/FFFFFF/png?text=Wall')] opacity-40"></div>
      <div className="relative z-10 p-4">
        <h1 className="mb-4 text-center text-4xl font-extrabold text-orange-900 md:text-6xl">
          The Memory Wall
        </h1>
        <p className="mb-8 text-center text-lg italic text-orange-800 md:text-xl">
          A space filled with shared memories and wishes.
        </p>
      </div>

      {/* Scrollable Container for Wishes */}
      <div className="relative z-20 h-full w-full overflow-auto p-4 md:p-8">
        <div className="relative h-[200vh] w-[200vw]">
          {" "}
          {/* This creates the large scrollable area */}
          <AnimatePresence>
            {contributors.map((wish, index) => (
              <motion.div
                key={wish.id}
                className="absolute cursor-pointer rounded-lg bg-white p-4 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  top: cardPositions[index]?.top,
                  left: cardPositions[index]?.left,
                  transform: `rotate(${cardPositions[index]?.rotate})`,
                  width: "300px",
                  height: "200px",
                }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => handleStarClick(wish)}
              >
                {/* Pin Icon */}
                <div className="absolute -left-1/2 -top-3 h-4 w-4 -translate-x-1/2 rounded-full bg-red-600 shadow-md"></div>
                <h3 className="mb-2 text-xl font-bold text-orange-700">
                  {wish.contributor_name}
                </h3>
                <p className="italic text-gray-600">
                  "{wish.message.substring(0, 100)}..."
                </p>
                {wish.gif && (
                  <img
                    src={wish.gif}
                    alt="Wish GIF"
                    className="mt-2 h-24 w-full rounded-md object-cover"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
