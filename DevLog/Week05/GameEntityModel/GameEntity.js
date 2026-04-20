class GameEntity {
  constructor(x, y, w, h) {
    // basic transform
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // velocity
    this.vx = 0;
    this.vy = 0;

    // acceleration
    this.accelerationX = 0;
    this.accelerationY = 0;

    // physics properties
    this.speedLimit = 6;
    this.friction = 0.85;
    this.gravity = 0.5;

    // state  对象的可见状态
    this.visible = true;

    // collision  碰撞器占位
    this.collider = null;
  }

  //每一帧更新对象的状态
  //dt：delta time，距离上一帧过去了多少时间（一帧经过的时间）
  update(dt) {
    //具体更新方法交由子类决定
  }

  //渲染
  draw() {
    //先留一个空心矩形框占位
    if (!this.visible) return;

    push();
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    pop();
  }

  getCenterX() {
    return this.x + this.w / 2;
  }

  getCenterY() {
    return this.y + this.h / 2;
  }

  getHalfWidth() {
    return this.w / 2;
  }

  getHalfHeight() {
    return this.h / 2;
  }
}