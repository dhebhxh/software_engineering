/*
  录像与回放系统模块 (recording.js)
  职责：管理时间回溯机制的所有数据状态和核心启停逻辑
*/

// --- 录制系统核心数据 ---

// 数据仓库：用来按帧顺序存储分身的所有操作
let recordingData = [];

// 时间戳：记录按下“开始录制”那一刻的时间
let recordStartTime = 0;

// 指针/计数器：回放模式下，记录当前播放到第几帧
let replayIndex = 0;

// 录制时限：最长可以录制多久（10000 毫秒 = 10 秒）
let recordDuration = 10000;

// 坐标锚点：记录分身开始录制时的初始位置
let recordStartPosX = 0; 
let recordStartPosY = 0; 


// --- 录制系统核心行为 ---

// 开始录制
function startRecording() {
  levelState = 'RECORDING';
  recordingData = [];              // 清空旧数据
  recordStartTime = millis();      // 记录开始时间
  
  // 记录起点坐标，且不生成分身
  recordStartPosX = player.pos.x;
  recordStartPosY = player.pos.y;
  clone = null; 
}

// 开始回放
function startReplay() {
  levelState = 'REPLAYING';
  replayIndex = 0;                 
  
  // 红色分身凭空出现
  clone = new Character(recordStartPosX, recordStartPosY, color(255, 80, 80), "分身");
  clone.facingRight = player.facingRight;
}