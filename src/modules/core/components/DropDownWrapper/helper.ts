export const DropDownVariants = () => ({
  initial: {
    opacity: 1,
    scaleY: 0,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: {
      ease: 'linear',
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: {
      duration: 0.3,
    },
  },
});
