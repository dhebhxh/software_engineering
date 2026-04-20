// JS-sketch.js（主控文件）

// 1. 确保全局常量正确引用
window.ST_STORY_CRAWL = "STORY_CRAWL"; 

function preload() {
  // 仅在素材管理函数存在时调用
  if (typeof preloadAssets === 'function') {
    preloadAssets(); 
  }
}

function setup() {
  // 2. 必须先创建画布，后续 UI 初始化才能获得正确的 width/height
  createCanvas(960, 540); 
  
  // 3. 初始化关卡 UI 坐标
  // 注意：如果点击不灵敏，请去 ui/JS-level.js 把 backButton.y 改为 height - 50
  if (typeof initLevelUI === 'function') {
    initLevelUI();
    console.log("Level UI 成功初始化");
  } else {
    console.error("找不到 initLevelUI 函数，请检查 JS-level.js 文件加载路径是否正确");
  }
  
  // 4. 初始化其他界面组件
  if (typeof initUI === 'function') initUI();
  if (typeof initSetting === 'function') initSetting();
  if (typeof initCreditsUI === 'function') initCreditsUI();
  
  // 5. 加载初始关卡数据（默认加载第一关）
  if (typeof loadLevel === 'function') {
    loadLevel(1);
  }
}

function draw() {
  background(0);
  
  // 安全校验：确保 p5 核心变量已就绪
  if (typeof width === 'undefined' || typeof gameState === 'undefined') return;

  // 6. 根据 gameState 调度渲染逻辑
  switch (gameState) {
    case "MENU":
      if (typeof drawMenu === 'function') drawMenu();
      break;
      
    case "LEVEL": // 核心：状态名必须与 input-handler 里的 case "LEVEL" 严格一致
      if (typeof drawLevel === 'function') drawLevel();
      break;
      
    case "SETTING":
      if (typeof drawSetting === 'function') drawSetting();
      break;
      
    case "CREDITS":
      if (typeof drawCredits === 'function') drawCredits();
      break;
      
    case window.ST_STORY_CRAWL:
      if (typeof drawStoryCrawl === 'function') drawStoryCrawl();
      break;
      
    case "PLAYING":
      if (typeof drawPlaying === 'function') drawPlaying();
      break;
      
    default:
      // 如果处于未知状态，可以加一个默认背景或提示
      break;
  }
}

/**
 * 全局 BGM 切换函数
 * 负责停止当前音乐并循环播放新音乐
 */
function changeBGM(bgm) {
  if (currentBGM && typeof currentBGM.stop === 'function') {
    currentBGM.stop();
  }
  
  currentBGM = bgm;
  
  if (currentBGM && typeof currentBGM.loop === 'function') {
    currentBGM.loop();
  }
}