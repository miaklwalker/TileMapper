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
    this.typeColor = { clickedTiles: "White" };
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
   * @param {string} color Colors selections of this type this color
   */
  addNewType(type, color) {
    this[type] = new Set();
    this.typeColor[type] = color;
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
   * @name exportAll 
   * @description Exports all clicked tiles into type Object or if no types then exports them to one Set
   */
  exportAll() {
    let all = {};
    if (this.types.length > 0) {
      this.types.forEach(type => {
        let placeholder = [];
        this[type].forEach(element => {
          placeholder.push(element);
        });
        all[type] = placeholder;
      });
    } else {
      all = this.clickedTiles;
    }
    console.log(all)
    return all;
  }
  /**
   * @name clickTile
   * @description adds an event listner to the canvas allowing the user to click to add tiles
   */
  clickTile() {
    let activatedTile;
    this.canvas.addEventListener("click", event => {
      let selectedTypes;
      activatedTile = clicked(event, this.tiles);
      if (this.selectElements.length > 0) {
        selectedTypes = this.selectElements.map(
          selectedElement => selectedElement.value
        );
        let selectedSet = this[selectedTypes];
        setStored(selectedSet, activatedTile);
      }
      setStored(this.clickedTiles, activatedTile);
    });
  }
  /**
   * @name drawSelection
   * @description will draw all userClicked tiles to the screen once
   */
  drawSelection() {
    const { width: w, height: h } = this.canvas;
    const [x1, y1] = this.divisions;
    if (this.clickedTiles.size > 0) {
      this.types.forEach(type => {
        this[type].forEach(tile => {
          const [x, y] = tile;
          this.context.fillStyle = this.typeColor[type];
          let diminsions = [x, y, w / x1, h / y1];
          this.context.fillRect(...diminsions);
        });
      });
    }
  }
  /**
   * @name makeGrid
   * @description Takes to numbers as arguments and draws a grid to the screen, this also declares the grid diminsions for TileMapper default is three for each
   * @param {number} Hdivisions - the number of horizantal divisions on the screen
   * @param {number} Vdivisions - the number of vertical divisions on the screen
   */
  makeGrid(Hdivisions = 3, Vdivisions = 3) {
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
