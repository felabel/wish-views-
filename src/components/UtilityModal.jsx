import { motion } from "framer-motion";
export const UtilityModal = ({ modalType, onClose }) => {
  let title = "";
  let content = "";
  let color = "";
  let buttonColor = "";

  switch (modalType) {
    case "redeem":
      title = "Redeem Gift";
      content =
        "You have a gift of $8.95! Please contact the sender for details on how to redeem your gift.";
      color = "bg-violet-600";
      buttonColor = "bg-violet-800";
      break;
    case "reply":
      title = "Reply to Contributors";
      content = (
        <textarea
          className="h-32 w-full rounded-md p-2 text-gray-800"
          placeholder="Write your thank you message here..."
        ></textarea>
      );
      color = "bg-indigo-600";
      buttonColor = "bg-indigo-800";
      break;
    case "download":
      title = "Download Wishes";
      content =
        "Your wishes are ready to be downloaded as a PDF or image file. Click below to download.";
      color = "bg-purple-600";
      buttonColor = "bg-purple-800";
      break;
    case "share":
      title = "Share Your Wishes";
      content = (
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.09 3.73 9.31 8.58 10.09V14.1h-2.1v-2.1h2.1V10c0-2.31 1.4-3.57 3.47-3.57 1.01 0 1.88.07 2.13.1v2.46h-1.45c-1.14 0-1.36.54-1.36 1.33v1.73h2.64l-.46 2.1h-2.18V22c4.85-.78 8.58-5 8.58-10C22 6.48 17.52 2 12 2z"></path>
            </svg>
            <span>Facebook</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.78 0 3.47-.48 4.96-1.32l.33.15-.35.25c-.2.15-.4.29-.6.41l-.47.28c-.14.08-.28.16-.42.23-.27.13-.56.24-.85.34-.3.1-.6.18-.9.25-.26.06-.52.12-.78.17-.4.08-.8.14-1.2.19-.1.02-.2.03-.3.05-.6.06-1.2.09-1.8.09-5.52 0-10-4.48-10-10S6.48 2 12 2zm-2.5 13.5c-.14-.26-.26-.54-.35-.85-.09-.3-.18-.6-.25-.9-.06-.26-.12-.52-.17-.78-.05-.2-.09-.4-.14-.6-.02-.1-.03-.2-.05-.3-.06-.6-.09-1.2-.09-1.8 0-.6.03-1.2.09-1.8.02-.1.03-.2.05-.3.05-.2.09-.4.14-.6.06-.26.12-.52.17-.78-.2.2-.41.4-.62.57-.21.17-.43.32-.65.45-.22.13-.45.25-.68.35-.23.1-.47.18-.7.25-.22.07-.45.12-.67.17-.22.04-.45.07-.68.09-.23.02-.47.03-.7.03-.24 0-.48-.01-.72-.03-.22-.02-.45-.05-.67-.09-.23-.05-.47-.1-.7-.17-.23-.07-.45-.15-.68-.25-.22-.1-.43-.21-.65-.35-.22-.13-.41-.28-.56-.45-.17-.21-.33-.43-.47-.66-.14-.23-.26-.5-.35-.73-.09-.31-.18-.6-.25-.9-.06-.26-.12-.52-.17-.78-.2.2-.41.4-.62.57-.21.17-.43.32-.65.45-.22.13-.45.25-.68.35-.23.1-.47.18-.7.25-.22.07-.45.12-.67.17-.22.04-.45.07-.68.09-.23.02-.47.03-.7.03-.24 0-.48-.01-.72-.03z"
                fill="#FFF"
              />
            </svg>
            <span>WhatsApp</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.78 0 3.47-.48 4.96-1.32l.33.15-.35.25c-.2.15-.4.29-.6.41l-.47.28c-.14.08-.28.16-.42.23-.27.13-.56.24-.85.34-.3.1-.6.18-.9.25-.26.06-.52.12-.78.17-.4.08-.8.14-1.2.19-.1.02-.2.03-.3.05-.6.06-1.2.09-1.8.09-5.52 0-10-4.48-10-10S6.48 2 12 2zm-2.5 13.5c-.14-.26-.26-.54-.35-.85-.09-.3-.18-.6-.25-.9-.06-.26-.12-.52-.17-.78-.05-.2-.09-.4-.14-.6-.02-.1-.03-.2-.05-.3-.06-.6-.09-1.2-.09-1.8 0-.6.03-1.2.09-1.8.02-.1.03-.2.05-.3.05-.2.09-.4.14-.6.06-.26.12-.52.17-.78-.2.2-.41.4-.62.57-.21.17-.43.32-.65.45-.22.13-.45.25-.68.35-.23.1-.47.18-.7.25-.22.07-.45.12-.67.17-.22.04-.45.07-.68.09-.23.02-.47.03-.7.03-.24 0-.48-.01-.72-.03-.22-.02-.45-.05-.67-.09-.23-.05-.47-.1-.7-.17-.23-.07-.45-.15-.68-.25-.22-.1-.43-.21-.65-.35-.22-.13-.41-.28-.56-.45-.17-.21-.33-.43-.47-.66-.14-.23-.26-.5-.35-.73-.09-.31-.18-.6-.25-.9-.06-.26-.12-.52-.17-.78-.2.2-.41.4-.62.57-.21.17-.43.32-.65.45-.22.13-.45.25-.68.35-.23.1-.47.18-.7.25-.22.07-.45.12-.67.17-.22.04-.45.07-.68.09-.23.02-.47.03-.7.03-.24 0-.48-.01-.72-.03z"
                fill="#FFF"
              />
            </svg>
            <span>TikTok</span>
          </a>
          {/* Add other social media icons here */}
        </div>
      );
      color = "bg-indigo-600";
      buttonColor = "bg-indigo-800";
      break;
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.2 },
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
        className={`w-full max-w-md rounded-xl ${color} p-6 text-white shadow-2xl`}
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="text-3xl font-bold text-white transition-colors duration-200 hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        <div className="text-lg">{content}</div>
        {modalType === "reply" && (
          <button
            className={`mt-4 w-full rounded-md ${buttonColor} p-2 font-bold transition-colors hover:bg-opacity-80`}
          >
            Send Reply
          </button>
        )}
        {modalType === "download" && (
          <button
            className={`mt-4 w-full rounded-md ${buttonColor} p-2 font-bold transition-colors hover:bg-opacity-80`}
          >
            Download Now
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};
