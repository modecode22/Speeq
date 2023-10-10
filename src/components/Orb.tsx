import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface OrbProps {
  color: "primary" | "error"  | "loading"|"success"|"recording";
  children?: React.ReactNode;
}

const colors = {
  primary: "radial-gradient(circle at center, hsl(164, 83%, 60%), hsl(164, 85%, 65%))",
  error: "radial-gradient(circle at center, hsl(0, 65%, 55%),hsl(0, 70%, 65%)",
   loading: "radial-gradient(circle at center,hsl(240, 65%, 55%), hsl(240, 70%, 65%))",
   success: "radial-gradient(circle at center,hsl(120, 65%, 55%), hsl(120, 70%, 65%)",

   recording: "radial-gradient(circle at center,hsl(60, 65%, 55%), hsl(60, 70%, 65%)",

  };

const Orb: React.FC<OrbProps> = ({ color , children}) => {
    const controls = useAnimation();
  

  useEffect(() => {
    // Breathing effect
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 3, loop: Infinity, ease: "easeInOut" },
    });

    // Color transition effect
    controls.start({
      background: colors[color],
      transition: { duration: 0.3, ease: "easeInOut" },
      scale: [1, 0.5, 1],
    });
  }, [controls, color]);

  return (
    <div className="relative w-full h-full">
      {/* Outer Glow */}
      <motion.div
        whileTap={{
          scale: 0.8,
          filter: "blur(10px)",
          transition: { duration: 0.4, type: "spring", stiffness: 300 },
        }} // Added Shrink Animation
        className="absolute"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, loop: Infinity, ease: "easeInOut" }}
        style={{
          background: colors[color],
          borderRadius: "50%",
          width: "130px",
          height: "130px",
          filter: "blur(15px)",
          top: "-15px",
          left: "-15px",
        }}
      />

      {/* Main Orb */}
      <motion.div
        whileTap={{
          scale: 0.9,
          transition: { duration: 0.4, type: "spring", stiffness: 300 },
        }} // Added Shrink Animation
        className="relative z-10 flex  justify-center items-center"
        animate={controls}
        whileHover={{ scale: 1.07, transition: { duration: 0.5 } }} // Gentle reaction to hover
        style={{
          background: colors[color],
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          boxShadow: "0 0 30px 5px rgba(255, 255, 255, 0.3)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {children}


        {/* Nested Light Patterns */}
        <motion.div
          whileTap={{
            scale: 0.75,
            transition: { duration: 0.4, type: "spring", stiffness: 300 },
          }} // Added Shrink Animation
          animate={{ scale: [0.8, 0.85, 0.8], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 3, loop: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.5), transparent)",
            borderRadius: "50%",
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80%",
            height: "80%",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Orb;
