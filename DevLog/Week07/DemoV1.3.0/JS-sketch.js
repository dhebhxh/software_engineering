// JS-sketch.js（主控文件）

window.ST_STORY_CRAWL = "STORY_CRAWL";

function preload() {
  if (typeof preloadAssets === 'function') {
    preloadAssets();
  }
}

function setup() {
  createCanvas(960, 540);

  // UI 初始化（必须在 createCanvas 之后，才能拿到正确的 width/height）
  if (typeof initLevelUI === 'function') {
    initLevelUI();
  } else {
    console.error("找不到 initLevelUI，请检查 JS-levelChoose.js 加载路径");
  }
  if (typeof initUI === 'function') initUI();
  if (typeof initSetting === 'function') initSetting();
  if (typeof initCreditsUI === 'function') initCreditsUI();

  // 等待用户第一次点击页面后解锁音频（浏览器自动播放限制）
  // 解锁后立即初始化音量并播放菜单 BGM
  userStartAudio().then(() => {
    if (typeof initVolume === 'function') initVolume();
    if (typeof menuBGM !== 'undefined' && menuBGM) {
      changeBGM(menuBGM);
    }
  });
}

function draw() {
  background(0);

  if (typeof width === 'undefined' || typeof gameState === 'undefined') return;

  switch (gameState) {
    case "MENU":
      if (typeof drawMenu === 'function') drawMenu();
      break;
    case "LEVEL":
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
      break;
  }
}

// BGM 切换（停止当前 BGM，循环播放新 BGM）
function changeBGM(bgm) {
  if (currentBGM && typeof currentBGM.stop === 'function') {
    currentBGM.stop();
  }
  currentBGM = bgm;
  if (currentBGM && typeof currentBGM.loop === 'function') {
    currentBGM.loop();
  }
}
