class CharacterController {//多例模式，每个可操控角色拥有一个实例，比如主角、过去自己、敌人、ai控制）
    constructor(controlMode) {
        this.controlMode = controlMode;
        window.addEventListener();
        window.addEventListener();
    }
    switchMode(controlMode) {
        this.controlMode = controlMode;
    }

    controlPipeline(event) {
        const processedEvent = this.controlMode.eventHandler();
        const intent = this.controlMode.eventToIntent(processedEvent);
        const action = this.controlMode.intentToAction(intent);
        this.controlMode.actionToPhysics(action);
    }

    /**
    * 
    * 修改————
    * 
    * -----------接口（关联录制回放模块）-------------
    * 添加者：
    * 录制系统（徐思齐）
    * 
    * 职责：
    * 复制把 RecordSystem 回放出来的一帧 InputFrame
    * 应用到某个受控角色（例如主角、分身、AI角色）上。
    *
    * 作用：
    * 1. 让“玩家真实输入”和“回放输入”共用同一套控制接口
    * 2. 让 RecordSystem 只负责“输出数据”，不直接负责角色移动
    * 3. 方便以后扩展 AI / 脚本控制 / 网络同步
    */
    applyInputFrame(frame, controlledEntity) {
    // 一、基础安全检查
    if (!frame) return;
    if (!controlledEntity) return;

    // 二、处理水平移动 (保留)
    const speed = controlledEntity.speed ?? 0;
    controlledEntity.vel.x = frame.moveX * speed;

    // 三、处理跳跃 (保留)
    if (frame.jumpPressed && controlledEntity.onGround) {
      // 向上跳要给负速度
      controlledEntity.vel.y = controlledEntity.jumpForce;
      controlledEntity.onGround = false;
    }

    /*
    以下为 MVP 阶段暂时删除的逻辑（减负用）

    处理角色朝向
    controlledEntity.facingRight = frame.facingRight;

    处理交互动作
    if (frame.interactPressed && typeof controlledEntity.tryInteract === "function") {
       controlledEntity.tryInteract();
     }

    处理使用道具动作
    if (frame.useItemPressed && typeof controlledEntity.useItem === "function") {
        controlledEntity.useItem();
     }
    */
  
  }

}

