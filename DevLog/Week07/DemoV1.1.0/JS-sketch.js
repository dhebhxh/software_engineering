/*
主控/整合者/总导演的文件

这个模块“不写细节逻辑”，只做三件事：
setup()；draw()；调用其他模块的函数

职责：
调度所有的模块运转，
处理全局按键输入，
以及游戏核心的录像/回放逻辑流转
*/

/*
作为总枢纽：游戏逻辑调度与键盘响应
这个文件现在不仅是 draw() 的入口，
还接管了原本混在地图和物理文件里的
“游戏循环（Game Loop）”
以及
“输入调度（Key Pressed）”。
*/

// 加载背景图片，在文件最顶部声明全局变量
let bgImage;

// 加载背景音乐素材
let menuBGM;
let level1BGM;
let currentBGM; // 用来记录当前正在播放的音乐，方便切换

// preload 函数，用来加载素材
function preload() {
  
  // 加载 assets 文件夹下的图片
  // 注意：文件名必须与左侧列表完全一致（区分大小写）
  bgImage = loadImage('assets/Background2.png'); 
  
  // 加载音乐文件 (确保你的 index.html 里已经引入了 p5.sound 库)
  menuBGM = loadSound('assets/menu.mp3');
  level1BGM = loadSound('assets/level1.mp3');
  
}

// 初始化，不可变动
// 初始化，不可变动
function setup() {
  let canvas = createCanvas(800, 520); // 画面大小
  canvas.elt.setAttribute("tabindex", "0");
  canvas.elt.focus();
  textAlign(CENTER, CENTER); // 让文字设置在画布的正中心
  noSmooth(); // 保持像素画风 

  initUI();          // ← 链接 ui.js 文档
  loadLevel(currentLevel); // ← level-terrain.js
  
  // 游戏一启动就应用初始的 50% 音量
  outputVolume(gameVolume / 100);

  // --- 新增：初始化故事滚动的起点在屏幕最下方 ---
  crawlScrollY = height; 
}

// 主循环，不可变动
function draw() {
  // 修改：如果不是游玩状态，且不是故事滚动状态，才画灰色背景
  if (gameState !== "PLAYING" && gameState !== ST_STORY_CRAWL) {
    background(248); // 画面的背景颜色
    rectMode(CENTER);
  } else if (gameState === "PLAYING") {
    rectMode(CORNER);
  }

  switch (gameState) {
    case ST_STORY_CRAWL: drawStoryCrawl(); break; // <-- 新增：播放星战故事动画
    case "MENU": drawMenu(); break;
    case "LEVEL": drawLevel(); break;
    case "PLAYING": drawPlaying(); break;
    case "SETTING": drawSetting(); break;
  }

  // 修改：在故事滚动期间，不显示右上角/左上角的喇叭，保持画面纯净
  if (gameState !== "PLAYING" && gameState !== ST_STORY_CRAWL) drawSoundIcon();
}

// === 键盘指令枢纽 ===
// === 键盘指令枢纽 ===
function keyPressed() {
  // --- 故事滚动 / 菜单 界面按键处理 ---
  if (gameState === ST_STORY_CRAWL || gameState === "MENU") {
    if (keyCode === ENTER) {
      let unlock = (typeof userStartAudio === "function") ? userStartAudio() : Promise.resolve();
      if (gameState === ST_STORY_CRAWL) {
        // ★ 修改：看故事时按 Enter，跳过并直接加载第一关开始游戏！
        crawlFinished = true; 
        loadLevel(currentLevel);
        gameState = "PLAYING";
        unlock.then(() => changeBGM(level1BGM));
      } else {
        // 菜单界面按 Enter，也进入故事动画
        gameState = ST_STORY_CRAWL;
        crawlScrollY = height;
        crawlFinished = false;
        if (currentBGM) currentBGM.stop(); 
        unlock.then(() => changeBGM(menuBGM));
      }
    }
    // 阻止WASD键导致页面滚动、焦点丢失
   const k = (key || "").toLowerCase();
    if (k === 'w' || k === 'a' || k === 's' || k === 'd' || key === ' ' || keyCode === ENTER) {
      return false; // 阻止默认行为/焦点干扰
    }
  }

  // 仅在游玩状态下响应后续按键
  if (gameState !== "PLAYING") return;

  // 结算界面逻辑
  if (levelState === 'WIN' || levelState === 'DEAD') {
    if (key === 'c' || key === 'C') loadLevel(currentLevel);
    return;
  }

  // 录制逻辑 (支持中断)
  if (key === 'r' || key === 'R') {
    if (levelState === 'IDLE') {
      startRecording();
    } else if (levelState === 'RECORDING') {
      startReplay(); 
    }
  }

  // 跳跃逻辑（永远只控制本体）
  if (key === ' ' || key === 'w' || key === 'W') {
    if (player.onGround) {
      player.jump();
    }
  }
}

// --- 绘制星球大战式的文字滚动动画 ---
function drawStoryCrawl() {
  // 1. 绘制宇宙背景 (深蓝色/黑色)
  background(0, 5, 25); 

  // 绘制简单的星星氛围
  fill(255);
  noStroke();
  randomSeed(99); 
  for(let i=0; i<50; i++) {
    ellipse(random(width), random(height), random(1, 3));
  }

  // 2. 设置文字样式
  fill(255, 220, 0); 
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  noStroke();

  let startX = width / 2;
  
  if (crawlScrollY === undefined) {
    crawlScrollY = height; 
  }

  let currentY = crawlScrollY;
  let lineHeight = 28; 
  let totalTextHeight = starWarsStory.length * lineHeight;

  for (let i = 0; i < starWarsStory.length; i++) {
    let alpha = 255;
    if (currentY < 150) {
      alpha = map(currentY, 0, 150, 0, 255); 
    }
    fill(255, 220, 20, alpha); 

    if (i === 0 || i === 2) {
      textSize(28);
    } else {
      textSize(20);
    }

    text(starWarsStory[i], startX, currentY);
    currentY += lineHeight; 
  }

  crawlScrollY -= crawlSpeed;

  // 检查是否完全播完
  if (crawlScrollY + totalTextHeight < -100) {
    if (!crawlFinished) {
      crawlFinished = true;
      // ★ 修改：播完了自动进入游戏第一关！
      loadLevel(currentLevel);
      gameState = "PLAYING";
      changeBGM(level1BGM);
    }
  }

  // 3. 左边上角醒目的跳过提示 (带呼吸闪烁效果)
  push();
  // 利用 sin() 函数和 frameCount 制造透明度在 155 到 255 之间来回渐变的呼吸灯效果
  let pulseAlpha = 205 + sin(frameCount * 0.08) * 50; 
  fill(255, 255, 255, pulseAlpha); 
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  // 留出一些边距
  text("Press [ENTER] to Skip Introduction >>", 20, 20);
  pop();
}
