interface Position {
  x: number;
  y: number;
}
export default class Vector2D extends Array {
  constructor([x = 1, y = 0]) {
    super(...[x, y]);
  }

  set x(v: number) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  get dir() {
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D([this.x, this.y]);
  }

  add(v: Position) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Position) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(a: number) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  cross(v: Position) {
    return this.x * v.y - v.x * this.y;
  }

  dot(v: Position) {
    return this.x * v.x + v.y * this.y;
  }

  normalize() {
    return this.scale(1 / this.length);
  }

  rotate(rad: number) {
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}