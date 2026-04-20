class Enemy extends Character {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.moveSpeed = 2;
    this.health = 3;  //hp
    this.damage = 1;

    this.detectionRange = 200;  //能在多远范围内发现目标
    this.attackRange = 40;  //攻击范围

    this.target = null;  //当前追踪对象

    this.patrolPoints = [];  //巡逻点列表，之后可以存巡逻点坐标
    this.currentPatrolIndex = 0;  //目前正走向第几个巡逻点

    this.facing = "left";

    this.collider = new Rectangle(ColliderType.DYNAMIC, this.w, this.h);
  }

  //发现目标
  //targets是所有可能的目标，target是当前锁定的目标
  detectTarget(targets) {
    this.target = null;

    for (let target of targets) {
      if (!target || !target.visible) continue;

      let dx = target.getCenterX() - this.getCenterX();
      let dy = target.getCenterY() - this.getCenterY();
      //计算敌人与目标的直线距离
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= this.detectionRange) {
        this.target = target;
        return;
      }
    }
  }

  //追击目标
  chaseTarget() {
    if (!this.target) {
      this.vx = 0;
      return;
    }

    if (this.target.x < this.x) {
      this.vx = -this.moveSpeed;
      this.facing = "left";
    } else if (this.target.x > this.x) {
      this.vx = this.moveSpeed;
      this.facing = "right";
    } else {
      this.vx = 0;
    }
  }

  //巡逻
  //有的关卡可能需要怪会巡逻
  patrol() {
    if (this.patrolPoints.length === 0) {
      this.vx = 0;
      return;
    }

    let point = this.patrolPoints[this.currentPatrolIndex];

    //如果快要到达当前巡逻点，就切换到下一个巡逻点
    //如果已经是最后一个巡逻点，就再回到第一个点，循环
    if (Math.abs(point.x - this.x) < 2) {
      this.currentPatrolIndex =
        (this.currentPatrolIndex + 1) % this.patrolPoints.length;
      this.vx = 0;
      return;
    }

    if (point.x < this.x) {
      this.vx = -this.moveSpeed;
      this.facing = "left";
    } else {
      this.vx = this.moveSpeed;
      this.facing = "right";
    }
  }

  //巡逻与追击串联
  updateAI(targets) {
    if (!this.isAlive) {
        this.vx = 0;
        return;
    }

    this.detectTarget(targets);

    if (this.target) {
      this.chaseTarget();
    } else {
      this.patrol();
    }
  }

  attack(target) {
    if (!target || !target.isAlive) return;
    target.takeDamage(this.damage);
  }

  update(dt) {
    super.update(dt);
  }

  draw() {
    if (!this.visible) return;

    push();
    stroke(0);
    fill(200, 80, 80);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}