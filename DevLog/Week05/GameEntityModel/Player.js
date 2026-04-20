class Player extends Character {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.moveSpeed = 4;
    this.isRecording = false;
    this.facing = "right";

    this.characterController = null;

    this.collider = new Rectangle(ColliderType.DYNAMIC, this.w, this.h);
  }

  setController(controller){
    this.characterController = controller;
  }
  //从controller读取输入状态，然后转换成player的动作
  updateControl() {
    if (!this.characterController) return;
    //检查一下characterController中是否有getControlState()这个函数，没有就直接退出
    if (typeof this.characterController.getControlState !== "function") return;
    //在controlState中记录controller返回的对象
    // 类似{left: true,right: false,jumpRequested: false}
    const controlState = this.characterController.getControlState();
    if (!controlState) return;

    // 每一帧先把水平速度清0
    this.vx = 0;

    //按左键
    if (controlState.left) {
      this.vx = -this.moveSpeed;
      this.facing = "left";
    }

    //按右键
    if (controlState.right) {
      this.vx = this.moveSpeed;
      this.facing = "right";
    }

    //跳
    if (controlState.jumpRequested) {
      this.jump();
    }

    // 如果 controller 还提供加速度，也可以一起接
    if (typeof controlState.accelerationX === "number") {
      this.accelerationX = controlState.accelerationX;
    }

    if (typeof controlState.accelerationY === "number") {
      this.accelerationY = controlState.accelerationY;
    }
  }
  






  // //处理玩家输入
  // handleInput(keys) {
  //   //每一帧先把水平速度清零，再根据按键决定向哪里移动
  //   this.vx = 0;
  //   // keys = { left:boolean, right:boolean, jump:boolean }
  //   //按左键
  //   if (keys.left) {
  //     this.vx = -this.moveSpeed;
  //     this.facing = "left";
  //   }

  //   //按右键
  //   if (keys.right) {
  //     this.vx = this.moveSpeed;
  //     this.facing = "right";
  //   }
    
  //   //按跳跃键，调用jump
  //   if (keys.jump) {
  //     this.jump();
  //   }
  // }

  interact(target) {  
  if (!target) return;  
  //只有具备interact这个函数的target才能互动
  if (typeof target.interact === "function") {  
    //让target来处理交互
    target.interact(this);  
  }  
}

  //录制状态先占位，后续再调用recordSystem.startRecording()和recordSystem.stopRecording()
  startRecord() {
    this.isRecording = true;
  }

  stopRecord() {
    this.isRecording = false;
  }

  //更新状态，后续可再加专属于玩家的更新
  update(dt) {
    super.update(dt);
  }

  draw() {
    if (!this.visible) return;

    push();
    stroke(0);
    fill(180);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}