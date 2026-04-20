class Character extends GameEntity {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.isAlive = true;
    this.isOnGround = false;
    this.jumpForce = 12;
    this.state = "idle";

    this.maxHealth = 10;
    this.health = this.maxHealth;

    this.controlComponent = null;
  }

  setControlComponent(component){
    this.controlComponent = component;
  }

   applyControlComponent() {
    if (!this.controlComponent) return;
    // 这里只接收“控制结果”，不直接推进位置
    this.vx = this.controlComponent.velocityX;
    this.vy = this.controlComponent.velocityY;
    this.accelerationX = this.controlComponent.accelerationX;
    this.accelerationY = this.controlComponent.accelerationY;
  }

  jump() {
    if (this.isOnGround) {
      this.vy = -this.jumpForce;
      this.isOnGround = false;
      this.state = "jump";
    }
  }

  //受击
  takeDamage(amount) {
  if (!this.isAlive) return;

  this.health -= amount;

  if (this.health <= 0) {
    this.die();
  }
  }

  die() {
  this.isAlive = false;
  this.vx = 0;
  this.vy = 0;
  this.state = "dead";
  }

  //不同实体交互方式不同，先空置
  interact(target) {
    // to be implemented by subclasses
  }

  update(dt) {
    if (!this.isAlive) {
      this.state = "dead";
    } else if (!this.isOnGround) {
      this.state = "jump";
    } else if (Math.abs(this.vx) > 0.1) {
      this.state = "run";
    } else {
      this.state = "idle";
    }
  }

  draw() {
    if (!this.visible) return;

    push();
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}