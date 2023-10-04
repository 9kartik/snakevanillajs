import {lowestMultipleOf, getRandomInt} from '../utils/methods.js';
import { drawArc } from '../utils/canvasmethods.js';

export function cherry(size){
    let cx = 0, cy = 0;
    return {
        respawn: (w, h, restrictedPoints = []) => {
            cx = lowestMultipleOf(getRandomInt(w), size); cy = lowestMultipleOf(getRandomInt(h), size)
            if(restrictedPoints.some(({pointx, pointy}) => cx === pointx && cy === pointy)){
                console.log('hit')
                this.respawn(w, h, restrictedPoints)
            }
        }, // something that doesn't overlap with snake
        draw: (canvasContext) => drawArc(canvasContext, cx, cy, size),
        getPosition: () => ({x: cx, y: cy}),
    }
}
