import { motion, AnimatePresence } from "framer-motion";

export const Loading = () => {
  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    initial: {
      y: "0%",
    },
    animate: {
      y: "100%",
    },
  };

  const dotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <motion.div
        className="flex space-x-2"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.span
          className="block w-4 h-4 bg-purple-500 rounded-full"
          variants={dotVariants}
          transition={dotTransition}
        />
        <motion.span
          className="block w-4 h-4 bg-purple-500 rounded-full"
          variants={dotVariants}
          transition={{ ...dotTransition, delay: 0.1 }}
        />
        <motion.span
          className="block w-4 h-4 bg-purple-500 rounded-full"
          variants={dotVariants}
          transition={{ ...dotTransition, delay: 0.2 }}
        />
      </motion.div>
      <h2 className="mt-8 text-xl sm:text-2xl font-bold tracking-wide text-center">
        Weaving your wishes...
      </h2>
    </div>
  );
};
