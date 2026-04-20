class InteractiveObject extends GameEntity {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.isInteractable = true;  //默认可被交互
    this.isTriggered = false;   //默认没被触发交互
    this.interactionRange = 50;  //可交互范围
    this.onceOnly = false;  //是否为一次性

    this.gravity = 0;
    this.friction = 1;

    this.collider = new Rectangle(ColliderType.STATIC, this.w, this.h);
  }

  //判断能否进行交互
  canInteract(actor) {
    if (!this.isInteractable) return false;
    if (!actor || !actor.isAlive) return false;

    let dx = actor.getCenterX() - this.getCenterX();
    let dy = actor.getCenterY() - this.getCenterY();
    let distance = Math.sqrt(dx * dx + dy * dy);
    //在可交互范围内才允许交互
    return distance <= this.interactionRange;
  }

  //交互
  interact(actor) {
    if (!this.canInteract(actor)) return;

    if (this.onceOnly && this.isTriggered) return;

    this.isTriggered = true;  //已触发交互
    this.onTrigger(actor);  //交互产生的效果，交给具体子类实现
  }

  onTrigger(actor) {
    // 由子类实现具体效果
  }

  //控制一些满足条件后才可触发交互的物体
  activate() {  //满足交互条件，激活
    this.isInteractable = true;
  }

  deactivate() {  //还未满足交互条件，不能交互
    this.isInteractable = false;
  }

  update(dt) {
    // 暂时没有每帧逻辑，占位
  }

  draw() {
    if (!this.visible) return;

    push();
    stroke(0);
    fill(100, 180, 220);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}