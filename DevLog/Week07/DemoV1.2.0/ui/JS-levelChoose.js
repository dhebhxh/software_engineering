// ui/JS-level.js
let levelButtons; // 仅声明，不在此赋值
let backButtonInLevel;

function initLevelUI() {
  // 在这里使用 width/height 是安全的，因为此函数在 setup 中调用
  levelButtons = [
    { id: 1, label: "LEVEL 1", x: 145, y: height / 2-20, w: 57, h: 32 },
    { id: 2, label: "LEVEL 2", x: 313, y: height / 2-20, w: 57, h: 32 },
    { id: 3, label: "LEVEL 3", x: 483, y: height / 2-20, w: 56, h: 32 }
  ];
  
  backButtonInLevel = { 
    x: width / 2,       
    y: height - 5,     
    diameter: 68,       
    label: "BACK" 
  };
  drawLevelBackButtonInLevel();
}

function drawLevel() {
  image(bgImage_levelChoose, 0, 0, width, height);
  
  push();
  rectMode(CENTER); 
  
  for (let btn of levelButtons) {
    let hovering = mouseX > btn.x - btn.w / 2 && mouseX < btn.x + btn.w / 2 &&
                   mouseY > btn.y - btn.h / 2 && mouseY < btn.y + btn.h / 2;

    if (hovering) {
      fill(255, 255, 255, 80);      
        noStroke();
      rect(btn.x, btn.y, btn.w, btn.h, 10);
    }
  }

  pop();
  drawLevelBackButtonInLevel();
}

function drawLevelBackButtonInLevel() {
  if (!backButtonInLevel) return; // 安全校验
  let btn = backButtonInLevel;
  
  // 圆形悬停判定（用diameter，不是w/h）
  let dx = mouseX - btn.x;
  let dy = mouseY - btn.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let hovering = distance < btn.diameter / 2; 
  
  // 绘制按钮背景（悬停半透明白色，非悬停透明）
  fill(hovering ? color(255, 255, 255, 40) : color(150, 50, 50, 0));
  noStroke();
  ellipse(btn.x, btn.y, btn.diameter);
  
  // 统一处理文字样式：根据悬停状态切换描边
  fill(128, 0, 128);       // 文字颜色固定为紫色
  stroke(hovering ? 255 : 0); // 悬停白描边，非悬停黑描边
  strokeWeight(1.2);       // 描边宽度固定
  textSize(16);
  textAlign(CENTER, CENTER);
  text(btn.label, btn.x, btn.y - 13); // 文字上移13像素
}

// 拆分1：仅处理关卡按钮点击
function handleLevelButtonClick() {
  if (!levelButtons) return;
  
  for (let btn of levelButtons) {
    if (btn.disabled) continue;
    let isClick = mouseX > btn.x - btn.w / 2 && mouseX < btn.x + btn.w / 2 &&
                  mouseY > btn.y - btn.h / 2 && mouseY < btn.y + btn.h / 2;
    if (isClick) {
      currentLevel = btn.id;
      loadLevel(currentLevel); 
      gameState = "PLAYING";
      if (currentBGM) currentBGM.stop();
      changeBGM(eval('level' + currentLevel + 'BGM'));
    }
  }
}

// 拆分2：仅处理返回按钮点击（修复核心bug：用圆形判定）
function handleBackButtonClickInLevel() {
  
  // 1. 只要进了这个函数，控制台必然会出这一行
  console.log("!!! 触发了返回点击检测 !!! 当前状态:", gameState);

  if (!backButtonInLevel) return;

  let dx = mouseX - backButtonInLevel.x;
  let dy = mouseY - backButtonInLevel.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < backButtonInLevel.diameter / 2) {
    console.log(">>> 判定成功：点中了圆圈！");
    gameState = "MENU";
  } else {
    console.log(">>> 判定失败：点在圆圈外面了。距离是:", distance);
  }
}

// 保留原函数（兼容你之前的调用，内部调用拆分后的函数）
function handleLevelClick() {
  handleLevelButtonClick(); // 处理关卡选择
  handleBackButtonClickInLevel();  // 处理返回按钮
}