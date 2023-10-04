import { lowestMultipleOf, getRandomInt } from "../utils/methods.js";
import { drawArc } from "../utils/canvasmethods.js";

export function cherry (size) {
  let cx = 0; let cy = 0;
  
  const respawn = (w, h, restrictedPoints = []) => {
    cx = lowestMultipleOf(getRandomInt(w), size);
    cy = lowestMultipleOf(getRandomInt(h), size);

    if (restrictedPoints.some(({ x, y }) => cx === x && cy === y)) {
      console.log("hit");
      respawn(w, h, restrictedPoints);
    }
  }  // something that doesn't overlap with snake

  return {
    respawn,
    draw: (canvasContext) => drawArc(canvasContext, cx, cy, size),
    getPosition: () => ({ x: cx, y: cy })
  };
}
