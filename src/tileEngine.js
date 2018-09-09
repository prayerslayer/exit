import MAP from "./assets/map/hurr.json";
import TILES from "./assets/img/exit_game.png";

function loadImage(img) {
  return new Promise(resolve => {
    const image = new Image();
    image.src = img;
    image.onload = resolve;
  });
}

export function getTileEngine(kontra, map = MAP, image = TILES) {
  return loadImage(image).then(() => {
    return kontra.assets.load(map, image).then(([m]) => {
      let tileEngine = kontra.tileEngine({
        // tile size
        tileWidth: 10,
        tileHeight: 10,

        // map size in tiles
        width: 32,
        height: 32
      });
      tileEngine.addTilesets({
        image
      });
      tileEngine.addLayers(m.layers);
      return tileEngine;
    });
  });
}
