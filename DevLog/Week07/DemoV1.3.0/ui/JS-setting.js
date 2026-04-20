// ui/JS-setting.js
/*
 设置页面
 核心修正：移除重复的gameVolume声明，使用window.gameVolume
*/

// 设置页面按钮配置
let settingButtons = {
  back: { x: 0, y: 0, w: 120, h: 50, label: "BACK" },
  mute: { x: 0, y: 0, w: 60, h: 60, label: "🔊" }
};

// 音量滑块配置
let volumeSlider = {
  x: 0, y: 0, w: 200, h: 20, knobX: 0
};

// 初始化设置页面（延迟使用width/height）
function initSetting() {
  if (typeof width === 'undefined' || typeof height === 'undefined') return;
  
  // 使用全局的gameVolume，不再重复声明
  volumeSlider.x = width/2 - 100;
  volumeSlider.y = height/2;
  volumeSlider.knobX = map(window.gameVolume, 0, 100, volumeSlider.x, volumeSlider.x + volumeSlider.w);
  
  settingButtons.back.x = width/2;
  settingButtons.back.y = height - 80;
  settingButtons.mute.x = width/2 + 100;
  settingButtons.mute.y = height/2;
  settingButtons.mute.label = window.gameVolume === 0 ? "🔇" : "🔊";
}

// 设置界面绘制（修正fill里的三元运算符）
function drawSetting() {
  if (typeof width === 'undefined' || typeof height === 'undefined') return;
  
  // 背景
  background(40, 40, 60);
  
  // 绘制音量标题
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("VOLUME", width/2, height/2 - 60);
  
  // 绘制音量滑块
  fill(80);
  rect(volumeSlider.x, volumeSlider.y, volumeSlider.w, volumeSlider.h, 10);
  fill(150, 100, 255);
  rect(volumeSlider.knobX - 5, volumeSlider.y - 5, 30, 30, 15);
  
  // 绘制静音按钮（修正hover判断）
  let muteBtn = settingButtons.mute;
  let muteHover = mouseX > muteBtn.x - muteBtn.w/2 && mouseX < muteBtn.x + muteBtn.w/2 &&
                  mouseY > muteBtn.y - muteBtn.h/2 && mouseY < muteBtn.y + muteBtn.h/2;
  // 修正：用color()包裹三元运算符
  fill(muteHover ? color(100, 100, 150) : color(80, 80, 120));
  stroke(255);
  strokeWeight(2);
  ellipse(muteBtn.x, muteBtn.y, muteBtn.w);
  fill(255);
  textSize(24);
  text(muteBtn.label, muteBtn.x, muteBtn.y);
  
  // 绘制返回按钮（修正fill）
  let backBtn = settingButtons.back;
  let backHover = mouseX > backBtn.x - backBtn.w/2 && mouseX < backBtn.x + backBtn.w/2 &&
                  mouseY > backBtn.y - backBtn.h/2 && mouseY < backBtn.y + backBtn.h/2;
  fill(backHover ? color(200, 80, 80) : color(150, 50, 50));
  stroke(255);
  strokeWeight(2);
  rect(backBtn.x, backBtn.y, backBtn.w, backBtn.h, 10);
  fill(255);
  textSize(20);
  text(backBtn.label, backBtn.x, backBtn.y);
  
  // 绘制音量图标
  if (typeof drawSoundIcon === 'function') drawSoundIcon();
}

// 设置页面拖拽逻辑
function handleSettingDrag() {
  if (typeof width === 'undefined' || typeof height === 'undefined') return;
  
  if (mouseX > volumeSlider.x && mouseX < volumeSlider.x + volumeSlider.w &&
      mouseY > volumeSlider.y - 30 && mouseY < volumeSlider.y + 30) {
    volumeSlider.knobX = constrain(mouseX, volumeSlider.x, volumeSlider.x + volumeSlider.w);
    window.gameVolume = map(volumeSlider.knobX, volumeSlider.x, volumeSlider.x + volumeSlider.w, 0, 100);
    outputVolume(window.gameVolume / 100);
    settingButtons.mute.label = window.gameVolume === 0 ? "🔇" : "🔊";
  }
}

// 设置页面点击逻辑
function handleSettingClick() {
  // 静音按钮点击
  let muteBtn = settingButtons.mute;
  let isMuteClick = mouseX > muteBtn.x - muteBtn.w/2 && mouseX < muteBtn.x + muteBtn.w/2 &&
                  mouseY > muteBtn.y - muteBtn.h/2 && mouseY < muteBtn.y + muteBtn.h/2;
  if (isMuteClick) {
    if (window.gameVolume > 0) {
      window.savedVolume = window.gameVolume;
      window.gameVolume = 0;
    } else {
      window.gameVolume = window.savedVolume;
    }
    outputVolume(window.gameVolume / 100);
    volumeSlider.knobX = map(window.gameVolume, 0, 100, volumeSlider.x, volumeSlider.x + volumeSlider.w);
    settingButtons.mute.label = window.gameVolume === 0 ? "🔇" : "🔊";
  }

  // 返回按钮点击
  let backBtn = settingButtons.back;
  let isBackClick = mouseX > backBtn.x - backBtn.w/2 && mouseX < backBtn.x + backBtn.w/2 &&
                  mouseY > backBtn.y - backBtn.h/2 && mouseY < backBtn.y + backBtn.h/2;
  if (isBackClick) {
    gameState = "MENU";
    if (typeof changeBGM === 'function') changeBGM(menuBGM);
  }
}

// 返回按钮通用逻辑（避免重复）
function handleBackButtonClick() {
  if (gameState === "SETTING") {
    gameState = "MENU";
    if (typeof changeBGM === 'function') changeBGM(menuBGM);
  } else if (gameState === "CREDITS") {
    gameState = "MENU";
    if (typeof changeBGM === 'function') changeBGM(menuBGM);
  }
}