import gridMaker from "../Functions/makeGrid.js";
import screenMapper from "../Functions/screenMapper.js";
import clicked from "../Functions/clicker.js";
import selectFactory from "../Functions/selectFactory.js";
import setStored from "../Functions/setStored.js";

export default class TileMapper {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.divisions = 0;
    this.tiles = [];
    this.clickedTiles = new Set();
    this.types = [];
    this.selectElements = [];
  }
  /**
   *@name addScreenMap
   *@description Maps the canvas to an array based on the grid diminsions
   * 
   */
  addScreenMap() {
    let computedTiles = screenMapper(this.canvas, this.divisions);
    this.tiles = computedTiles;
  }
  /**
   * 
   * @param {string} type adds a new type of tile to the tile mapper 
   */
  addNewType(type) {
    this[type] = [];
    this.types.push(type);
  }
  /**
   * @name clearTiles
   * @description This will clear all tiles on screen
   */
  clearTiles() {
    this.clickedTiles.clear();
  }
  /**
   * @name clickTile
   * @description adds an event listner to the canvas allowing the user to click to add tiles
   */
  clickTile() {
    let activatedTile;
    this.canvas.addEventListener("click", event => {
        activatedTile = clicked(event, this.tiles);
        setStored(this.clickedTiles, activatedTile);
    });
  }
  /**
   * @name drawSelection
   * @description will draw all userClicked tiles to the screen once
   * @param {string} color - The color to draw all canvas selections
   */
  drawSelection(color) {
    const { width: w, height: h } = this.canvas;
    const [x1, y1] = this.divisions;
    this.context.fillStyle = color;
    if (this.clickedTiles.size > 0) {
      this.clickedTiles.forEach(tile => {
        const [x, y] = tile;
        let diminsions = [x, y, w / x1, h / y1];
        this.context.fillRect(...diminsions);
      });
    }

  }
  /**
   * @name makeGrid
   * @description Takes to numbers as arguments and draws a grid to the screen, this also declares the grid diminsions for TileMapper default is three for each
   * @param {number} Hdivisions - the number of horizantal divisions on the screen
   * @param {number} Vdivisions - the number of vertical divisions on the screen
   */
  makeGrid(Hdivisions=3, Vdivisions=3) {
    this.divisions = [Hdivisions, Vdivisions];
    gridMaker(...this.divisions, this.canvas, this.context);
  }
  /**
   * 
   * @param {string} id This ID is used to set the id for the HTMLSelectElement
   * @param {Array} options This is an array of options for the HTMLSelectElement
   */
  makeSelectElement(id, options) {
    let select = selectFactory(id, options);
    this.selectElements.push(select);
    document.body.append(select);
  }
}
