import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Component for tiny background stars
const BackgroundStars = () => {
  const starCount = 300;
  const stars = Array.from({ length: starCount }, (_, i) => {
    const position = {
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 2 + 1}px`,
      delay: Math.random() * 10,
      duration: Math.random() * 3 + 2,
    };
    return (
      <motion.div
        key={i}
        className="absolute z-0 rounded-full bg-white opacity-0"
        style={{
          top: position.top,
          left: position.left,
          width: position.size,
          height: position.size,
        }}
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: position.duration,
          delay: position.delay,
          ease: "easeInOut",
        }}
      />
    );
  });
  return <div className="absolute inset-0 pointer-events-none">{stars}</div>;
};

const Star = ({ wish, index, onClick, positionX, positionY }) => {
  const size = Math.random() * 20 + 20;
  const delay = Math.random() * 2;

  const starVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 1,
        type: "spring",
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.2,
      boxShadow: "0 0 20px 8px rgba(192, 132, 252, 0.7)", // Purple glow
      transition: {
        duration: 0.3,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 10px 4px rgba(192, 132, 252, 0.5)",
        "0 0 15px 6px rgba(224, 204, 250, 0.7)",
        "0 0 10px 4px rgba(192, 132, 252, 0.5)",
      ],
      transition: {
        repeat: Infinity,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 3,
      },
    },
  };

  return (
    <motion.div
      className="absolute z-10 cursor-pointer transition-shadow duration-300"
      style={{
        top: `${positionY}vh`,
        left: `${positionX}vw`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      variants={starVariants}
      initial="initial"
      animate={["animate", "pulse"]}
      whileHover="hover"
      onClick={() => onClick(wish)}
      title={`Click to read ${wish.contributor_name}'s wish`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient
            id="star-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "rgb(224, 204, 250)", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "rgb(192, 132, 252)", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.31L22 9.27l-5 4.87 1.18 6.88L12 17.5l-6.18 3.42L7 14.14l-5-4.87 6.91-1L12 2z"
          fill="url(#star-gradient)"
          stroke="white"
        />
      </svg>
    </motion.div>
  );
};

export const ConstellationView = ({
  contributors,
  recipientName,
  handleStarClick,
  mainWish,
}) => {
  const otherWishes = contributors.slice(0, -1);
  const [starPositions, setStarPositions] = useState([]);

  const MainStar = ({ recipient, onClick }) => {
    const textVariants = {
      pulse: {
        scale: [1, 1.05, 1],
        textShadow: [
          "0 0 10px rgba(224, 204, 250, 0.5)",
          "0 0 15px rgba(224, 204, 250, 0.7)",
          "0 0 10px rgba(224, 204, 250, 0.5)",
        ],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
      },
    };
    return (
      <motion.div
        className="absolute right-0 left-0 top-1/2 z-20 flex  cursor-pointer flex-col items-center justify-center text-center font-['Dancing_Script'] text-white"
        variants={textVariants}
        animate="pulse"
        onClick={() => onClick(mainWish)}
        title={`Click to read the main message for ${recipient}`}
      >
        <div className="flex items-center justify-center whitespace-nowrap text-4xl md:text-6xl">
          <span className="heart-emoji">💖</span>
          <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
            Happy Birthday,
          </span>
          <span className="heart-emoji">💖</span>
        </div>
        <div className="flex items-center justify-center whitespace-nowrap text-4xl font-extrabold md:text-6xl">
          <span className="heart-emoji">💖</span>
          <span className="bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent">
            {recipient}!
          </span>
          <span className="heart-emoji">💖</span>
        </div>
      </motion.div>
    );
  };
  // Generate fixed star positions once on initial render
  useEffect(() => {
    const generatePositions = () => {
      const positions = [];
      const numStars = otherWishes.length;
      const radius = 35; // Radius of the circle for star placement
      const center = { x: 50, y: 50 };

      for (let i = 0; i < numStars; i++) {
        const angle = (i / numStars) * 2 * Math.PI;
        const x = center.x + radius * Math.cos(angle);
        const y = center.y + radius * Math.sin(angle);
        positions.push({ x, y });
      }
      return positions;
    };
    setStarPositions(generatePositions());
  }, [otherWishes.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-[#1c0024] to-black font-['Baloo_2'] text-white pt-24 md:pt-16">
      <style>
        {`
            .heart-emoji {
              font-size: 2rem;
              color: #ef4444;
            }
            @media (max-width: 768px) {
              .heart-emoji {
                font-size: 1.5rem;
              }
            }
          `}
      </style>
      {/* Parallax Background Effect */}
      <motion.div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `
              radial-gradient(ellipse at center, rgba(224, 204, 250, 0.2) 0%, rgba(0,0,0,0) 70%),
              radial-gradient(circle at 10% 20%, rgba(192, 132, 252, 0.1) 0%, rgba(0,0,0,0) 50%),
              radial-gradient(circle at 80% 90%, rgba(239, 68, 68, 0.1) 0%, rgba(0,0,0,0) 50%)
            `,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 300,
          repeat: Infinity,
          ease: "linear",
        }}
      ></motion.div>
      <BackgroundStars />
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4">
        <h1 className="mb-8 text-center text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent md:text-6xl">
          A Constellation of Wishes
        </h1>
        <p className="mb-2 text-center text-lg text-gray-300 md:text-xl">
          For our very own,{" "}
          <span className="font-bold text-violet-400">{recipientName}</span>!
        </p>
        <motion.p
          className="mb-12 text-center text-base italic text-violet-300 md:text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Wishes in the stars, they do come true. Catch the stars!
        </motion.p>
      </div>

      <MainStar recipient={recipientName} onClick={handleStarClick} />
      {otherWishes.map((wish, index) => {
        const position = starPositions[index] || { x: 50, y: 50 };
        return (
          <Star
            key={wish.id}
            wish={wish}
            index={index}
            onClick={handleStarClick}
            positionX={position.x}
            positionY={position.y}
          />
        );
      })}
    </div>
  );
};
