const drawRect = (ctx, x, y, size) => { 
                                ctx.beginPath();
                                ctx.rect(x, y, size, size);
                                ctx.fill(); }
const drawArc = (ctx, x, y, size) => { 
                                ctx.beginPath();
                                ctx.arc(x, y, size/2, 0, 2 * Math.PI);
                                ctx.fillStyle = "maroon";
                                ctx.fill();
                                ctx.fillStyle = "black";
                             }

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function cherry(size){
    let cx = 0, cy = 0;
    return {
        respawn: (w, h, restrictedPoints = []) => {
            cx = getRandomInt(w); cy = getRandomInt(h)
            if(restrictedPoints.some(({pointx, pointy}) => cx === pointx && cy === pointy)){
                console.log('hit')
                this.respawn(w, h, restrictedPoints)
            }
        }, // something that doesn't overlap with snake
        draw: (ctx) => drawArc(ctx, cx, cy, size),
        getPosition: () => ({x: cx, y: cy}),
    }
}

const point = (x,y) => ({x,y})

function snake(size, w, h, mode){
    let length = 1;
    const arr = [];
    const directions = {'ArrowUp' : {dx:0, dy:-1}, 
                        'ArrowDown': {dx:0, dy:1}, 
                        'ArrowLeft': {dx:-1, dy:0}, 
                        'ArrowRight': {dx:1, dy:0}};

    let currentDirection = 'ArrowRight';
    
    const allowedDirectionSwitches = (dir) => {
        let newX = (arr.at(-1).x + directions[dir].dx * size )
        let newY = (arr.at(-1).y + directions[dir].dy * size )
        if(arr.length < 2)
            return true;
        if(arr.at(-2).x == newX && arr.at(-2).y == newY)
            return false;
        return true;
    }

    const setNewPosition = () => { 
                            let newX = (arr.at(-1).x + directions[currentDirection].dx * size )
                            let newY = (arr.at(-1).y + directions[currentDirection].dy * size )
    
                            if(mode === 'cyclic'){
                                newX = (newX + w) % w;
                                newY = (newY + h) % h;
                            }
                            arr.push({
                                    x: newX,
                                    y: newY});
                            arr.splice(0,1);
                        }

    return {
        initiate : (v1, v2) => arr.push(point(v1,v2)), // center of the screen
        draw: (ctx) =>  arr.forEach(({x, y}) => drawRect(ctx, x, y, size)),
        addLength : () => arr.push({x: arr.at(-1).x + directions[currentDirection].dx * size, 
                                    y: arr.at(-1).y + directions[currentDirection].dy * size}),
        setDirection : (dir) => {
            if(allowedDirectionSwitches(dir))
                currentDirection = dir;
        },
        getDirection: () => dir,
        getHeadPosition: () => arr.at(-1),
        getAllPointsOfSnake: () => arr,
        detectSelfCollision : () => {
            return arr.slice(0,-1).some(point => arr.at(-1).x === point.x && arr.at(-1).y === point.y)
        },
        setNewPosition,
    }
}

function orchestrator(w, h, size, ctx, mode) {
    const numRows = h/size;
    const numColumns = w/size;
    const snak = snake(size, w, h, mode.value);
    const fruit = cherry(size);
    let ct = null;
    let score = 1;
    snak.initiate(numColumns/2 * size, numRows/2 * size);
    ctx.clearRect(0, 0, w, h);
    // window.requestAnimationFrame(() =>true);

    fruit.respawn(w, h);
    document.addEventListener('keydown', (e) => {
        if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))
            snak.setDirection(e.code);
    })

    ct = setInterval(() => {
        ctx.clearRect(0, 0, w, h);
        // window.requestAnimationFrame(() => true);
        snak.setNewPosition();
        snak.draw(ctx);
        fruit.draw(ctx);
        if(mode.value !== 'cyclic'){
            if(snak.getHeadPosition().x < 0 || 
                snak.getHeadPosition().y < 0 ||
                snak.getHeadPosition().x >= w - size  ||
                snak.getHeadPosition().y >= h - size  ){
                clearInterval(ct);
                alert('Your score is ' + score)
            }
        }
        if(snak.detectSelfCollision())
            {
                clearInterval(ct);
                alert('Your score is ' + score)
            }

        if(Math.abs(snak.getHeadPosition().x - fruit.getPosition().x)<=15 && 
            Math.abs(snak.getHeadPosition().y - fruit.getPosition().y)<=15){
            snak.addLength();
            score += 1;
            fruit.respawn(w, h, snak.getAllPointsOfSnake());
        }
    }, 100)
}


window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const mode = document.querySelector('#modes');
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    //assuming the grid to be formed by pixels of 10X10 blocks

    const orch = new orchestrator(w, h, 20, ctx, mode);
    
})