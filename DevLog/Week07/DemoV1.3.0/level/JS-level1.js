// JS-level1.js
// 职责：关卡1 的地形数据 + 渲染循环

// ============================================================
// 关卡1 布局常量
// ============================================================
const L1_GROUND_Y   = 500;  // 地面顶部 Y（canvas 高 540）
const L1_GROUND_H   = 40;   // 地面厚度
const L1_PLATFORM_X = 380;  // 悬空平台 X
const L1_PLATFORM_Y = 360;  // 悬空平台 Y
const L1_PLATFORM_W = 180;  // 悬空平台宽
const L1_PLATFORM_H = 20;   // 悬空平台厚
const L1_GOAL_SIZE  = 50;   // 终点门边长（正方形）
const L1_GOAL_X     = 450;  // 终点门 X（平台中央）
// 终点门紧贴平台顶部：平台Y - 门的高度
const L1_GOAL_Y     = L1_PLATFORM_Y - L1_GOAL_SIZE;

// ============================================================
// loadLevel1()
// ============================================================
function loadLevel1() {
  levelState    = 'IDLE';
  recordingData = [];
  replayIndex   = 0;
  floors        = [];
  goals         = [];

  player = new Character(60, L1_GROUND_Y - 30, color(50, 100, 255), "主角");
  clone  = null;

  // 地面（全宽）
  floors.push(new Ground(0, L1_GROUND_Y, width, L1_GROUND_H));

  // 悬空平台
  floors.push(new Platform(L1_PLATFORM_X, L1_PLATFORM_Y, L1_PLATFORM_W, L1_PLATFORM_H));

  // 终点门（坐落在平台上方，紧贴平台顶部）
  goals.push(new GoalDoor(L1_GOAL_X, L1_GOAL_Y, L1_GOAL_SIZE));
}

// ============================================================
// drawPlaying()
// ============================================================
function drawPlaying() {

  // 1. 背景
  if (bgImage_level1) {
    image(bgImage_level1, 0, 0, width, height);
  } else {
    background(30, 30, 40);
  }

  // 2. 地面与平台
  for (let f of floors) f.show();

  // 3. 终点门
  for (let g of goals) {
    g.update(player);
    g.show();
  }

  // 4. 胜负判定 & 角色渲染
  if (levelState === 'DEAD') {
    player.show();
    if (clone) clone.show();
    drawDeadScreen();
  } else if (levelState === 'WIN') {
    player.show();
    if (clone) clone.show();
    drawWinScreen();
  } else {
    runGameLogic();
  }

  // 5. HUD
  if (levelState !== 'WIN' && levelState !== 'DEAD') {
    drawUI();
  }

  rectMode(CORNER);
}