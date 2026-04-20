class PhysicsSystem {
  constructor() {
    this.gravityDefault = 0.5;
    this.frictionDefault = 0.85;
  }

  //对实体执行一次完整的物理更新
  //这里还没有用dt
  apply(entity, dt) {
     //把加速度作用到速度上
    entity.vx += entity.accelerationX;
    entity.vy += entity.accelerationY;

    this.applyGravity(entity); //改重力
    this.applyFriction(entity); //改摩擦
    this.limitSpeed(entity);  //限速

    //把速度反映到位置上
    entity.x += entity.vx;
    entity.y += entity.vy;
  }

  //每一帧让竖直速度变大一点
  applyGravity(entity) {
    entity.vy += entity.gravity;
  }

  //每一帧把水平速度乘上一个小于 1 的数，让它慢慢减小
  applyFriction(entity) {
    entity.vx *= entity.friction;
  }

  //限制一个最大速度，防止一直加速
  limitSpeed(entity) {
    if (entity.vx > entity.speedLimit) {
      entity.vx = entity.speedLimit;
    }
    if (entity.vx < -entity.speedLimit) {
      entity.vx = -entity.speedLimit;
    }
    if (entity.vy > entity.speedLimit) {
      entity.vy = entity.speedLimit;
    }
    if (entity.vy < -entity.speedLimit) {
      entity.vy = -entity.speedLimit;
    }
  }
}