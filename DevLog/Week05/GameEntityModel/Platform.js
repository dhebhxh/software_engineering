class Platform extends GameEntity {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    //默认实心平台
    this.isSolid = true;

    this.vx = 0;
    this.vy = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.gravity = 0;
    this.friction = 1;

    this.collider = new Rectangle(ColliderType.STATIC, this.w, this.h);
  }

  update(dt) {
    // 静止，不需要每帧更新，占位
  }

  draw() {
    if (!this.visible) return;

    push();
    fill(120);
    stroke(0);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}