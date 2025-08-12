import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../../assets/bg.png";

export const GiftBoxView = ({
  contributors,
  recipientName,
  handleStarClick,
  isUnwrapped,
  setIsUnwrapped,
}) => {
  const confettiColors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
  ];

  const containerVariants = {
    unwrapped: {
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  const giftBoxVariants = {
    initial: { scale: 0.5, opacity: 0, rotate: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
    unwrapped: {
      y: -1000,
      opacity: 0,
      scale: 0.2,
      transition: {
        duration: 0.8,
      },
    },
  };

  const confettiVariants = {
    hidden: { opacity: 0, scale: 0 },
    show: {
      opacity: [0, 1, 0],
      scale: [1, 1.2, 0.5],
      y: [0, -500],
      rotate: 360,
      transition: {
        duration: 2,
        ease: "easeOut",
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // staggerChildren: 0.1,
        delayChildren: 1.5,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        // type: "spring",
        stiffness: 150,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-800 to-indigo-900 font-['Baloo_2'] text-white pt-24 md:pt-16">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${bg})`,
          opacity: 1,
          zIndex: 0,
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 200,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      </div>

      <AnimatePresence>
        {!isUnwrapped && (
          <motion.div
            className="relative z-20 flex cursor-pointer flex-col items-center justify-center p-4 text-center"
            variants={giftBoxVariants}
            initial="initial"
            animate="animate"
            exit="unwrapped"
            onClick={() => setIsUnwrapped(true)} // Now uses the prop setter
          >
            <div className="relative h-64 w-64 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-pink-500 shadow-2xl transition-transform duration-300 hover:scale-105">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-full rotate-45 bg-rose-500"></div>
                <div className="absolute h-full w-6 -rotate-45 bg-rose-500"></div>
              </div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 transform">
                <div className="h-12 w-12 rounded-t-full bg-rose-500 before:absolute before:left-1/2 before:top-0 before:h-12 before:w-12 before:-translate-x-1/2 before:rounded-t-full before:bg-rose-500 before:rotate-45 after:absolute after:left-1/2 after:top-0 after:h-12 after:w-12 after:-translate-x-1/2 after:rounded-t-full after:bg-rose-500 after:-rotate-45"></div>
              </div>
            </div>
            <motion.button
              className="mt-8 rounded-full bg-white px-8 py-3 text-lg font-bold text-purple-700 shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Unwrap Me!
            </motion.button>
            <p className="mt-4 text-lg text-white text-medium bg-pink-400 p-4 rounded-lg shadow-lg">
              Click the box to reveal your wishes!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUnwrapped && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Confetti Animation */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: `calc(50% + ${Math.random() * 200 - 100}px)`,
                  left: `calc(50% + ${Math.random() * 200 - 100}px)`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  backgroundColor:
                    confettiColors[
                      Math.floor(Math.random() * confettiColors.length)
                    ],
                  x: `0`,
                  y: `0`,
                }}
                variants={confettiVariants}
                initial="hidden"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [1, 1.2, 0.5],
                  x: Math.random() * 800 - 400,
                  y: Math.random() * 800 - 400,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  transition: {
                    duration: Math.random() * 2 + 1,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  },
                }}
              />
            ))}

            <motion.div
              className="relative z-20 mt-24 flex h-full flex-col items-center justify-start p-4"
              variants={containerVariants}
              animate="unwrapped"
            >
              <div className="bg-gradient-to-r from-pink-400 to-yellow-300 mb-8 px-6 md:px-12 rounded-lg shadow-lg">
                <h1 className=" text-center text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent md:text-6xl">
                  {recipientName}'s Wishes
                </h1>
              </div>

              <motion.div
                className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={cardContainerVariants}
                initial="hidden"
                animate="show"
              >
                {contributors.map((wish, index) => (
                  <motion.div
                    key={wish.id}
                    className="cursor-pointer rounded-xl bg-purple-500 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-purple-400"
                    variants={cardVariants}
                    whileHover={{ scale: 1.08 }}
                    onClick={() => handleStarClick(wish)}
                  >
                    <h3 className="mb-2 text-2xl font-bold text-violet-200">
                      {wish.contributor_name}
                    </h3>
                    <p className="italic text-gray-200">
                      "{wish.message.substring(0, 70)}..."
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
