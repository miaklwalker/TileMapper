# TileMapJS

## A Tool for Mapping screens in TileBased games

____

### Usage

____

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
- [Lines](#lines)
- [Rendering](#rendering)
- [FAQ](#faq)

<a name="anchor-installation"></a>
Installation
===============================================================================

```bash

```

> **Note:** This library uses the native ECMAScript Module syntax. Most environments support native modules, but the following exceptions apply:
>
> * Node.js (9.2.0) requires the [--experimental-modules](https://nodejs.org/api/esm.html) flag
> * Firefox (54) requires the [dom.moduleScripts.enabled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Browser_compatibility) setting
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
(<https://codesandbox.io/s/tilemapperjs-gimgd>)

<a name="anchor-usage"></a>
Usage
===============================================================================

``` JavaScript
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
From there you can easily map new terrain or existing terrain

<a name="anchor-step-1"></a>
## 1. Adding a Tilemapper to your project

```JavaScript
// using a built in INIT method to create a tilemapper
let tilemapper = tilemapperInit(canvas, context,[10,10]);
```

```Javascript
// using the new constructor
let tilemapper = TileMapper(canvas,context);
tilemapper.addTileDiminsions([10,10])
```

<a name="anchor-step-2"></a>
## 2. Creating and adding types

**TileMapper** 




```JavaScript
```


```JavaScript
```


```JavaScript
```


```JavaScript
```

<a name="anchor-step-3"></a>
## 3. Exporting From TileMapper


```JavaScript
```


```JavaScript
```

<a name="anchor-step-4"></a>
## 4.Choosing Types
```JavaScript
```


```JavaScript
```



```JavaScript
```

<a name="anchor-step-5"></a>
## 5. Using the Mapped Data




```JavaScript
```


```JavaScript

```

<a name="anchor-step-6"></a>
## 6. Some final Remarks




```JavaScript

```

<a name="anchor-lines"></a>
Lines
===============================================================================


```JavaScript
```




<a name="anchor-rendering"></a>
Rendering
===============================================================================

<a name="anchor-faq"></a>
FAQ
===============================================================================
