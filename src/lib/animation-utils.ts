
export const recordButtonVariants = {
    record: {
          width: "100px",
          height: "100px",
      background: "linear-gradient(90deg, #00C9FF, #92FE9D)",
      borderRadius: "40%",
      transition: {
        borderRadius: {
          duration: 0.5,
          ease: "easeInOut",
        },
      },
    },
    stop: {
      width: "100px",
      height: "100px",
      background: "linear-gradient(90deg, #92FE9D, #00C9FF)",
      borderRadius: "50%",
    },
    hover: {
      width: "97px",
      height: "97px",
      background: "linear-gradient(95deg, #92FE9D, #00C9FF)",
    },
  };

   export const svgVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.1, y: -5 },
  };


export const AnimatedButtonVariants = {
    initial: {
        opacity: 0,
        y: -50,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    hover: {
        scale: 0.9,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
    tap: {
        scale: 0.9,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
    exit:{ opacity: 0 }

};
