import { orchestrator } from "./src/components/orchestrator.js";

window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const mode = document.querySelector("#modes");
  const canvasContext = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  // assuming the grid to be formed by pixels of 10X10 blocks

  orchestrator(w, h, 20, canvasContext, mode);
});
