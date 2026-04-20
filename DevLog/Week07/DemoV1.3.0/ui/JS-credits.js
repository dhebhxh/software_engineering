// ui/JS-credits.js（Credits页面专属）
/*
 Credits页面
 职责：仅处理Credits界面的绘制、返回按钮（自己写）、点击逻辑
*/

// 🔴 修复点1：确保变量定义语法正确（无多余逗号、括号）
// 1. 在最外面只声明变量名，不要在这里写 width 和 height
let creditsBackButton; 

// 2. 创建一个专门用来“填入数值”的函数
function initCreditsUI() {
  creditsBackButton = {
    x: width / 2,     // 此时 setup 已经运行，width 有值了
    y: height - 80,
    w: 120,
    h: 50,
    label: "BACK"
  };
}

// Credits界面绘制（自己写按钮）
function drawCredits() {
  // 背景
  background(20, 20, 40);
  
  // 绘制Credits文本
  fill(255, 200, 255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("CREDITS", width/2, height/2 - 100);
  
  textSize(18);
  fill(255);
  text("Game Developed By You", width/2, height/2 - 40);
  text("Art & Sound: Open Source Assets", width/2, height/2);
  text("Engine: p5.js", width/2, height/2 + 40);
  
  // 绘制返回按钮（修复fill语法错误）
let hovering = mouseX > creditsBackButton.x - creditsBackButton.w/2 && 
               mouseX < creditsBackButton.x + creditsBackButton.w/2 &&
               mouseY > creditsBackButton.y - creditsBackButton.h/2 && 
               mouseY < creditsBackButton.y + creditsBackButton.h/2;

// ✅ 修复后的fill语句（推荐写法1）
fill(hovering ? color(200, 80, 80) : color(150, 50, 50));
stroke(255);
strokeWeight(2);
rect(
  creditsBackButton.x, 
  creditsBackButton.y, 
  creditsBackButton.w, 
  creditsBackButton.h, 
  10
);

fill(255);
textSize(20);
text(creditsBackButton.label, creditsBackButton.x, creditsBackButton.y);
  
  // 绘制音量图标（确保drawSoundIcon函数已定义）
  if (typeof drawSoundIcon === 'function') { // 加容错，避免函数未定义报错
    drawSoundIcon();
  }
}

// 🔴 修复点4：补充Credits页面的点击逻辑（之前缺失，导致点击无响应）
function handleCreditsClick() {
  // 检测返回按钮点击
  let isBackClick = mouseX > creditsBackButton.x - creditsBackButton.w/2 && 
                    mouseX < creditsBackButton.x + creditsBackButton.w/2 &&
                    mouseY > creditsBackButton.y - creditsBackButton.h/2 && 
                    mouseY < creditsBackButton.y + creditsBackButton.h/2;
  
  if (isBackClick) {
    gameState = "MENU";
    changeBGM(menuBGM); // 切回菜单BGM
  }
  
  // 检测音量图标点击（复用全局逻辑）
  if (typeof handleSoundIconClick === 'function') {
    handleSoundIconClick();
  }
}