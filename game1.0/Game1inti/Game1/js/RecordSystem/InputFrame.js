// InputFrame.js
// --------------------------------------------------
// 表示“某一帧时刻，角色应执行的控制意图与动作”
// 注意：它记录的是逐帧控制意图，不是浏览器原始键盘事件。
// 这意味着它既可以来自玩家键盘，也可以来自 AI、脚本、回放系统。
// --------------------------------------------------

class InputFrame {
  /**
   * 创建一个新的逐帧控制意图对象
   *
   * @param {number} moveX
   * 水平移动意图：
   * -1 表示向左移动
   *  0 表示不进行水平移动
   *  1 表示向右移动
   *
   * @param {boolean} jumpPressed
   * 这一帧是否触发跳跃动作
   *
   * @param {boolean} facingRight
   * 这一帧角色是否应保持朝向右边
   * 这个字段很重要，因为当 moveX = 0 时，角色仍然可能需要保持上一次朝向
   *
   * @param {boolean} interactPressed
   * 这一帧是否触发交互动作（例如按钮、机关、开箱等）
   *
   * @param {boolean} useItemPressed
   * 这一帧是否触发使用道具动作（例如放炸弹、使用特殊物品）
   */
  constructor(
    moveX = 0, // 默认不水平移动
    jumpPressed = false,     // 默认这一帧不跳跃
    facingRight = true,      // 默认角色朝右
    interactPressed = false, // 默认这一帧不交互
    useItemPressed = false   // 默认这一帧不使用道具
  ) {
    /**
     * 水平移动意图: 保存水平移动意图到当前对象
     * 推荐只使用 -1 / 0 / 1
     * 这样最容易和角色控制器/移动逻辑对接
     * @type {number}
     */
    this.moveX = moveX;

    /**
     * 保存这一帧是否触发跳跃 (是否在这一帧按下跳跃)
     * @type {boolean}
     */
    this.jumpPressed = jumpPressed;

    /**
     * 保存角色朝向, 是否朝向右边
     * true  = 朝右
     * false = 朝左
     * 即使 moveX = 0（角色不移动），这个字段依然很有价值，
     * 因为待机、攻击、交互等动作往往仍然依赖角色朝向
     * @type {boolean}
     */
    this.facingRight = facingRight;

    /**
     * 保存这一帧是否触发交互动作
     * 例如按按钮、开门、开箱子、启动机关等
     * @type {boolean}
     */
    this.interactPressed = interactPressed;

    /**
     * 保存这一帧是否触发使用道具动作
     * 例如放炸弹、使用特殊物品、释放技能等
     * @type {boolean}
     */
    this.useItemPressed = useItemPressed;
  }

  /**
   * 复制当InputFrame前帧对象，
   * 避免共享同一引用
   * （返回一个内容相同但引用独立的新对象）
   * 
   * @returns {InputFrame} 一个新的 InputFrame 副本
   * 
   * 这样做的意义/好处：
   * 1. 录制系统保存的是独立快照，不会被后续修改影响
   * （录制进去的数据不会被外部后续修改污染）
   * 2. 回放系统读取到的每一帧数据是稳定的
   * （回放时拿到的是一个独立快照）
   *
   * @returns {InputFrame}
   */
  copy() {
    return new InputFrame(
      this.moveX, // 复制当前对象的水平移动意图
      this.jumpPressed, // 跳跃状态
      this.facingRight, // 朝向
      this.interactPressed, // 交互状态
      this.useItemPressed // 道具使用状态
    );
  }

  /**
   * 静态工具方法：把一个普通对象转换成 InputFrame 实例
   * 
   * 方便未来和其他模块对接，例如：
   * - 某个控制器 CharacterController 输出普通 action 对象
   * - UI 或脚本系统生成控制意图对象
   * - 回放系统读出 JSON 数据后再转为 InputFrame
   *
   * @param {Object} obj 普通对象
   * @returns {InputFrame} 转换得到的 InputFrame 实例
   */
  static fromObject(obj = {}) {
    return new InputFrame(
      obj.moveX ?? 0,               // 如果 obj.moveX 存在，就用它；否则默认 0
      obj.jumpPressed ?? false,     // 如果提供了 jumpPressed 就用，否则默认 false
      obj.facingRight ?? true,      // 如果提供了 facingRight 就用，否则默认 true
      obj.interactPressed ?? false, // 如果提供了 interactPressed 就用，否则默认 false
      obj.useItemPressed ?? false   // 如果提供了 useItemPressed 就用，否则默认 false
    );
  }

  /**
   * 工具方法：把当前帧导出为普通对象
   * （把当前 InputFrame 导出为普通对象）
   * 方便调试、序列化、保存录像数据、打印输出日志
   *
   * @returns {Object} 普通 JavaScript 对象
   */
  toObject() {
    return {
      moveX: this.moveX,                     // 导出水平移动意图
      jumpPressed: this.jumpPressed,         // 导出跳跃状态
      facingRight: this.facingRight,         // 导出角色朝向
      interactPressed: this.interactPressed, // 导出交互状态
      useItemPressed: this.useItemPressed    // 导出使用道具状态
    };
  }
}

/*
InputFrame 类用于封装游戏中某一帧的角色输入意图。
它并不直接记录浏览器原始键盘事件，
而是将输入抽象为更适合角色控制的动作数据，
例如水平移动、跳跃、交互、道具使用以及角色朝向。
这样做能够将输入层与角色行为层解耦，
便于实现玩家控制、AI 控制、脚本驱动以及录制/回放系统之间的统一接口。
同时，该类还提供了 copy() 方法用于生成独立快照，
以及 fromObject() 和 toObject() 方法用于与普通对象进行双向转换，
从而方便调试、序列化和跨模块对接。
*/
