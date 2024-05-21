import { DrawerPosition } from ".";
/**
 * @param position top,left,bottom,right
 * @returns it returns the positive or negative value accordingly
 */
const getPosition = (
  width = 450 as number | string,
  position: DrawerPosition
): number | string => {
  if (position === "left") return `-${width}`;
  if (position === "bottom") return "100vh";
  if (position === "top") return "-100vh";

  return width === "auto" ? "65%" : width;
};

/**
 * @param {*} width width is requried for the animation transition duration
 * @param {*} position top,left,bottom,right
 * @returns
 */
const yAxiesAttri = ["top", "bottom"];

export const drawerAnimation = (
  width: number | string,
  position: DrawerPosition
) => ({
  closed: {
    [yAxiesAttri.includes(position) ? "y" : "x"]: getPosition(width, position),
  },

  open: {
    [yAxiesAttri.includes(position) ? "y" : "x"]: 0,
  },
});
