// 全局状态管理器

/*
游戏状态 & 全局数据（state.js）
职责：只放全局变量和状态机，不涉及任何画面渲染和逻辑处理
  1. game State 控制游戏大状态（菜单、游戏中、暂停、胜利等）
  2. level State 控制关卡小状态（第一关、第二关）
  3. 录制系统的变量控制录制/回放流程
*/

// --- 游戏状态 (新增 STORY_CRAWL) ---
const ST_STORY_CRAWL = "STORY_CRAWL"; // 新状态：故事滚动

// --- 游戏流程状态控制 ---

// 游戏全局状态机：控制当前处于哪个大界面
// 取值范围通常为: "MENU"(菜单), "LEVEL"(关卡选择), 
// "PLAYING"(游戏中), "SETTING"(设置), 以及新增的 "STORY_CRAWL"
// 修改现有的 gameState 初始值，让游戏一加载停留在主菜单
let gameState = "MENU";

// --- 故事滚动动画参数 (新增) ---
let crawlScrollY;              // 当前文字滚动的 Y 坐标
let crawlSpeed = 0.8;          // 滚动速度 (越小越慢)
let crawlFinished = false;     // 是否播放完毕

// --- 星球大战背景故事文本 (英文) ---
// 使用数组，每个元素是一行
const starWarsStory = [
  "",
  "U-HELP-U",
  "",
  "It is a dark time for Subject 42.",
  "Trapped within the sprawling,",
  "mechanical labyrinth of FACILITY ZERO,",
  "all hope of escape seems lost.",
  "The automated defenses are relentless,",
  "and the shifting walls offer no sanctuary.",
  "",
  "对于42号实验体，这是一个至暗时刻",
  "被困在庞大的，",
  "零号设施的机械迷宫中，",
  "没有任何逃生希望",
  "自动防御系统无情地运转",
  "移动的墙壁无法提供任何庇护",
  "",  
  "But in the depths of despair,",
  "a breakthrough occurred.",
  "A critical error in the facility’s core",
  "reactor initiated Project CHRONOS,",
  "granting Subject 42 a time-bending ability.",
  "He can now record his own actions and",
  "manifest a solid, physical echo",
  "of his past self.",
  "",  
  "但，绝望深渊之中，",
  "出现了突破。",
  "核心设施的一个漏洞，",
  "反应堆启动了‘时间计划’，",
  "赋予了42号实验体扭曲时间的能力",
  "现在，他可以记录自己的行动，",
  "并显现出一个实体分身，",
  "即他过去的自己",
  "",
  "This Phantom is no mere hologram.",
  "It perfectly replays every recorded",
  "step and jump, acting as a tangible",
  "force in the real world.",
  "Subject 42 must stand upon the shoulders",
  "of his past incarnation to reach impossible",
  "heights, and synchronize movements",
  "to trigger remote mechanisms.",
  "",
  "并非普通幻影，并非全息影像，",
  "它完美重现，每一次记录",
  "一步一步，一次一跃，如同一个有形的，",
  "现实世界的力量",
  "42号实验体必须站在，",
  "分身的肩膀上，达到那不可能的高度，",
  "同步动作，",
  "来触发远程装置",  
  "",
  "Now, navigating treacherous platforms",
  "the protagonist must cooperate across time.",
  "In this solitary prison, your only",
  "teammate is your past self.",
  "",
  "如今，前行在危机之中，",
  "主角必须跨时空合作。",
  "在这座孤寂的牢笼中，你唯一的队友，",
  "就是过去的自己",
  "",
  "Escape before the system terminates forever...",
  "",
  "请记住，在系统彻底崩溃之前，务必逃离……",
  "",
  "--- PRESS ENTER TO SKIP INTRODUCTION ---" 
];

// 关卡内部状态机：控制当前关卡的逻辑进程
// 'IDLE'(闲置/初始), 'RECORDING'(录制中), 'REPLAYING'(回放中), 
// 'WIN'(胜利), 'DEAD'(死亡)
let levelState = 'IDLE';

// 当前玩家所处的关卡索引（1 代表第一关）
let currentLevel = 1; 

// 音频系统变量：
// 当前游戏音量（0 - 100 之间），用于控制全局声音大小初始音量设定为 50%
let gameVolume = 50; 

// 缓存变量：
// 当玩家点击静音时，用它来保存静音前的音量，以便恢复；
// 记住静音前真实的音量大小
let savedVolume = 50; 

/**
 * 切换背景音乐的辅助函数
 * @param {p5.SoundFile} newBGM 要播放的新音乐
 */
function changeBGM(newBGM) {
  // 如果当前想播的音乐已经在播了，什么都不做
  if (currentBGM === newBGM && currentBGM.isPlaying()) {
    return; 
  }

  // 如果有其他音乐正在播，先把它停掉
  if (currentBGM && currentBGM.isPlaying()) {
    currentBGM.stop();
  }

  // 更新当前音乐并循环播放
  currentBGM = newBGM;
  currentBGM.loop(); // loop() 会让音乐播完后自动重头开始
}
