import { ImprovedNoise } from './ImprovedNoise';
function generateHeight(width: number, height: number) {
    var size = width * height, data = new Uint8Array(size),
        perlin:  any = new ImprovedNoise(), quality = 1, z = Math.random() * 50;
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < size; i++) {
            var x = i % width, y = ~ ~(i / width);
            data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1.75);
        }
        quality *= 5;
    }
    return data;
}


export {generateHeight}