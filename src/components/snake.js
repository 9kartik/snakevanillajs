import { drawRect } from "../utils/canvasmethods.js";

export const snake = () => {
  const point = (x, y) => ({ x, y });

  function workingSnake (size, w, h, mode) {
    const arr = [];
    const directions = {
      ArrowUp: { dx: 0, dy: -1 },
      ArrowDown: { dx: 0, dy: 1 },
      ArrowLeft: { dx: -1, dy: 0 },
      ArrowRight: { dx: 1, dy: 0 }
    };

    let currentDirection = "ArrowRight";

    /**
         * this following method takes a
         * direction parameter and sees whether the movement possibly overlap itself in the opposite direction
         * this is needed because lets say when the snake is going up, can you set it to move to down
         * another implementation could also be that if the snake is more than a length of 1
         * then we could set it to not switch directions vertically and horizontally
        */
    const isDirectionChangeAllowed = (dir) => {
      const newX = (arr.at(-1).x + directions[dir].dx * size);
      const newY = (arr.at(-1).y + directions[dir].dy * size);
      if (arr.length < 2) { return true; }
      if (arr.at(-2).x === newX && arr.at(-2).y === newY) { return false; }
      return true;
    };

    const setNewPosition = () => {
      let newX = (arr.at(-1).x + directions[currentDirection].dx * size);
      let newY = (arr.at(-1).y + directions[currentDirection].dy * size);

      if (mode === "cyclic") {
        newX = (newX + w) % w;
        newY = (newY + h) % h;
      }
      arr.push({
        x: newX,
        y: newY
      });
      arr.splice(0, 1);
    };

    return {
      initiate: (v1, v2) => arr.push(point(v1, v2)), // center of the screen
      draw: (canvasContext) => arr.forEach(({ x, y }) => drawRect(canvasContext, x, y, size)),
      addLength: () => arr.push({
        x: arr.at(-1).x + directions[currentDirection].dx * size,
        y: arr.at(-1).y + directions[currentDirection].dy * size
      }),
      setDirection: (dir) => {
        if (isDirectionChangeAllowed(dir)) { currentDirection = dir; }
      },
      getDirection: () => currentDirection,
      getHeadPosition: () => arr.at(-1),
      getAllPointsOfSnake: () => arr,
      detectSelfCollision: () => {
        return arr.slice(0, -1).some(point => arr.at(-1).x === point.x && arr.at(-1).y === point.y);
      },
      setNewPosition
    };
  }
  return workingSnake;
};
