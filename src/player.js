import { checkCollision } from "./util";

export function updatePlayerPosition(k, tileEngine, player) {
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
  checkCollision(tileEngine, player);
}

export function getPlayer(k, size = 8) {
  return k.sprite({
    width: size,
    height: size,
    speed: 2,
    x: size, // starting x,y position of the sprite
    y: size,
    color: "red", // fill color of the sprite rectangle,
    meta: {
      type: "player"
    },
    previously: {
      x: size,
      y: size,
      speed: 3
    }
  });
}
