// RecordSystem.js 录制模块主控制器
//
// 职责：
// 1. 管理录制系统状态（IDLE / RECORDING / REPLAYING）
// 2. 管理当前录制片段 currentClip
// 3. 负责开始录制、记录逐帧控制意图、停止录制
// 4. 负责开始回放、逐帧输出当前应执行的 InputFrame
//
// 本模块包含录制+回放数据的功能，暂定录制完后自动回放

/*
修改————

暂时删除以下部分：
facingRight
interactPressed
useItemPressed

只保留：
moveX
jumpPressed
*/

class RecordSystem {
  /**
   * 构造函数：创建一个新的录制系统
   * @param {number} maxDurationMs - 单次录制允许的最大时长（毫秒）
   */
  constructor(maxDurationMs = 10000) {
    /**
     * 当前录制系统所处模式
     * @type {string}
     */
    // 当前系统状态，初始化为空闲状态
    this.mode = RecordMode.IDLE;

    /**
     * 当前录制片段
     * 在开始录制前为 null
     * @type {RecordClip|null}
     */
    this.currentClip = null;

    /**
     * 回放进行到第几帧
     * 仅在回放模式 REPLAYING 阶段有意义
     * @type {number}
     */
    this.replayIndex = 0;

    /**
     * 当前这轮录制的开始时间（毫秒时间戳）
     * 后续用它和 millis() 做差，计算录制总时长
     * @type {number}
     */
    this.recordStartTime = 0;

    /**
     * 单次录制的最大允许时长
     * @type {number}
     */
    this.maxDurationMs = maxDurationMs;

    /**
     * 当前录制是否允许被中途打断
     * @type {boolean}
     */
    this.isInterruptible = true;
  }

  /**
   * 开始一轮新的录制
   *
   * @param {number} startX - 录制起点 X
   * @param {number} startY - 录制起点 Y
   */
  startRecording(startX, startY) {
    // 创建新的录制片段，并记录起始位置
    this.currentClip = new RecordClip(startX, startY);

    // 切换模式为“录制中”
    this.mode = RecordMode.RECORDING;

    // 将回放索引重置为 0，保证之后如需回放能从第一帧开始
    this.replayIndex = 0;

    // 记录这一轮录制开始的时间（当前时间），供后续计算录制时长使用
    this.recordStartTime = millis();
  }

  /**
   * 修改————
   * 
   * 某一帧控制的所有信息：moveX，jump
   * 记录当前这一帧的控制意图数据，并写入当前录制片段
   * 
   * 【我之前这里写的 captureFrame 对应你给 addFrame 的功能】
   * 【即拦截非录制状态，并把帧数据存入片段中】
   * 【既然是addFrame，我也把名称统一改成了 addFrame】
   * @param {InputFrame} frame
   */
  addFrame(frame) {
    // 如果当前不是录制状态，直接忽略
    if (!this.isRecording()) return;

    //如果 currentClip 不存在，说明录制还没有正确初始化，直接返回
    if (!this.currentClip) return;

    // 将这一帧控制意图（输入数据）加入当前录制片段
    this.currentClip.addFrame(frame);

    // 根据“当前时间 - 录制开始时间”计算录制已持续多久，实时更新录制时长
    this.currentClip.durationMs = millis() - this.recordStartTime;

    // 如果录制时长达到或超过最大允许值（超时），则自动停止录制
    if (this.currentClip.durationMs >= this.maxDurationMs) {
      this.stopRecording();
    }
  }

  /**
   * 新增内容————
   * 
   * 接口：记录玩家输入 (供外部 CharacterController 调用)
   * 供外界（例如角色控制器或按键监听系统）在录制期间每帧调用的便捷接口
   * 负责接收原始的玩家输入，将其封装为 InputFrame 后储存
   * @param {number} moveX - 水平移动意图 (-1 向左, 0 不动, 1 向右)
   * @param {boolean} jumpPressed - 这一帧是否按下了跳跃键
   *
   * 调用示例：
   * let currentMoveX = 0;
   * if (keyIsDown(65)) currentMoveX = -1; // A键
   * if (keyIsDown(68)) currentMoveX = 1;  // D键
   * let isJumping = keyIsDown(32);        // W键/空格
   * 
   * 你这边调用我写好的方法即可，会把数据传给你
   * recordSystem.recordPlayerInput(currentMoveX, isJumping);
   * 
   * 之后如何打包成 InputFrame，怎么存进 currentClip，
   * 超时后怎么自动停止，系统内部已经写好
   * ==========================================
   */
  recordPlayerInput(moveX, jumpPressed) {
    // 如果当前不在录制状态，直接忽略外界发来的数据
    if (!this.isRecording()) return;

    // 1. 封装打包：将外界传来的两个核心变量，实例化成一帧标准的数据对象
    // （因为目前是 MVP 阶段目标，只传前两个参数，后面的朝向等属性保持默认即可）
    const frame = new InputFrame(moveX, jumpPressed);

    // 2. 储存交接：调用我这边原本写好的 addFrame 方法，把这帧数据塞进 clip 数组里
    this.addFrame(frame);
  }

