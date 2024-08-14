import { motion } from 'framer-motion';
import wall from '../../../../public/images/wallpaepr.png'
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ChatPlaceholder() {
  return (
    <div className="h-full flex flex-col justify-center text-center bg-[#f7f7f7] py-4 px-6 overflow-y-auto">
      <motion.div
        className="flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Image
            src={wall}
            alt="No chat selected"
            className="mb-4 shadow-lg"
          />
        </motion.div>

        <motion.h2
          className="text-2xl font-semibold text-black mb-2"
          variants={itemVariants}
        >
          Welcome to the Chat!
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-2"
          variants={itemVariants}
        >
          Select a friend to start a conversation.
        </motion.p>

        <motion.button
          onClick={() => { }}
          type="button"
          className="xs:p-2 p-2 w-[50%] border-[2px] cursor-pointer rounded-md border-black bg-[black] text-white"
          variants={itemVariants}
        >
          Find new friends
        </motion.button>
      </motion.div>
    </div>
  );
}

export default ChatPlaceholder;
