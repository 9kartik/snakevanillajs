/**
 * @param canvasContext takes canvas context
 * @param drawFunction whatever you want to draw on canvas
 */
const drawBetween = (canvasContext, drawFunction) => {
  canvasContext.beginPath();
  drawFunction();
  canvasContext.fill();
};

export const drawRect = (canvasContext, x, y, size) => {
  drawBetween(canvasContext, () => canvasContext.rect(x, y, size, size));
};

/**
 * @param canvasContext takes the canvas context
 * @param x coordinate
 * @param y coordinate
 * @param size is the circle's diameter
 */
export const drawArc = (canvasContext, x, y, size) => {
  drawBetween(canvasContext, () => {
    canvasContext.translate(0.5, 0.5);
    canvasContext.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI);
    canvasContext.fillStyle = "maroon";
    canvasContext.translate(-0.5, -0.5);
  });
  canvasContext.fillStyle = "black";
};
