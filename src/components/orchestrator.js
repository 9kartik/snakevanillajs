import {lowestMultipleOf} from '../utils/methods.js';
import { snake } from './snake.js';
import { cherry } from './cherry.js';

export function orchestrator(w, h, size, canvasContext, mode) {
    const numRows = h/size;
    const numColumns = w/size;
    const theSnake = snake()(size, w, h, mode.value);
    const fruit = cherry(size);
    let intervalHash = null;
    let score = 1;
    theSnake.initiate(lowestMultipleOf(numColumns/2, size), lowestMultipleOf(numRows/2, size));
    canvasContext.clearRect(0, 0, w, h);

    fruit.respawn(w, h);

    document.addEventListener('keydown', (e) => {
        if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))
            theSnake.setDirection(e.code);
    })

    intervalHash = setInterval(() => {
        canvasContext.clearRect(0, 0, w, h);
        theSnake.setNewPosition();
        theSnake.draw(canvasContext);
        fruit.draw(canvasContext);
        if(mode.value !== 'cyclic'){
            if(theSnake.getHeadPosition().x < 0 || 
                theSnake.getHeadPosition().y < 0 ||
                theSnake.getHeadPosition().x >= w - size  ||
                theSnake.getHeadPosition().y >= h - size  ){
                clearInterval(ct);
                alert('Your score is ' + score)
            }
        }
        if(theSnake.detectSelfCollision())
            {
                clearInterval(intervalHash);
                alert('Your score is ' + score)
            }

        if((theSnake.getHeadPosition().x === fruit.getPosition().x) && 
            (theSnake.getHeadPosition().y === fruit.getPosition().y)){
            theSnake.addLength();
            score += 1;
            fruit.respawn(w, h, theSnake.getAllPointsOfSnake());
        }
    }, 100)
}