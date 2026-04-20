/**
 * 关卡 UI 逻辑
 * 职责：绘制死亡界面、胜利界面以及游戏内的操作提示
 */

// 1. 绘制死亡界面
function drawDeadScreen() {
  // 半透明黑色遮罩，增加氛围
  fill(0, 0, 0, 150);
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 死亡文字
  textAlign(CENTER, CENTER);
  fill(255, 50, 50); // 红色
  textSize(40);
  textStyle(BOLD);
  text("SUBJECT TERMINATED", width / 2, height / 2 - 40);

  // 重试提示（呼吸灯效果）
  let pulse = 150 + sin(frameCount * 0.1) * 105;
  fill(255, 255, 255, pulse);
  textSize(20);
  text("Press 'C' to Restart the Loop", width / 2, height / 2 + 40);
}

// 2. 绘制胜利界面
function drawWinScreen() {
  // 半透明深蓝色遮罩
  fill(20, 40, 80, 180);
  rectMode(CORNER);
  rect(0, 0, width, height);

  // 胜利文字
  textAlign(CENTER, CENTER);
  fill(50, 255, 150); // 幽蓝色/绿色
  textSize(40);
  textStyle(BOLD);
  text("MISSION SUCCESSFUL", width / 2, height / 2 - 40);

  fill(255);
  textSize(20);
  text("You have escaped the sector.", width / 2, height / 2 + 20);
  
  // 提示下一步
  fill(200, 255, 200);
  textSize(18);
  text("Press 'C' to Return to Level Select", width / 2, height / 2 + 80);
}

// 3. 绘制游戏内基础 UI（如录制状态提示）
function drawUI() {
  push();
  textAlign(LEFT, TOP);
  textSize(16);
  noStroke();

  if (levelState === 'RECORDING') {
    // 录制闪烁红点
    if (frameCount % 60 < 30) {
      fill(255, 0, 0);
      ellipse(30, 30, 12, 12);
    }
    fill(255);
    text("RECORDING ECHO...", 50, 22);
  } else if (levelState === 'REPLAYING') {
    fill(100, 200, 255);
    text("ECHO MANIFESTED", 30, 22);
  } else {
    fill(200);
    text("Press 'R' to Record Shadow", 30, 22);
  }
  pop();
}