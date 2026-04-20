// RecordClip.js
// --------------------------------------------------
// 表示“一次完整录制”的数据集合
// 它会把很多个 InputFrame 按顺序保存起来，形成一段可回放的输入记录。
// 它不仅保存逐帧控制意图数组，还保存：
// - 录制起点（角色的初始位置）
// - 录制时长（总时长）
// - 一些便于外部读取的工具方法
// --------------------------------------------------

class RecordClip {
  /**
   * 构造函数：创建一个新的录制片段对象
   * 
   * @param {number} startX - 录制开始时角色的初始 X 坐标
   * @param {number} startY - 录制起点 Y
   */
  constructor(startX = 0, startY = 0) {
    /**
     * 当前录制片段包含的所有逐帧控制意图
     * （用数组保存整段录制中的所有帧数据）
     * 数组中的每一个元素都应是是一个 InputFrame 实例
     * @type {InputFrame[]}
     */
    this.frames = [];

    /**
     * 本次录制起点 X
     * 回放时分身 / 回放角色通常应从这里开始
     * @type {number}
     */
    this.startX = startX;

    /**
     * 本次录制起点 Y
     * @type {number}
     */
    this.startY = startY;

    /**
     * 本次录制持续了多少毫秒
     * @type {number}
     */
    this.durationMs = 0; // 刚创建时还没有真正录制内容，因此初始值为 0
  }

  /**
   * 向当前录制片段 clip 中加入一帧控制意图（输入数据）
   *
   * @param {InputFrame} frame 一帧输入数据，必须是 InputFrame 实例
   */
  addFrame(frame) { 
    // 核心方法1：压入新的帧数据。
    // 先检查传入的对象是否真的是 InputFrame 类型
    // 如果不是，说明调用方传错了数据，直接抛出错误
    if (!(frame instanceof InputFrame)) {
      throw new Error("RecordClip.addFrame(frame): frame 必须是 InputFrame 实例");
    }
    /**
     * 注意：
     * 当前文件本身没有展示 InputFrame 的导入语句。
     * 在实际项目里，通常还需要根据项目写法补上类似内容，
     * 例如：（具体写法取决于项目模块系统）
     * import InputFrame from "./InputFrame.js";
     * 或者如果项目不是 ES Module，而是浏览器全局脚本加载方式，
     * 那就需要保证 InputFrame 在 RecordClip.js 执行前已经存在于全局作用域。
     * 这一点在代码对接时要特别注意。
     * */

    // 存入副本，避免外部继续修改 frame 时污染 clip 数据
    // 不直接保存原对象，而是保存它的副本
    // 这样可以避免外部后续修改 frame 时，污染已经录进去的历史帧数据
    this.frames.push(frame.copy());
  }

  /**
   * 按索引取出一帧数据
   *
   * @param {number} index 要读取的帧下标
   * index 是数组位置编号：
   * 0 表示第一帧
   * 1 表示第二帧
   * 2 表示第三帧
   *
   * @returns {InputFrame|null} 如果索引有效，返回对应帧；否则返回 null
   */
  getFrame(index) { 
    // 核心方法2：检索特定时间点的操作。
    // 如果索引越界（小于 0，或者超出数组范围），返回 null
    if (index < 0 || index >= this.frames.length) {
      return null;
    }
    // 如果索引合法，则返回对应位置的帧对象
    return this.frames[index];
  }

  /**
   * 判断当前 clip 是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return this.frames.length === 0;
  }

  /**
   * 清空当前 clip 中保存的所有帧
   * 注意：
   * 这里保留起点坐标，但清空帧数据和时长
   * 如果您想连起点也清掉，可以在 reset() 里另做处理
   */
  clear() { 
    // 核心方法3：重置内存，准备下一次录制。
    this.frames = []; // 重置帧数组，删除所有已录制的帧
    this.durationMs = 0; // 同时将录制时长重置为 0
  }

  /**
   * 返回当前录制片段 clip 中共有多少帧
   * @returns {number} 当前帧总数
   */
  size() {
    // 数组长度就是当前总帧数
    return this.frames.length;
  }

  /**
   * 返回回放起始位置
   * 方便外部角色生成分身时直接读取
   * @returns {{x:number, y:number}}
   */
  getStartPosition() {
    return {
      x: this.startX,
      y: this.startY
    };
  }
}

/*
RecordClip 类用于表示一次完整的输入录制片段。
它内部通过 frames 数组按顺序保存多个 InputFrame 对象，从而形成一段可供回放的逐帧输入记录。
同时，该类还记录录制开始时角色的初始位置 startX 和 startY，以及录制持续时间 durationMs。
在实现中，addFrame() 方法会先检查传入对象是否为 InputFrame 实例，再通过 copy() 保存其副本，以避免外部引用变化污染已录制数据；
getFrame() 用于安全地按索引读取某一帧；
clear() 可清空所有录制内容；
size() 用于返回当前片段中的总帧数。
整体上，该类承担了“管理整段录制数据”的职责，是录制/回放系统中的核心容器之一。
*/