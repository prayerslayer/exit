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
    pool.get(getVisitor(kontra));
  }

  const sprites = [player];

  let loop = kontra.gameLoop({
    fps: 60,
    // create the main game loop
    update: function() {
      pool.update();
      sprites.forEach(sprite => {
        sprite.update();
        if (sprite.x < 0) {
          sprite.x = sprite.width;
          sprite.dx *= -1;
        }
        if (sprite.y < 0) {
          sprite.y = sprite.height;
          sprite.dy *= -1;
        }
        if (sprite.x > kontra.canvas.width) {
          sprite.x = kontra.canvas.width - sprite.width;
          sprite.dx *= -1;
        }
        if (sprite.y > kontra.canvas.height) {
          sprite.y = kontra.canvas.height - sprite.height;
          sprite.dy *= -1;
        }
      });
    },
    render: function() {
      tileEngine.render();
      pool.render();
      updatePlayerPosition(kontra, tileEngine, player);
      // render the game state
      sprites.forEach(sprite => sprite.render());
    }
  });

  loop.start(); // start the game
});
