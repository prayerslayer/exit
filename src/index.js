import "./lib/kontra";
import MAP from "./assets/map/hurr.json";
import TILES from "./assets/img/exit_game.png";
kontra.init();

const PLAYER_SIZE = 8;

function seconds(n) {
  return n * 1000;
}

function range(n) {
  return new Array(n).fill(0).map((_, i) => i);
}

const image = new Image();
image.src = TILES;
image.onload = () => {
  kontra.assets.load(MAP).then(([map]) => {
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
    tileEngine.addLayers(map.layers);

    tileEngine.render();
    function resetIfColllides(sprite) {
      if (tileEngine.layerCollidesWith("wall", sprite)) {
        sprite.x = sprite.previously.x;
        sprite.y = sprite.previously.y;
      }
    }

    function updatePlayerPosition(k, player) {
      player.previously.x = player.x;
      player.previously.y = player.y;

      const left = k.keys.pressed("left");
      const right = k.keys.pressed("right");
      const up = k.keys.pressed("up");
      const down = k.keys.pressed("down");

      const xSign = left ? -1 : right ? 1 : 0;
      const ySign = up ? -1 : down ? 1 : 0;
      const desiredY = player.y + ySign * player.speed;
      const desiredX = player.x + xSign * player.speed;

      player.x = desiredX;
      player.y = desiredY;
      resetIfColllides(player);
    }
    function getPlayer(k) {
      return k.sprite({
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        speed: 2,
        x: PLAYER_SIZE, // starting x,y position of the sprite
        y: PLAYER_SIZE,
        color: "red", // fill color of the sprite rectangle,
        meta: {
          type: "player"
        },
        previously: {
          x: PLAYER_SIZE,
          y: PLAYER_SIZE,
          speed: 3
        }
      });
    }

    function getVisitor(k) {
      return k.sprite({
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        speed: 1,
        x: Math.floor(Math.random() * k.canvas.width), // starting x,y position of the sprite
        y: Math.floor(Math.random() * k.canvas.height),
        color: "black", // fill color of the sprite rectangle,
        meta: {
          type: "visitor",
          id: Math.floor(Math.random() * 1000) + "",
          lastDirectionChange: Date.now() - 100000
        },
        previously: {
          x: 0,
          y: 0
        },
        dx: 2,
        dy: 2,
        reset: {
          // [property]: false | timestamp when to reset from previously field
          dx: false,
          dy: false
        },
        update: function() {
          const now = Date.now();

          Object.keys(this.reset).forEach(key => {
            if (this.reset[key] && now - this.reset[key] > 0) {
              this[key] = this.previously[key];
              this.reset[key] = false;
            }
          });

          if (now - this.meta.lastDirectionChange > seconds(5)) {
            const [dxFactor, dyFactor] = {
              0: [1, 0],
              1: [0, 1],
              2: [-1, 0],
              3: [0, -1]
            }[Math.floor(Math.random() * 4)];
            this.dy = dyFactor * (this.dy === 0 ? this.speed : this.dy);
            this.dx = dxFactor * (this.dx === 0 ? this.speed : this.dx);
            this.meta.lastDirectionChange = now;
          }

          this.previously.x = this.x;
          this.previously.y = this.y;
          this.x += this.dx;
          this.y += this.dy;
          resetIfColllides(this);
        }
      });
    }

    let player = getPlayer(kontra);
    let visitors = range(12).map(() => getVisitor(kontra));

    const sprites = [...visitors, player];

    let loop = kontra.gameLoop({
      fps: 60,
      // create the main game loop
      update: function() {
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
        updatePlayerPosition(kontra, player);
        // render the game state
        sprites.forEach(sprite => sprite.render());
      }
    });

    loop.start(); // start the game
  });
};
