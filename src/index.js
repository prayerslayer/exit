import "./lib/kontra";
import { updatePlayerPosition, getPlayer } from "./player";
import { getTileEngine } from "./tileEngine";
import { getVisitor } from "./visitor";

kontra.init();

getTileEngine(kontra).then(tileEngine => {
  let pool = kontra.pool({
    create: kontra.sprite // create a new sprite every time the pool needs new objects
  });

  let player = getPlayer(kontra);

  for (let i = 0; i < 12; i++) {
    pool.get(getVisitor(kontra, tileEngine));
  }

  const sprites = [player];

  let loop = kontra.gameLoop({
    fps: 60,
    update: function() {
      pool.update();
      sprites.forEach(sprite => {
        sprite.update();
      });
    },
    render: function() {
      tileEngine.render();
      pool.render();
      updatePlayerPosition(kontra, tileEngine, player);
      sprites.forEach(sprite => sprite.render());
    }
  });

  loop.start();
});
