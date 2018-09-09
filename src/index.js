import "./lib/kontra";
import { seconds } from "./util";
import { getTileEngine } from "./tileEngine";

kontra.init();

const PLAYER_SIZE = 8;

const WALL_TILE = 1;
const DOOR_TILE = 5;

const VisitorState = {
  Moving: 1,
  Leaving: 2
};

getTileEngine(kontra).then(tileEngine => {
  function checkWallCollision(sprite) {
    if (
      tileEngine.layerCollidesWith("wall", sprite) &&
      tileEngine.tileAtLayer("wall", sprite) === WALL_TILE
    ) {
      sprite.x = sprite.previously.x;
      sprite.y = sprite.previously.y;
    }
  }

  function checkDoorCollision(sprite) {
    if (
      tileEngine.layerCollidesWith("wall", sprite) &&
      tileEngine.tileAtLayer("wall", sprite) === DOOR_TILE
    ) {
      if (sprite.meta.type === "player") {
        console.log("TODO load room"); // eslint-disable-line
      } else {
        if (sprite.state !== VisitorState.Leaving) {
          sprite.ttl = 0;
          sprite.dx = 0;
          sprite.dy = 0;
        }
        sprite.state = VisitorState.Leaving;
      }
    }
  }

  function checkCollision(sprite) {
    checkWallCollision(sprite);
    checkDoorCollision(sprite);
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
    checkCollision(player);
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
    return {
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
      ttl: Infinity,
      state: VisitorState.Moving,
      dx: 2,
      dy: 2,
      update: function() {
        const now = Date.now();

        if (this.state === VisitorState.Moving) {
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
          checkCollision(this);
        }
      }
    };
  }

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
      updatePlayerPosition(kontra, player);
      // render the game state
      sprites.forEach(sprite => sprite.render());
    }
  });

  loop.start(); // start the game
});
