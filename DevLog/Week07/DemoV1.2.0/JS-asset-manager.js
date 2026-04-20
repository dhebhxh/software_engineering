/*
 资源管理模块
 职责：素材加载、BGM切换、音量管理
 核心规则：
  1. 适配实际项目路径（素材在 assets/ 层级下分类存放）
  2. 加加载容错，避免单个素材失败导致整个游戏卡住
  3. 所有素材变量仅在此声明，其他模块直接使用
*/

// --- 素材变量（仅在此声明，全局共享）---
let bgImage_level1;
let bgImage_menu;
let bgImage_levelChoose;
let menuBGM;
let level1BGM;
let level2BGM; // 预留：关卡2BGM
let level3BGM; // 预留：关卡3BGM
let customFont;

// ==========================================
// 素材预加载（适配实际目录结构：assets/ 层级）
// ==========================================
function preloadAssets() {
  // 🌟 关键：适配你的实际路径：
  // 图片：assets/images/bg/xxx.png
  // 音频：assets/audio/xxx.mp3
  // 字体：assets/fonts/xxx.ttf

  // 图片加载（加容错：加载失败时控制台提示，不卡死游戏）
  try {
    bgImage_level1 = loadImage('assets/images/bg/level1.png', 
      () => console.log('关卡1背景加载成功'), 
      (err) => console.warn('关卡1背景加载失败：', err)
    );
    bgImage_menu = loadImage('assets/images/bg/menu.png',
      () => console.log('菜单背景加载成功'),
      (err) => console.warn('菜单背景加载失败：', err)
    );
    bgImage_levelChoose = loadImage('assets/images/bg/levelChoose.png',
      () => console.log('关卡选择背景加载成功'),
      (err) => console.warn('关卡选择背景加载失败：', err)
    );
  } catch (e) {
    console.error('图片加载异常：', e);
  }

  // 音频加载（适配实际路径：assets/audio/xxx.mp3）
  try {
    menuBGM = loadSound('assets/audio/menu.mp3',
      () => console.log('菜单BGM加载成功'),
      (err) => console.warn('菜单BGM加载失败：', err)
    );
    level1BGM = loadSound('assets/audio/level1.mp3',
      () => console.log('关卡1BGM加载成功'),
      (err) => console.warn('关卡1BGM加载失败：', err)
    );
    // 关卡2/3BGM（有素材时取消注释，路径同理）
    // level2BGM = loadSound('assets/audio/level2.mp3');
    // level3BGM = loadSound('assets/audio/level3.mp3');
  } catch (e) {
    console.error('音频加载异常：', e);
  }

  // 字体加载（加容错，避免OpenType错误卡死，路径：assets/fonts/xxx.ttf）
  try {
    customFont = loadFont('assets/fonts/HYPixel11pxU-2.ttf',
      () => console.log('自定义字体加载成功'),
      (err) => {
        console.warn('自定义字体加载失败，使用默认字体：', err);
        customFont = null; // 加载失败时置空，后续用默认字体
      }
    );
  } catch (e) {
    console.error('字体加载异常：', e);
    customFont = null;
  }
}

// ==========================================
// 音量初始化（适配全局音量变量）
// ==========================================
function initVolume() {
  // 加容错：避免 gameVolume 未定义
  const volume = typeof gameVolume === 'number' ? gameVolume / 100 : 0.5;
  outputVolume(volume);
  console.log('音量初始化完成：', volume);
}

// ==========================================
// BGM切换逻辑（从JS-state.js迁移，加容错）
// ==========================================
function changeBGM(newBGM) {
  // 容错1：newBGM 不存在时直接返回
  if (!newBGM) {
    console.warn('切换BGM失败：目标BGM不存在');
    return;
  }

  // 容错2：当前BGM未定义时跳过停止逻辑
  if (currentBGM && typeof currentBGM.stop === 'function') {
    if (currentBGM.isPlaying()) {
      currentBGM.stop();
    }
  }

  // 切换并循环播放新BGM
  currentBGM = newBGM;
  if (typeof currentBGM.loop === 'function') {
    currentBGM.loop();
    console.log('BGM切换成功：', newBGM);
  } else {
    console.warn('BGM播放失败：无loop方法');
  }
}