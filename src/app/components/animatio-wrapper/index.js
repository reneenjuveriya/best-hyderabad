"use client";
import { motion } from "framer-motion";

export default function AnimationWrapper({ children }) {
  return (
    <motion.div
    className="main-content"
    initial={{ x: "100vw" }}
    animate={{ x: 0 }}
    transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
