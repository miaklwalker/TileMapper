# TileMapJS

## A Tool for Mapping screens in TileBased games

---

### Usage

---

TileMapJS is a Javascript library that gives the user a visual and haptic interface that greatly speeds up adding elements to the screen.

- [TileMapJS](#tilemapjs)
  - [A Tool for Mapping screens in TileBased games](#a-tool-for-mapping-screens-in-tilebased-games)
    - [Usage](#usage)
- [Installation](#installation)
- [Documentation](#documentation)
- [Demos](#demos)
- [Usage](#usage-1)
- [Getting Started](#getting-started)
  - [1. Adding a Tilemapper to your project](#1-adding-a-tilemapper-to-your-project)
  - [2. Creating and adding types](#2-creating-and-adding-types)
  - [3. Exporting From TileMapper](#3-exporting-from-tilemapper)
  - [4.Choosing Types](#4choosing-types)
  - [5. Using the Mapped Data](#5-using-the-mapped-data)
  - [6. Some final Remarks](#6-some-final-remarks)
- [Rendering](#rendering)

<a name="anchor-installation"></a>
Installation
===============================================================================

```bash

```

> **Note:** This library uses the native ECMAScript Module syntax. Most environments support native modules, but the following exceptions apply:
>
> - Node.js (9.2.0) requires the [--experimental-modules](https://nodejs.org/api/esm.html) flag
> - Firefox (54) requires the [dom.moduleScripts.enabled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Browser_compatibility) setting
>
> Bundling solutions such as [Webpack](https://webpack.js.org/) or [Rollup.js](https://rollupjs.org/) make native modules compatible with all environments.

<a name="anchor-documentation"></a>
Documentation
===============================================================================
You can view WIP Documentation here (<http://www.imawalkersoyoudonthavetobe.com/TileMapper/>);

<a name="anchor-demos"></a>
Demos
===============================================================================
A Very Basic Working Demo with a plain black background
(<https://codesandbox.io/s/tilemapperjs-gimgd>);

A BabaIsYou Clone I made and added Tilemapper.js To

(<http://www.imawalkersoyoudonthavetobe.com/TileMapperBabaDemo/>);

<a name="anchor-usage"></a>
Usage
===============================================================================

```JavaScript
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
let tilemapper = tilemapperInit(canvas, context,[10,10]);
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

```

<a name="anchor-getting-started"></a>
Getting Started
===============================================================================
This can be easily added to an existing project by inserting it into your draw loop,
From there you can easily map anything in your grid based project or game

<a name="anchor-step-1"></a>

## 1. Adding a Tilemapper to your project

```JavaScript
// using a built in INIT method to create a tilemapper
let tilemapper = tilemapperInit(canvas, context,[10,10]);
```

```Javascript
// using the new constructor
let tilemapper = new TileMapper(canvas,context);
tilemapper.addTileDiminsions([10,10])
```

<a name="anchor-step-2"></a>

## 2. Creating and adding types

**TileMapper**

First you will need to decide the types for your project.
Then you will need to either pass a type and color one at a time

```JavaScript
let tilemapper = new TileMapper(canvas,context)
tilemapper.addDiminsions([10,10]);
tilemapper.addNewType(type,color);
```

or you can add them en masse with a type config object

```JavaScript
let tilemapper = new TileMapper(canvas,context)
tilemapper.addDiminsions([10,10]);
let types = {
  hero:"red",
  villian:"black",
  npc:"yellow"
}
tilemapper.addNewTypes(types);
```

After adding types and diminsions to the project you will need to map your canvas

> **Note:** You can skip this step if you used the init method

```JavaScript
let tilemapper = new TileMapper(canvas,context)
tilemapper.addDiminsions([10,10]);
let types = {
  hero:"red",
  villian:"black",
  npc:"yellow"
}
tilemapper.addNewTypes(types);
tilemapper.addScreenMap()
```

Lastly you will need to setup the click screen functionality after the previous steps are done

> **Note:** You can also skip this step if you used the init method

```JavaScript
let tilemapper = new TileMapper(canvas,context)
tilemapper.addDiminsions([10,10]);
let types = {
  hero:"red",
  villian:"black",
  npc:"yellow"
}
tilemapper.addNewTypes(types);
tilemapper.addScreenMap()
tilemapper.clickTile()
```

<a name="anchor-step-3"></a>

## 3. Exporting From TileMapper

Next we will need to " Export " the data from the tileMapper.

You will need to decide based on your project whether you export as an Array or as an Object.

To export it as an array try the following.

```JavaScript
let tilemapper = new TileMapper(canvas,context)
tilemapper.addDiminsions([10,10]);
let types = {
  hero:"red",
  villian:"black",
  npc:"yellow"
}
tilemapper.addNewTypes(types);
tilemapper.addScreenMap();
tilemapper.clickTile();
tilemapper.output = 'array';
tilemapper.createExportButton()
```

or for example you are creating level objects.

You can then use the output from the mapper to create levels!

but we will look at that next.

if you need tilemapper to export as an Object simply change the output to Object.

```JavaScript
let tilemapper = new TileMapper(canvas,context)
tilemapper.addDiminsions([10,10]);
let types = {
  hero:"red",
  villian:"black",
  npc:"yellow"
}
tilemapper.addNewTypes(types);
tilemapper.addScreenMap();
tilemapper.clickTile();
tilemapper.output = 'object';
tilemapper.createExportButton()
```

<a name="anchor-step-4"></a>

## 4.Choosing Types

Choosing types is one of the easiest and hardest parts of using this library ,
for instance in the baba is you demo i made , i choose to make each type of block it's own type.

```JavaScript
let tilemapper = tileMapperInit(canvas,context,[10,10])
let types = {
		baba: 'white',
		rock: 'goldenrod',
		wall: 'Gray',
		flag: 'yellow',
		floor: 'darkSlateGray',
		water: 'skyBlue',
    skull: 'Red',
}
tilemapper.addNewTypes(types)
```

This will allow my to choose where every sprite goes on the screen as opposed to typing in all of the numbers then refreshing to see if it is right try it here

(<http://www.imawalkersoyoudonthavetobe.com/TileMapperBabaDemo/>);

<a name="anchor-step-5"></a>

## 5. Using the Mapped Data
Using my demo as an example if you take the first level and map it,
When you hit the export button you will most likely get something that looks like this if you use the "Object" option

```JavaScript
{"baba":[{"x":89.25,"y":160.50000000000003,"name":"baba"}],


"rock":[{"x":160.64999999999998,"y":144.45000000000002,"name":"rock"},
        {"x":160.64999999999998,"y":176.55000000000004,"name":"rock"},
        {"x":160.64999999999998,"y":160.50000000000003,"name":"rock"}],


"wall":[{"x":71.4,"y":128.4,"name":"wall"},{"x":89.25,"y":128.4,"name":"wall"},
        {"x":107.1,"y":128.4,"name":"wall"},{"x":124.94999999999999,"y":128.4,"name":"wall"},
        {"x":142.79999999999998,"y":128.4,"name":"wall"},{"x":160.64999999999998,"y":128.4,"name":"wall"},
        {"x":178.49999999999997,"y":128.4,"name":"wall"},{"x":214.19999999999996,"y":128.4,"name":"wall"},
        {"x":196.34999999999997,"y":128.4,"name":"wall"},{"x":232.04999999999995,"y":128.4,"name":"wall"},
        {"x":249.89999999999995,"y":128.4,"name":"wall"},{"x":71.4,"y":192.60000000000005,"name":"wall"},
        {"x":89.25,"y":192.60000000000005,"name":"wall"},{"x":124.94999999999999,"y":192.60000000000005,"name":"wall"},
        {"x":107.1,"y":192.60000000000005,"name":"wall"},{"x":142.79999999999998,"y":192.60000000000005,"name":"wall"},
        {"x":160.64999999999998,"y":192.60000000000005,"name":"wall"},{"x":178.49999999999997,"y":192.60000000000005,"name":"wall"},
        {"x":196.34999999999997,"y":192.60000000000005,"name":"wall"},{"x":214.19999999999996,"y":192.60000000000005,"name":"wall"},
        {"x":232.04999999999995,"y":192.60000000000005,"name":"wall"},{"x":249.89999999999995,"y":192.60000000000005,"name":"wall"}],


"flag":[{"x":232.04999999999995,"y":160.50000000000003,"name":"flag"}],


"floor":[],


"water":[],


"skull":[]}
```
or this if you choose the "Array" option!
```JavaScript
[[156.25,281,"baba"],
[281.25,252.89999999999998,"rock"],
[281.25,281,"rock"],[281.25,309.1,"rock"],
[125,224.79999999999998,"wall"],
[156.25,224.79999999999998,"wall"],
[187.5,224.79999999999998,"wall"],
[218.75,224.79999999999998,"wall"],
[250,224.79999999999998,"wall"],
[281.25,224.79999999999998,"wall"],
[312.5,224.79999999999998,"wall"],
[343.75,224.79999999999998,"wall"],
[375,224.79999999999998,"wall"],
[406.25,224.79999999999998,"wall"],
[437.5,224.79999999999998,"wall"],
[437.5,337.20000000000005,"wall"],
[406.25,337.20000000000005,"wall"],
[375,337.20000000000005,"wall"],
[343.75,337.20000000000005,"wall"],
[312.5,337.20000000000005,"wall"],
[281.25,337.20000000000005,"wall"],
[250,337.20000000000005,"wall"],
[218.75,337.20000000000005,"wall"],
[187.5,337.20000000000005,"wall"],
[156.25,337.20000000000005,"wall"],
[125,337.20000000000005,"wall"],
[406.25,281,"flag"]]

```

<a name="anchor-step-6"></a>

## 6. Some final Remarks

  If you are describing the locations of your objects as a grid number instead of absolute position on screen you can do the following 

```JavaScript
let tilemapper = tileMapperInit(canvas,context,[10,10])
let types = {
		baba: 'white',
		rock: 'goldenrod',
		wall: 'Gray',
		flag: 'yellow',
		floor: 'darkSlateGray',
		water: 'skyBlue',
    skull: 'Red',
}
tilemapper.addNewTypes(types)
tilemapper.tileFormat = true
/*

{"baba":[{"x":7,"y":14,"name":"baba"}],
"rock":[{"x":14,"y":12,"name":"rock"},{"x":14,"y":14,"name":"rock"},{"x":14,"y":15,"name":"rock"}],
"wall":[{"x":6,"y":11,"name":"wall"},{"x":7,"y":11,"name":"wall"},{"x":9,"y":11,"name":"wall"},
{"x":10,"y":11,"name":"wall"},{"x":12,"y":11,"name":"wall"},{"x":14,"y":11,"name":"wall"},
{"x":15,"y":11,"name":"wall"},{"x":17,"y":11,"name":"wall"},{"x":18,"y":11,"name":"wall"},
{"x":20,"y":11,"name":"wall"},{"x":21,"y":11,"name":"wall"},{"x":21,"y":16,"name":"wall"},
{"x":20,"y":16,"name":"wall"},{"x":18,"y":16,"name":"wall"},{"x":17,"y":16,"name":"wall"},
{"x":15,"y":16,"name":"wall"},{"x":14,"y":16,"name":"wall"},{"x":12,"y":16,"name":"wall"},
{"x":10,"y":16,"name":"wall"},{"x":9,"y":16,"name":"wall"},{"x":7,"y":16,"name":"wall"},
{"x":6,"y":16,"name":"wall"}],
"flag":[{"x":20,"y":14,"name":"flag"}],
"floor":[],
"water":[],
"skull":[]}

*/
```

 To get more normalized results!

<a name="anchor-rendering"></a>
Rendering
===============================================================================

Rendering couldn't be easier just add the following to your Draw Loop
``` JavaScript
function draw(){
  // other things that happen in a draw loop
  tilemapper.drawSelection();
  tilemapper.makeGrid();
}
```
