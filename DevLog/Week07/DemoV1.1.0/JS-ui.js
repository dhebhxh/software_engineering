/*
 UI 模块 

 这里只处理与“界面元素”有关的内容，
 例如UI画面绘制与鼠标事件等，
 去掉了游戏控制和物理操作。
 
  1. 开始界面/按钮，菜单，设置按钮，暂停按钮，音量按钮，关卡选择，设置......
  2. 监听用户输入事件
  3. 和其他模块通信，调用其他模块提供的功能，比如暂停，重新开始
 */

// --- 全局 UI 变量 ---
let menuButtons = [];
let levelButtons = [];
let levelSettingBtn;
let backButton;

/*
 * 初始化 UI 元素
 */
function initUI() {

  // 清空，避免重复初始化
  menuButtons = [];
  levelButtons = [];

// 1) 主菜单按钮配置
  const startY = 250;
  const gap = 75;
  menuButtons.push({ id: "play",    label: "PLAY",    x: width / 2, y: startY,           w: 200, h: 50, r: 25 });
  menuButtons.push({ id: "setting", label: "SETTING", x: width / 2, y: startY + gap,     w: 200, h: 50, r: 25 });
  menuButtons.push({ id: "exit",    label: "EXIT",    x: width / 2, y: startY + gap * 2, w: 200, h: 50, r: 25 });
  menuButtons.push({ id: "level",   label: "LEVEL",   x: width / 2, y: startY + gap * 3, w: 220, h: 50, r: 25 });

// 2) 关卡选择按钮 (5关，每排4个)
  const levelStartX = 250;
  const levelY = 250;
  for (let i = 1; i <= 5; i++) {
    let x = levelStartX + ((i - 1) % 4) * 100;
    let y = levelY + floor((i - 1) / 4) * 100;
    levelButtons.push({ id: i, label: i.toString(), x, y, w: 60, h: 60, r: 8 });
  }

// 3) 通用导航按钮
levelSettingBtn = { id: "setting", label: "SETTING", x: 700, y: 550, w: 140, h: 40, r: 20 };
backButton = { id: "back", label: "BACK", x: 737, y: 20, w: 120, h: 30, r: 100 };
}

// --- UI 渲染逻辑 ---
function drawMenu() {
  fill(30, 60, 180);
  noStroke();
  textSize(80);
  textStyle(BOLD);
  text("U help U", 400, 120);

  for (let btn of menuButtons) {
    drawButton(btn);
  }
}

function drawLevel() {
  fill(100);
  noStroke();
  textSize(50);
  textStyle(NORMAL);
  text("LEVEL", 400, 120);

  for (let btn of levelButtons) {
    stroke(0);
    strokeWeight(1);
    noFill();
    // 绘制外框
    rect(btn.x, btn.y, btn.w + 10, btn.h + 10, btn.r);
    
    // 当前关卡高亮
    if (btn.id === currentLevel) {
      fill(200, 220, 255);
    } else {
      fill(255);
    }
    drawButton(btn, false);
  }
  
  drawButton(levelSettingBtn);
  drawButton(backButton);
}

function drawSetting() {
  fill(50);
  noStroke();
  textSize(50);
  text("SETTINGS", 400, 120);

  // 音量条背景
  fill(220);
  stroke(0);
  strokeWeight(2);
  rect(400, 300, 400, 30, 15);

  // 音量填充
  fill(100, 150, 250);
  noStroke();
  let volWidth = map(gameVolume, 0, 100, 0, 396);
  rectMode(CORNER);
  rect(202, 287, volWidth, 26, 13);
  rectMode(CENTER);

  // 文本提示
  fill(0);
  textSize(24);
  text("Volume: " + Math.round(gameVolume) + "%", 400, 250);
  textSize(16);
  text("(Click and drag on the bar to adjust)", 400, 350);
  
  drawButton(backButton);
}

// 游戏主界面，音量图标的相关内容
function drawSoundIcon() {
  push();
  
  // 定义基准坐标，以后只要改这里，整个图标都会跟着走！
  let iconX = 10; // 把原本的 700 改到了左边的 20
  let iconY = 15; // Y 坐标保持原来的 30 不变
  
  noFill();
  stroke(0);
  strokeWeight(2);
  rectMode(CORNER);

  // 画外框：相对于基准坐标绘制
  rect(iconX, iconY, 30, 30, 5);
  
  fill(0);

  noStroke(); // 去掉内部三角形的边框，让喇叭更清爽
  // 画喇叭主体（三角形）：根据你原来的比例计算出的相对位置
  triangle(iconX + 9, iconY + 15, iconX + 18, iconY + 9, iconX + 18, iconY + 21);
  
  noFill();
  // 画音量波纹（圆弧）：根据相对位置绘制
  if (gameVolume > 0) arc(iconX + 21, iconY + 15, 6, 6, -PI / 4, PI / 4);
  if (gameVolume > 50) arc(iconX + 21, iconY + 15, 12, 12, -PI / 4, PI / 4);
  
  pop();
}

