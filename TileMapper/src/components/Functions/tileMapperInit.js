import TileMapper from "../class/tileMapper.js";

/**
 * @name tilemapperInit
 * @description When provided the proper arguements it configs a tile mapper and returns based on your project
 * @export
 * @param {*} canvas the project canvas
 * @param {*} context the canvas's context
 * @param {*} diminsions the diminsions of the grid expressed as an array ex [10,10]
 * @returns a new TileMapper
 */



export function tilemapperInit(canvas, context, diminsions) {
    let tilemapper = new TileMapper(canvas, context);
    tilemapper.addTileDiminsions(...diminsions);
    tilemapper.createExportButton();
    tilemapper.addScreenMap();
    tilemapper.clickTile();
    return tilemapper;
  }


  