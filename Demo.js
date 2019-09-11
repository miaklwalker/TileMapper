import { tilemapperInit } from "./TileMapper/src/components/class/tileMapper.js";
// Creating a HTMLCanvasElemnt and it's RenderingContext
let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
// Creating a HTMLButton for the export function of the tilemapper
let exportButton = document.createElement("button");
exportButton.innerText = "Export All";
// Setting the width and height of the canvas
canvas.height = 480;
canvas.width = 512;
// adding the canvas and the export button to the dom
document.body.appendChild(canvas);
document.body.appendChild(exportButton);
// Creating an array of types to use for the types in the mapper
let types = ["Secret", "Cave", "Wall", "Dungeon"];
let colors = ["red", "blue", "green", "yellow"];
// using a built in INIT method to create a tilemapper
let tilemapper = new tilemapperInit(canvas, context,[10,10]);
// adding the export functionality
exportButton.addEventListener("click", () => tilemapper.copyToClipBoard());


/* ************************
              GAME LOOP
**************************/
function setup() {
  // a foreach loop that adds all of the types to the tilemapper
types.forEach((type, index) => {
    tilemapper.addNewType(type, colors[index]);
   }) 
// creating a select element from the types in tile mapper 
    tilemapper.makeSelectElement("types", tilemapper.types);
  draw();
}
function draw() {
  // drawing a black background (Not required if you are already drawing to the canvas you can skip this)
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  // draws when you click the canvas
  tilemapper.drawSelection();
  // draws the grid lines on the canvas for clarity can also be skipped if so desired
  tilemapper.makeGrid();
  loop();
}
function loop() {
  requestAnimationFrame(draw);
}
setup();
