/**
 *
 *
 * @param {*} event - an event from a eventListner
 * @param {*} map - a map of the current screens tiles in [number,number,number,number] format
 */
export default function clicked(event, map) {
  const { clientX: x, clientY: y } = event;
  for (let i = 0; i < map.length; i++) {
    const [mx, my, mw, mh] = map[i];
    if (x >= mx && x <= mw && y >= my && y <= mh) {
      return map[i];
    }
  }
}
