/**
 * @name makeHorizantalLines - a private member of this module
 * @param {*} divisions - the number of horizantal divisions to make
 * @param {*} canvas 
 * @param {*} context 
 */
function makeHorizontalLines(divisions, canvas, context) {
  for (let i = 0; i < canvas.height; i += canvas.height / divisions) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }
}
/**
 * @name makeVerticalLines - a private member of this module
 * @param {*} divisions - the number of vertical divisions to make
 * @param {*} canvas 
 * @param {*} context 
 */
function makeVerticalLines(divisions, canvas, context) {
  for (let i = 0; i < canvas.width; i += canvas.width / divisions) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }
}

/**
 * @name gridMaker
 * @description The public method from this module , takes four arguments and paints a grid to the canvas , end user will never have to interface with this directly
 * @export
 * @param {*} verticalDivisions
 * @param {*} horizontalDivisions
 * @param {*} canvas
 * @param {*} context
 */
export default function gridMaker(verticalDivisions,horizontalDivisions, canvas, context) {
  makeHorizontalLines(horizontalDivisions, canvas, context);
  makeVerticalLines(verticalDivisions, canvas, context);
}
