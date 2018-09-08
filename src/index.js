import "./lib/kontra";

import MAP_TILES from "./assets/img/mapPack_tilesheet.png";
import CHARACTER from "./assets/img/character_walk_sheet.png";

kontra.init();

function loadMap(tileEngine) {
  let img = document.createElement("img");
  img.src = MAP_TILES;

  img.onload = function() {
    tileEngine.addTilesets({
      image: img
    });

    // Add the following:
    tileEngine.addLayers({
      name: "ground",
      // prettier-ignore
      data: [ 0,  2,  3,  0,  0,  0,  0,  0,  0,
            0,  0,  6,  7,  7,  8,  0,  0,  0,
            0,  6,  27, 24, 24, 25, 0,  0,  0,
            0,  23, 24, 24, 24, 26, 8,  0,  0,
            0,  23, 24, 24, 24, 24, 26, 8,  0,
            0,  23, 24, 24, 24, 24, 24, 25, 0,
            0,  40, 41, 41, 10, 24, 24, 25, 0,
            0,  0,  0,  0,  40, 41, 41, 42, 0,
            0,  0,  0,  0,  0,  0,  0,  0,  0 ]
    });
  };
}

function loadPlayer(kontra) {
  let image = document.createElement("img");
  image.src = CHARACTER;

  return kontra.spriteSheet({
    image: image,
    frameWidth: 72,
    frameHeight: 97,
    animations: {
      walk: {
        frames: "0..9", // frames 0 through 9
        frameRate: 30
      },
      idle: {
        frames: 1 // single frame
      }
    }
  });
}

const PLAYER_SIZE = 10; // w,h

// function getQuadrant(dx, dy) {
//   if (dy < 0 && dx > 0) {
//     return 1;
//   }
//   if (dy < 0 && dx < 0) {
//     return 2;
//   }
//   if (dy > 0 && dx < 0) {
//     return 3;
//   }
//   if (dy > 0 && dx > 0) {
//     return 4;
//   }
//   return 0; // dx = 0 && dy = 0 => same position, shouldn't happen
// }

function seconds(n) {
  return n * 1000;
}

// function objectDirection(player, object) {
//   let dx = player.x - object.x;
//   let dy = player.y - object.y;
//   return getQuadrant(dx, dy);
// }

function updateRotation(sprite) {
  const dx = sprite.x - sprite.previously.x;
  const dy = sprite.y - sprite.previously.y;
  sprite.animations.idle.update();
  // sprite.animations.walk.update();
  // if (sprite.animations) {
  //   if (dx !== 0 || dy !== 0) {
  //     console.log("walk");
  //     sprite.animations.idle.reset();
  //     sprite.animations.walk.update();
  //   } else {
  //     console.log("idle");
  //     sprite.animations.walk.reset();
  //     sprite.animations.idle.update();
  //   }
  // }
  // const theta = (Math.atan(dy / dx) * 180) / Math.PI;
}

function getPlayer(k) {
  const anim = loadPlayer(k);
  return k.sprite({
    width: 200,
    height: 100,
    speed: 3,
    x: PLAYER_SIZE + 10, // starting x,y position of the sprite
    y: PLAYER_SIZE + 10,
    color: "red", // fill color of the sprite rectangle,
    animations: anim.animations,
    meta: {
      type: "player"
    },
    previously: {
      x: PLAYER_SIZE + 10,
      y: PLAYER_SIZE + 10,
      speed: 3
    }
  });
}

function getPerson(k) {
  return k.sprite({
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
    speed: 1,
    x: Math.floor(Math.random() * k.canvas.width), // starting x,y position of the sprite
    y: Math.floor(Math.random() * k.canvas.height),
    color: "black", // fill color of the sprite rectangle,
    meta: {
      type: "person",
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
    }
  });
}

function updatePlayerPosition(k, player) {
  player.previously.x = player.x;
  player.previously.y = player.y;

  if (k.keys.pressed("left")) {
    player.x -= player.speed;
  }
  if (k.keys.pressed("right")) {
    player.x += player.speed;
  }
  if (k.keys.pressed("up")) {
    player.y -= player.speed;
  }
  if (k.keys.pressed("down")) {
    player.y += player.speed;
  }
}

function range(n) {
  return new Array(n).fill(0).map((_, i) => i);
}

let tileEngine = kontra.tileEngine({
  // tile size
  tileWidth: 64,
  tileHeight: 64,

  // map size in tiles
  width: 10,
  height: 10
});

loadMap(tileEngine);

let player = getPlayer(kontra);
let people = range(1).map(() => getPerson(kontra));

const sprites = [...people, player];

let loop = kontra.gameLoop({
  // create the main game loop
  update: function() {
    updateRotation(player);
    // player.update();
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
