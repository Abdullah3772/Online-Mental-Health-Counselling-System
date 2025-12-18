import { motion } from "framer-motion";

export const pageAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function PageWrapper({ children, animation }) {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={animation}>
      {children}
    </motion.div>
  );
}