  /**
   * 新增内容————
   * 提供了一个把打包好的数组交出去的接口：
   * 
   * 录制结束后，提供一个方法，拿到打包/记录好的信息
   * 将录制好的 clip 集合交给 ControllerManager
   * @returns {RecordClip|null} 返回当前录制片段（包含所有的 frames 数组和起始坐标）
   */
  getClip() {
    return this.currentClip;
  }

  /**
   * 结束当前录制
   * 注意：
   * 这里只负责“停止录制”
   * 并不会自动进入回放
   */
  stopRecording() {
    // 只有在录制状态下才能停止录制
    if (!this.isRecording()) return;

    // 最后再更新一次录制总时长，确保记录值尽量准确
    if (this.currentClip) {
      this.currentClip.durationMs = millis() - this.recordStartTime;
    }

    // 录制结束后，系统切回空闲状态
    this.mode = RecordMode.IDLE;
  }

  /**
   * 开始回放当前录制片段 clip
   *
   * @returns {boolean} 是否成功开始回放
   * true  = 成功开始回放
   * false = 当前没有可回放的录制片段
   */
  startReplay() {
    // 没有录制片段 clip，无法回放
    if (!this.currentClip) return false;

    // 录制片段 clip 存在但为空（没有任何帧数据），也无法回放
    if (this.currentClip.isEmpty()) return false;

    // 切换状态为回放中
    this.mode = RecordMode.REPLAYING;

    // 从第 0 帧开始回放
    this.replayIndex = 0;

    // 返回 true，表示回放已成功开始
    return true;
  }

  /**
   * 回放过程中，每一帧更新一次
   *
   * 它的职责不是“直接控制角色移动”，
   * 而是“返回当前这一帧应执行的控制意图”。
   *
   * 外部模块拿到这个 InputFrame 后，可以：
   * - 转交给 CharacterController
   * - 或直接应用到 clone / replay actor 身上
   *
   * @returns {InputFrame|null} 当前应执行的帧；如果回放结束或状态不对，则返回 null
   */
  updateReplay() {
    // 只有在回放状态下，才会返回数据（有效的回放帧）
    if (!this.isReplaying()) return null;

    // 没有录制片段 clip，无法回放
    if (!this.currentClip) return null;

    // 取出当前回放索引对应的帧
    //（取出当前 replayIndex 对应的那一帧数据）
    const frame = this.currentClip.getFrame(this.replayIndex);

    // 如果 frame 为 null，说明已经回放到末尾
    //（如果取出的结果为 null，说明已经回放到最后一帧之后了）
    if (frame === null) {
      // 回放结束后，系统回到空闲状态
      this.mode = RecordMode.IDLE;

      // 同时重置索引（将回放索引重置为 0，方便下次重新从头回放）
      this.replayIndex = 0;

      return null;
    }

    // 为下一帧回放做准备（当前这一帧已经准备返回了，因此先把索引加 1，供下一帧使用）
    this.replayIndex++;

    // 返回这一帧副本，避免外部代码直接修改内部存储的历史帧数据
    return frame.copy();
  }

  /**
  * 停止当前回放
  * 常用于：
  * - 玩家按键主动取消回放
  * - 分身回放过程中被外部事件打断
  * - 游戏流程要求提前结束 replay
  *
  * 注意：
  * 这里只负责“停止回放并恢复为空闲状态”
  * 不会删除 currentClip，因为通常还希望之后可以重新播放同一段录制
  */
  stopReplay() {
    // 只有在回放状态下，才需要停止回放
    if (!this.isReplaying()) return;

    // 退出回放模式，恢复为空闲状态
    this.mode = RecordMode.IDLE;

    // 回放索引重置为 0，方便下次从头开始播放
    this.replayIndex = 0;
  }

  /**
   * 中断当前录制流程
   * 示例场景：
   * - 玩家录到一半，主动按键结束录制
   * - 游戏规则允许提前结束录制并立即进入后续流程
   */
  interrupt() {
    // 如果系统不允许中断，则什么都不做
    //（如果当前规则不允许中断，则直接忽略）
    if (!this.isInterruptible) return;

    // 只有录制状态下，才允许中断录制
    if (!this.isRecording()) return;

    // 执行停止录制逻辑
    this.stopRecording();
  }

  /**
   * 重置整个录制系统到初始状态
   * 常用于：
   * - 角色死亡重开
   * - 关卡重新开始
   * - 清空旧录制
   */
  reset() {
    this.mode = RecordMode.IDLE; // 回到空闲状态
    this.currentClip = null;     // 删除当前录制片段
    this.replayIndex = 0;        // 回放索引清零
    this.recordStartTime = 0;    // 录制开始时间清零
  }

