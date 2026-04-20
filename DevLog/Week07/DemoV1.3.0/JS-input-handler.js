// JS-input-handler.js
/*
 输入管理模块
 核心修正：1. 移除重复的ST_STORY_CRAWL声明 2. 延迟使用width/height
*/

// ==========================================
// 鼠标点击处理（原mousePressed函数移到这里）
// ==========================================
function handleMousePressed() {
  // 先判断gameState存在
  if (typeof gameState === 'undefined') return;

  // 1. 音量图标点击（仅非游玩状态）- 加容错
  if (gameState !== "PLAYING") {
    if (typeof handleSoundIconClick === 'function') {
      handleSoundIconClick();
    }
  }

  // 2. 按游戏状态调度对应点击逻辑
  switch (gameState) {
    case "MENU":         
      if (typeof handleMenuClick === 'function') handleMenuClick();
      break;
case "LEVEL":        // 确保包含这个名字     
      if (typeof handleLevelClick === 'function') handleLevelClick();
      break;
    case "SETTING":      
      if (typeof handleBackButtonClick === 'function') handleBackButtonClick();
      break;
    case "CREDITS":      
      if (typeof handleBackButtonClick === 'function') handleBackButtonClick();
      break;
    default:
      break;
  }
}

// ==========================================
// 鼠标拖拽处理（原mouseDragged函数移到这里）
// ==========================================
function handleMouseDragged() {
  if (typeof gameState === 'undefined') return;
  
  if (gameState === "SETTING") {
    if (typeof handleSettingDrag === 'function') handleSettingDrag();
  }
}

// ==========================================
// 键盘输入处理（原keyPressed函数移到这里）
// ==========================================
function handleKeyPressed() {
  if (typeof gameState === 'undefined' || typeof key === 'undefined') return;

  // 1. 故事滚动界面：按Enter跳过（使用全局的ST_STORY_CRAWL）
  if (gameState === window.ST_STORY_CRAWL) {
    if (key === 'Enter') {
      if (typeof crawlFinished !== 'undefined') crawlFinished = true;
      gameState = "LEVEL";
    }
    return;
  }

  // 2. 菜单界面：按Enter等同于点击PLAY
  if (gameState === "MENU") {
    if (key === 'Enter') {
      gameState = window.ST_STORY_CRAWL;
      // 延迟使用height（p5 setup后才存在）
      if (typeof height !== 'undefined') crawlScrollY = height;
      if (typeof crawlFinished !== 'undefined') crawlFinished = false;
      // 停止BGM
      if (typeof currentBGM !== 'undefined' && currentBGM && typeof currentBGM.stop === 'function') {
        currentBGM.stop();
      }
    }
    return;
  }

  // 3. 仅游玩状态响应后续按键
  if (gameState !== "PLAYING") return;

  // 4. 结算界面重试
  if (typeof levelState !== 'undefined' && (levelState === 'WIN' || levelState === 'DEAD')) {
    if (key === 'c' || key === 'C') {
      if (typeof loadLevel === 'function' && typeof currentLevel !== 'undefined') {
        loadLevel(currentLevel);
      }
    }
    return;
  }

  // 5. 录制/回放逻辑
  if (key === 'r' || key === 'R') {
    if (typeof levelState !== 'undefined') {
      if (levelState === 'IDLE' && typeof startRecording === 'function') {
        startRecording();
      } else if (levelState === 'RECORDING' && typeof startReplay === 'function') {
        startReplay();
      }
    }
  }

  // 6. 玩家跳跃
  if (key === ' ' || key === 'w' || key === 'W') {
    if (typeof player !== 'undefined' && player && player.onGround) {
      if (typeof player.jump === 'function') player.jump();
    }
  }
}

// ==========================================
// 绑定p5.js原生输入事件
// ==========================================
function mousePressed() {
  handleMousePressed();
}

function mouseDragged() {
  handleMouseDragged();
}

function keyPressed() {
  handleKeyPressed();
}