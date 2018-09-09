import { seconds, checkCollision } from "./util";

export const VisitorState = {
  Moving: 1,
  Leaving: 2
};

export function getVisitor(k, size = 8) {
  return {
    width: size,
    height: size,
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
        checkCollision(tileEngine, this);
      }
    }
  };
}