  /**
   * 获取当前回放片段的起始位置
   * 方便外部系统创建分身或回放角色时放到正确起点
   * @returns {{x:number, y:number}|null}
   */
  getReplayStartPosition() {
    // 如果当前没有录制片段，则无法提供起始位置
    if (!this.currentClip) return null;
    
    // 否则返回录制片段保存的起始位置
    return this.currentClip.getStartPosition();
  }

  /**
   * 获取当前正在回放到哪一帧
   * 主要用于调试和 UI 显示
   * @returns {InputFrame|null}
   */
  // 注意：正常回放逻辑用 updateReplay()，其只是辅助查看状态
  getCurrentFrame() {
    // 如果没有当前录制片段，则返回 null
    if (!this.currentClip) return null;
    
    // 返回当前回放索引对应的那一帧
    return this.currentClip.getFrame(this.replayIndex);
  }

  /**
   * 判断系统当前是否正在录制
   *
   * 这里的“当前”指的是：
   * 当前这一时刻，RecordSystem 的运行状态
   *
   * @returns {boolean}
   */
  isRecording() {
    return this.mode === RecordMode.RECORDING;
  }

  /**
   * 当前是否正在回放
   * @returns {boolean}
   */
  isReplaying() {
    return this.mode === RecordMode.REPLAYING;
  }

  /**
   * 当前是否处于空闲状态
   * 这个方法不在您原始 UML 图里，但实际项目里很常用
   * @returns {boolean}
   */
  isIdle() {
    return this.mode === RecordMode.IDLE;
  }

  /**
   * 当前是否存在可用录制片段
   * 条件：
   * 1. currentClip 不为 null
   * 2. currentClip 中至少有一帧数据
   * @returns {boolean}
   */
  hasClip() {
    return this.currentClip !== null && !this.currentClip.isEmpty();
  }

  /**
   * 新增内容————
   *
   * 状态机核心处理器：根据当前状态和输入条件，执行动作并转移状态
   * @param {string} trigger - 触发条件，例如 "PRESS_R" (按下R键) 或 "TIMEOUT" (时间到/播放完)
   * @param {number} [playerX=0] - 玩家当前 X 坐标（仅在从 IDLE 开始录制时需要）
   * @param {number} [playerY=0] - 玩家当前 Y 坐标（仅在从 IDLE 开始录制时需要）
   */
  handleStateTransition(trigger, playerX = 0, playerY = 0) {
    switch (this.mode) {
      
      // 状态 1：空闲状态 (IDLE)
      case RecordMode.IDLE:
        if (trigger === "PRESS_R") {
          // 动作：执行开始录制逻辑
          this.startRecording(playerX, playerY);
        }
        break;

      // 状态 2：录制状态 (RECORDING)
      case RecordMode.RECORDING:
        // 无论是时间到了，还是玩家主动按 R 键打断，都会结束录制并自动开始回放
        if (trigger === "TIMEOUT" || trigger === "PRESS_R") {
          // 动作 1：停止录制
          this.stopRecording();
          
          // 动作 2：自动尝试开始回放
          const canReplay = this.startReplay();
          
          if (!canReplay) {
            // 如果片段为空无法回放，直接退回空闲状态
            this.reset(); 
          }
        }
        break;

      // 状态 3：回放状态 (REPLAYING)
      case RecordMode.REPLAYING:
        // 如果录像播放完毕，或者玩家按 R 键强行打断回放
        if (trigger === "TIMEOUT" || trigger === "PRESS_R") {
          // 动作：重置整个录制系统
          this.reset();
          
          // 如果是按 R 键打断，可能玩家想立刻直接开始下一次录制
          if (trigger === "PRESS_R") {
             this.startRecording(playerX, playerY);
          }
        }
        break;
    }
  }
}

/*
RecordSystem 类是录制与回放模块的主控制器，
用于统一管理系统状态、当前录制片段以及录制/回放流程。
该类通过 mode 字段维护 IDLE、RECORDING 和 REPLAYING 三种运行状态，
并通过 currentClip 保存当前录制得到的 RecordClip 对象。
在录制阶段，startRecording() 负责初始化新的录制片段与起始时间，captureFrame() 用于逐帧写入 InputFrame，
并在超过最大录制时长后自动停止；
在回放阶段，startReplay() 负责进入回放模式，
updateReplay() 则按顺序逐帧返回应执行的输入数据。
除此之外，该类还提供了 interrupt()、reset()、isRecording()、isReplaying()、hasClip() 等辅助方法，
以支持更完整的游戏流程控制。
整体上，该类负责的是“录制/回放流程调度”，
而不直接处理角色移动、碰撞或物理计算，
这些行为会交由外部控制模块实现。
*/