import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
  delay?: number;
  rotate?: number;
}

export const FloatingElement = ({
  children,
  className = "",
  duration = 6,
  yOffset = 20,
  delay = 0,
  rotate = 0,
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
        rotate: [0, rotate, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
