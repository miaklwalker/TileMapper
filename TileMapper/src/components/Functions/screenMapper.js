export default function screenMapper (canvas,divisions) {
    const {width , height} = canvas;
    let tiles = []
    let cHeight = height/divisions[0]
    let cWidth = width/divisions[1]
    for (let i = 0; i < height; i+=cHeight) {
        for (let j = 0; j < width; j+=cWidth) {
            let mapped = [j,i,j+cWidth,i+cHeight]
            tiles.push(mapped);
        }
    }
    return tiles
}
