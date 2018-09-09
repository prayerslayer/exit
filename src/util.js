import { Grid, AStarFinder } from "pathfinding";
import { VisitorState } from "./visitor";

const finder = new AStarFinder();

export function seconds(n) {
  return n * 1000;
}

export function range(n) {
  return new Array(n).fill(0).map((_, i) => i);
}

// COLLISION

const WALL_TILE = 1;
const DOOR_TILE = 5;
function checkWallCollision(tileEngine, sprite) {
  if (
    tileEngine.layerCollidesWith("wall", sprite) &&
    tileEngine.tileAtLayer("wall", sprite) === WALL_TILE
  ) {
    sprite.x = sprite.previously.x;
    sprite.y = sprite.previously.y;
  }
}

function checkDoorCollision(tileEngine, sprite) {
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

export function checkCollision(tileEngine, sprite) {
  checkWallCollision(tileEngine, sprite);
  checkDoorCollision(tileEngine, sprite);
}
