import gridMaker from "../Functions/makeGrid.js";
import screenMapper from "../Functions/screenMapper.js";
import clicked from "../Functions/clicker.js";
import selectFactory from "../Functions/selectFactory.js";
import setStored from "../Functions/setStored.js";

let typeConversion = (element, type) => {
  const [x, y] = element;
  return {
    x: x,
    y: y,
    name: type
  };
};

/**
 * @description Exposes methods that greatly speed up the mapping of 2d tile based games
 * @export
 * @class TileMapper A tool for mapping 2d tile based games
 */
export default class TileMapper {
  /**
   *Creates an instance of TileMapper.
   * @param {*} canvas
   * @param {*} context
   * @memberof TileMapper
   */
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.divisions = 0;
    this.tiles = [];
    this.clickedTiles = new Set();
    this.types = [];
    this.typeColor = {};
    this.selectElements = [];
    this.outputType = true;
    this.tileFormat = true;
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
 * 
 * @param {{type:color}} typeList An object containing the types as keys and the colors as values
 */
  addNewTypes(typeList) {
    Object.keys(typeList).forEach(type => {
      this.addNewType(type, typeList[type]);
    });
  }
/**
 * 
 * @param  {...[number,number]} diminsions The Height and Width of your projects grid
 */
  addTileDiminsions(...diminsions) {
    if (diminsions.length === 2) {
      this.divisions = [...diminsions];
    }
  }

  /**
   * @name clearTiles
   * @description This will clear all tiles on screen
   */
  clearTiles() {
    this.clickedTiles.clear();
    this.types.forEach(type => {
      this[type].clear();
    });
  }

  /**
   * @name createExportButton
   * @description Creates an HTMLButtonElement with an onClick event listner that exports the tiles and copies them to your clipboard
   */
  createExportButton() {
    let exportButton = document.createElement("button");
    exportButton.innerText = "Export All";
    document.body.appendChild(exportButton);
    exportButton.addEventListener("click", () => this.copyToClipBoard());
  }

  /**
   * @name copyToClipBoard
   * @description internally calls export all then writes the results to the clipboard for easy copy/paste access
   */
  copyToClipBoard() {
    let output = this.outputType ? this.exportAllAsObject : this.exportAllAsArray
      navigator.clipboard.writeText(JSON.stringify(output()));
  }

  /**
   * @name clickTile
   * @description adds an event listner to the canvas allowing the user to click to add tiles
   */
  clickTile() {
    this.canvas.addEventListener("click", event => {
      let activatedTile;
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
      if (this.types.length > 0) {
        this.types.forEach(type => {
          this[type].forEach(tile => {
            const [x, y] = tile;
            this.context.fillStyle = this.typeColor[type];
            let diminsions = [x, y, w / x1, h / y1];
            this.context.fillRect(...diminsions);
          });
        });
      } else {
        this.clickedTiles.forEach(tile => {
          const [x, y] = tile;
          this.context.fillStyle = "white";
          let diminsions = [x, y, w / x1, h / y1];
          this.context.fillRect(...diminsions);
        });
      }
    }
  }
  /**
   * @name exportAll
   * @description Exports all clicked tiles into type Object or if no types then exports them to one Array
   */
  exportAllAsObject() {
    let all = {};
    if (this.types.length > 0) {
      this.types.forEach(type => {
        let placeholder = [];
        if (this[type] instanceof Set) {
          this[type].forEach(element =>
            placeholder.push(typeConversion(element, type))
          );
          all[type] = placeholder;
        }
      });
    } else {
      all = [...this.clickedTiles];
    }
    if (this.tileFormat){
      return tileFormatOutput(all,...this.divisions)
    }else{
    return all;
    }
  }

  /**
   * @name exportAll
   * @description Exports all clicked tiles into one Array with [X ,Y , Type] format
   */
  exportAllAsArray() {
    let all = [];
    if (this.types.length > 0) {
      let obj = this.exportAllAsObject();
      Object.keys(obj).forEach(key => {
        obj[key].forEach(unit => {
          let { x, y, name } = unit;
          all.push([x, y, name]);
        });
      });
    } else {
      all = [this.clickedTiles];
    }
    return all;
  }

  /**
   * @name makeGrid
   * @description Takes to numbers as arguments and draws a grid to the screen, this also declares the grid diminsions for TileMapper default is three for each
   * @param {number} Hdivisions - the number of horizantal divisions on the screen
   * @param {number} Vdivisions - the number of vertical divisions on the screen
   */
  makeGrid() {
    this.context.strokeStyle = "white";
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
  /**
   * @name makeSubSelect
   * @description Makes a conditional Select element that only appears if a specfic main type is chosen
   * @param {*} mainId -  The id of the main HTMLSelectElement
   * @param {*} type  - The type to make a conditional HTMLSelectElement when chosen
   * @param {*} subTypes - A list of the subTypes for the new HTMLSelectElement
   */

  removeSelectElement(id) {
    let el = document.getElementById(id);
    this.selectElements.pop();
    document.body.removeChild(el);
  }
  /**
   * @param {string} outputType
   */
  set output(outputType) {
    if (typeof outputType === "string") {
      if (outputType.toLowerCase() === "array") {
        this.outputType = false;
      } else if (outputType.toLowerCase() === "object") {
        this.outputType = true;
      } else {
        console.log(
          'Please Make Sure To Use Only The String "Object" Or "Array"'
        );
      }
    }
  }
}

/**
 * @description
 * @param {*} xDiv
 * @param {*} yDiv
 */
export function tileFormatOutput(rawInput, xDiv, yDiv) {
  let final = {};
  Object.keys(rawInput).forEach(type => {
    final[type] = [];
    rawInput[type].forEach(unit => {
      unit.x = Math.floor(unit.x / xDiv);
      unit.y = Math.floor(unit.y / yDiv);

      final[type].push(unit);
    });
  });
  console.log(final);
}
