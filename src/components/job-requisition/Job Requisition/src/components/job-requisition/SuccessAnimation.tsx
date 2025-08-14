import React from "react";
import { motion } from "framer-motion";

export const SuccessAnimation: React.FC = () => {
  // Animation variants for the success checkmark
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 0.5, bounce: 0 },
        opacity: { duration: 0.2 }
      }
    }
  };

  const circleVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 h-24 relative mb-4">
        <motion.div
          className="w-24 h-24 bg-success-100 rounded-full absolute"
          initial="hidden"
          animate="visible"
          variants={circleVariants}
        />
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
        >
          <motion.path
            d="M28 52L42 66L72 36"
            fill="transparent"
            strokeWidth="8"
            stroke="#10b981"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate="visible"
            variants={pathVariants}
          />
        </motion.svg>
      </div>
      <motion.p
        className="text-lg font-medium text-success-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        Processing...
      </motion.p>
    </div>
  );
};