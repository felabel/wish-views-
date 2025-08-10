import { motion } from "framer-motion";

export const WishModal = ({ wish, contributors, onClose, onNavigate }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 font-['Baloo_2']"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-full w-full max-w-2xl overflow-y-auto rounded-xl bg-slate-900 p-8 text-white shadow-2xl md:p-12"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        {/* Navigation Buttons */}
        <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
          <button
            onClick={() => onNavigate("prev")}
            className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-3xl font-bold text-white transition-colors duration-200 hover:text-gray-400"
        >
          &times;
        </button>
        <div className="flex flex-col items-center text-center">
          <h3 className="mb-2 text-2xl font-bold text-violet-400">
            {wish.contributor_name}
          </h3>
          <p className="mb-6 text-xl italic text-gray-300">
            " {wish.message} "
          </p>

          {wish.gif && (
            <img
              src={wish.gif}
              alt="Wish GIF"
              className="my-4 max-h-64 rounded-lg object-cover shadow-lg"
            />
          )}
          {/* Add more types (video, audio) here */}
        </div>
      </motion.div>
    </motion.div>
  );
};
