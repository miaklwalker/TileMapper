import TileMapper from "./TileMapper/src/components/class/tileMapper.js";

let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.height = 480;
canvas.width = 512;
document.body.appendChild(canvas);
context.strokeStyle = 'white'


let tilemapper = new TileMapper(canvas,context)
console.log(tilemapper)

function setup(){
    tilemapper.makeGrid(15,15);
    tilemapper.addScreenMap()
    tilemapper.clickTile();
    tilemapper.addNewType('Secret')
    tilemapper.makeSelectElement('types',tilemapper.types)
    draw()
}
function draw(){
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height);
    tilemapper.drawSelection('red')
    tilemapper.makeGrid(15,15);
    loop()
}
function loop(){
    requestAnimationFrame(draw)
}
setup()