/**
 * 通用按钮绘制函数
 */
function drawButton(btn, autoFill = true) {
  let isHovering = checkClick(btn);
  
  if (autoFill) {
    fill(isHovering ? 220 : 255);
  } else if (isHovering) {
    fill(240);
  }

  stroke(0);
  strokeWeight(2);
  rect(btn.x, btn.y, btn.w, btn.h, btn.r);

  // 数字关卡与文字按钮区分样式
  if (typeof btn.id === 'number') {
    fill(30, 60, 200);
    textStyle(BOLD);
  } else {
    fill(0);
    textStyle(NORMAL);
  }

  noStroke();
  textSize(btn.h * 0.45);
  text(btn.label, btn.x, btn.y);
}

// --- 游戏内 UI (提示/结算) ---
function drawUI() {
  fill(255);
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("WASD: 移动 | R: 录制（持续10秒，再按R可随时中断） | 同时踩住两个按钮 | 开启传送门", 10, 10);
  
  textAlign(LEFT, TOP);
  if (levelState === 'RECORDING') {
    let rem = ceil((recordDuration - (millis() - recordStartTime)) / 1000);
    fill(255, 50, 50);
    text("录制中 " + rem + "s", 10, 40);
  } else if (levelState === 'REPLAYING') {
    fill(100, 255, 100);
    text("回放中 (控制本体)", 10, 40);
  }
  
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
}

// 死亡界面
function drawDeadScreen() {
  fill(50, 0, 0, 180);
  rectMode(CORNER);
  rect(0, 0, width, height);
  
  textAlign(CENTER, CENTER);
  fill(255, 50, 50);
  textSize(60);
  text("GAME OVER", width / 2, height / 2 - 20);
  
  fill(255);
  textSize(20);
  text("掉进陷坑了! 按 'C' 重试", width / 2, height / 2 + 40);
}

//胜利界面
function drawWinScreen() {
  fill(0, 0, 0, 150);
  rectMode(CORNER);
  rect(0, 0, width, height);
  
  textAlign(CENTER, CENTER);
  fill(255, 215, 0);
  textSize(60);
  text("LEVEL CLEARED!", width / 2, height / 2 - 20);
  
  fill(255);
  textSize(20);
  text("配合完美! 按 'C' 重新开始", width / 2, height / 2 + 40);
}

// --- 控制逻辑与输入响应（UI 控制响应） ---
function mousePressed() {
   // 先解锁音频（必须在用户点击事件里）
  if (typeof userStartAudio === "function") {
    userStartAudio().then(() => {
      // 如果此时还在 MENU，就确保菜单音乐真的开始
      if (gameState === "MENU") changeBGM(menuBGM);
    });
  }
  
  // 新增：判断是否点击了左上角的静音喇叭 (X:20~50, Y:30~60)
  if (gameState !== "PLAYING" && mouseX >= 20 && mouseX <= 50 && mouseY >= 30 && mouseY <= 60) {
  if (gameVolume > 0) {
      savedVolume = gameVolume; // 记住现在的音量
      gameVolume = 0;           // 变成静音
    } else {
      gameVolume = savedVolume; // 恢复之前的音量
    }
    outputVolume(gameVolume / 100); // 真正将改变同步给声音引擎
    return; // 关键：点击了喇叭就直接结束，不要再往下判断其他按钮了
  }
  
  // 只要在菜单界面点击屏幕，就确保播放菜单音乐
  // if (gameState === "MENU") {
  //   changeBGM(menuBGM);
  // }
  
  // 1. Debug---音量无法调节的问题
  // 新增：判断是否在 SETTING 界面点击了音量条
  if (gameState === "SETTING" && mouseY > 250 && mouseY < 350 && mouseX > 180 && mouseX < 620) {
    gameVolume = constrain(map(mouseX, 200, 600, 0, 100), 0, 100);
    try { outputVolume(gameVolume / 100); } catch(e) {}
    return false; // 处理完音量就拦截，防止触发其他事件
  }

  if (gameState === "MENU") {
    for (let btn of menuButtons) {
      if (checkClick(btn)) {
        if (btn.id === "play") {
          
          // ★ 核心修改：点击 PLAY，不再直接进游戏，而是进入故事滚动动画
          gameState = ST_STORY_CRAWL;
          crawlScrollY = height; // 重置文字从屏幕最底下开始
          crawlFinished = false;
          if (currentBGM) currentBGM.stop(); // 暂时停掉菜单音乐，安静看开场
          
        } else if (btn.id === "setting") {
          gameState = "SETTING";
        } else if (btn.id === "level") {
          gameState = "LEVEL";
        }
      }
    }
  } 
  else if (gameState === "LEVEL") {
    for (let btn of levelButtons) {
      if (checkClick(btn)) {
        currentLevel = btn.id;
        loadLevel(currentLevel);
        gameState = "PLAYING";
        changeBGM(level1BGM); // ★ 3. 切换到关卡音乐
      }
    }
    if (checkClick(levelSettingBtn)) gameState = "SETTING";
    if (checkClick(backButton)) {
      gameState = "MENU";
      changeBGM(menuBGM); // ★ 4. 切回菜单音乐
    }
  } 
  else 
    if (gameState === "PLAYING" || gameState === "SETTING") {
    if (checkClick(backButton)) {
      gameState = "MENU";
      changeBGM(menuBGM); // 切回菜单音乐
    }
  }
}

