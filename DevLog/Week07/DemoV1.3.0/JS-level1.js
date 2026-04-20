// JS-level1.js
// ==========================================
// 关卡1定义文件
// 仅负责：
// 1. 关卡1初始化
// 2. 关卡1渲染
// 不处理状态机，不做多关卡判断
// ==========================================


// ==========================================
// 关卡1加载
// ==========================================
function loadLevel1() {

  levelState = 'IDLE';
  recordingData = [];
  replayIndex = 0;

  floors = [];
  buttons = [];
  spikes = [];
  portals = [];

  player = new Character(50, 350, color(50, 100, 255), "主角");
  clone = null;

  // 地面
  floors.push(new Platform(0, height - 40, 250, 40));
  floors.push(new Platform(450, height - 40, 350, 40));
  floors.push(new Platform(250, height - 10, 200, 10, color(50, 30, 10)));

  // 平台
  floors.push(new Platform(50, 250, 100, 20));
  floors.push(new Platform(200, 350, 60, 20));
  floors.push(new Platform(320, 280, 60, 20));
  floors.push(new Platform(550, 300, 100, 20));
  floors.push(new Platform(700, 180, 80, 20));

  // 刺
  spikes.push(new Spike(250, height, 200));

  // 按钮
  buttons.push(new Button(80, 250 - 10));
  buttons.push(new Button(600, height - 40 - 10));

  // 传送门
  portals.push(new Portal(720, 120, 40, 60));
}


// ==========================================
// 关卡1渲染与运行
// ==========================================
function drawLevel1() {
  // 临时修复：先加基础背景色，避免全黑（注释原背景图，排查加载问题）
  background(100, 100, 150); // 浅紫色背景，替代全黑
  // image(bgImage_level1, 0, 0, width, height); // 先注释，后续排查

  // 安全校验：确保数组存在，避免遍历空数组报错
  if (floors && floors.length > 0) {
    for (let f of floors) {
      if (f && typeof f.show === 'function') f.show();
    }
  }
  if (spikes && spikes.length > 0) {
    for (let s of spikes) {
      if (s && typeof s.show === 'function') s.show();
    }
  }

  let characters = clone ? [player, clone] : [player];

  if (buttons && buttons.length > 0) {
    for (let btn of buttons) {
      if (btn && typeof btn.update === 'function') btn.update(characters);
      if (btn && typeof btn.show === 'function') btn.show();
    }
  }

  if (portals && portals.length > 0) {
    for (let p of portals) {
      if (p && typeof p.update === 'function') p.update(player, buttons);
      if (p && typeof p.show === 'function') p.show();
    }
  }

  // 胜负判定（加安全校验）
  if (typeof levelState !== 'undefined' && levelState !== 'DEAD' && levelState !== 'WIN') {
    // 先确保checkSpikeCollision函数存在
    if (typeof checkSpikeCollision === 'function') {
      if (checkSpikeCollision(player) || (clone && checkSpikeCollision(clone))) {
        levelState = 'DEAD';
      }
    }
  }

  if (levelState === 'DEAD') {
    if (player && typeof player.show === 'function') player.show();
    if (clone && typeof clone.show === 'function') clone.show();
    // 临时注释，排查drawDeadScreen是否报错
    // drawDeadScreen();

  } else if (levelState === 'WIN') {
    if (player && typeof player.show === 'function') player.show();
    if (clone && typeof clone.show === 'function') clone.show();
    // 临时注释，排查drawWinScreen是否报错
    // drawWinScreen();

  } else {
    // 临时注释，排查runGameLogic是否报错
    // runGameLogic();
    // 手动绘制玩家，确保能看到主角
    if (player && typeof player.show === 'function') player.show();
  }

  if (levelState !== 'WIN' && levelState !== 'DEAD') {
    // 临时注释，排查drawUI是否报错
    // drawUI();
  }

  rectMode(CENTER);
}