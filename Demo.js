import TileMapper from "./TileMapper/src/components/class/tileMapper.js";

let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
let exportButton = document.createElement('button')

canvas.height = 480;
canvas.width = 512;
document.body.appendChild(canvas);
document.body.appendChild(exportButton);
exportButton.innerText='Export All'
context.strokeStyle = 'white'
let types = ['Secret','Cave','Wall','Dungeon'];
let colors = ['red','blue','green','yellow'];

let tilemapper = new TileMapper(canvas,context)
exportButton.addEventListener('click',()=>tilemapper.exportAll());
console.log(tilemapper)
function setup(){
    tilemapper.makeGrid(10,10);
    tilemapper.addScreenMap()
    tilemapper.clickTile();
types.forEach((type,index)=>{tilemapper.addNewType(type,colors[index]);})
    tilemapper.makeSelectElement('types',tilemapper.types)
    draw()
}
function draw(){
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height);
    tilemapper.drawSelection('red')
    tilemapper.makeGrid(10,10);
    loop()
}
function loop(){
    requestAnimationFrame(draw)
}
setup()