// 碰撞检测：检查鼠标是否在按钮范围内
function checkClick(btn) {
  return mouseX > btn.x - btn.w / 2 && 
         mouseX < btn.x + btn.w / 2 && 
         mouseY > btn.y - btn.h / 2 && 
         mouseY < btn.y + btn.h / 2;
}

// 2. Debug---音量无法调节的问题
// 新增：加入鼠标拖拽逻辑，并阻止浏览器默认行为
function mouseDragged() {
  if (gameState === "SETTING" && mouseY > 250 && mouseY < 350 && mouseX > 180 && mouseX < 620) {
    gameVolume = constrain(map(mouseX, 200, 600, 0, 100), 0, 100);
    try { outputVolume(gameVolume / 100); } catch(e) {}
    
    // 返回 false 极其重要：能阻止浏览器默认的网页拖拽/文字选中行为
    return false; 
  }
}

// --- 新增函数：绘制星球大战式的文字滚动动画 ---
function drawStoryCrawl() {
  // 1. 绘制宇宙背景 (深蓝色/黑色)
  background(0, 5, 25); 

  // --- 可以在这里可选地添加简单的星星 (纯粹为了氛围) ---
  fill(255);
  noStroke();
  randomSeed(99); // 确保星星位置固定
  for(let i=0; i<50; i++) {
    ellipse(random(width), random(height), random(1, 3));
  }
  // --------------------------------------------------

  // 2. 设置文字样式 (黄色，仿星球大战)
  fill(255, 220, 0); 
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  noStroke();

  // 3. 计算文字其实位置
  let startX = width / 2;
  
  // 如果是第一次运行，初始化滚动坐标到屏幕下方
  if (crawlScrollY === undefined) {
    crawlScrollY = height; 
  }

  // 4. 循环绘制每一行文字
  let currentY = crawlScrollY;
  let lineHeight = 28; // 行间距
  let totalTextHeight = starWarsStory.length * lineHeight;

  for (let i = 0; i < starWarsStory.length; i++) {
    // 简单的淡出效果：当文字靠近屏幕顶部时透明度变低
    let alpha = 255;
    if (currentY < 150) {
      alpha = map(currentY, 0, 150, 0, 255); // 在顶部 150 像素内淡出
    }
    fill(255, 220, 20, alpha); // 应用透明度

    // 针对标题加粗加大
    if (i === 0 || i === 2) {
      textSize(28);
    } else {
      textSize(20);
    }

    text(starWarsStory[i], startX, currentY);
    currentY += lineHeight; // 下移一行
  }

  // 5. 更新滚动坐标 (向上移动)
  crawlScrollY -= crawlSpeed;

  // 6. 检查是否完全播完 (所有文字都移出了屏幕顶部 + 缓冲区)
  if (crawlScrollY + totalTextHeight < -100) {
    if (!crawlFinished) {
      crawlFinished = true;
      // 播完了自动跳转到标题界面
      gameState = "TITLE";
    }
  }
}
