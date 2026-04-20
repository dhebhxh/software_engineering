// 过场动画模块
// 职责：所有剧情/过场动画的数据和渲染逻辑都放这里
// 如需新增过场动画，在此文件继续添加即可

// --- 故事滚动动画参数 ---

let crawlSpeed = 0.8;      // 滚动速度（越小越慢）


// --- 第一段：开场背景故事文本 ---
const starWarsStory = [
  "",
  "U-HELP-U",
  "",
  "It is a dark time for Subject 42.",
  "Trapped within the sprawling,",
  "mechanical labyrinth of FACILITY ZERO,",
  "all hope of escape seems lost.",
  "The automated defenses are relentless,",
  "and the shifting walls offer no sanctuary.",
  "",
  "对于42号实验体，这是一个至暗时刻",
  "被困在庞大的，",
  "零号设施的机械迷宫中，",
  "没有任何逃生希望",
  "自动防御系统无情地运转",
  "移动的墙壁无法提供任何庇护",
  "",
  "But in the depths of despair,",
  "a breakthrough occurred.",
  "A critical error in the facility's core",
  "reactor initiated Project CHRONOS,",
  "granting Subject 42 a time-bending ability.",
  "He can now record his own actions and",
  "manifest a solid, physical echo",
  "of his past self.",
  "",
  "但，绝望深渊之中，",
  "出现了突破。",
  "核心设施的一个漏洞，",
  "反应堆启动了'时间计划'，",
  "赋予了42号实验体扭曲时间的能力",
  "现在，他可以记录自己的行动，",
  "并显现出一个实体分身，",
  "即他过去的自己",
  "",
  "This Phantom is no mere hologram.",
  "It perfectly replays every recorded",
  "step and jump, acting as a tangible",
  "force in the real world.",
  "Subject 42 must stand upon the shoulders",
  "of his past incarnation to reach impossible",
  "heights, and synchronize movements",
  "to trigger remote mechanisms.",
  "",
  "并非普通幻影，并非全息影像，",
  "它完美重现，每一次记录",
  "一步一步，一次一跃，如同一个有形的，",
  "现实世界的力量",
  "42号实验体必须站在，",
  "分身的肩膀上，达到那不可能的高度，",
  "同步动作，",
  "来触发远程装置",
  "",
  "Now, navigating treacherous platforms",
  "the protagonist must cooperate across time.",
  "In this solitary prison, your only",
  "teammate is your past self.",
  "",
  "如今，前行在危机之中，",
  "主角必须跨时空合作。",
  "在这座孤寂的牢笼中，你唯一的队友，",
  "就是过去的自己",
  "",
  "Escape before the system terminates forever...",
  "",
  "请记住，在系统彻底崩溃之前，务必逃离……",
  "",
  "--- PRESS ENTER TO SKIP INTRODUCTION ---"
];

// --- 绘制开场故事滚动动画 ---
// 播放完毕后自动跳转到关卡选择界面
function drawStoryCrawl() {
  // 1. 绘制深色宇宙背景
  background(0, 5, 25);

  // 绘制随机星星氛围
  fill(255);
  noStroke();
  randomSeed(99);
  for (let i = 0; i < 50; i++) {
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

  // 3. 逐行绘制文字，顶部渐隐效果
  for (let i = 0; i < starWarsStory.length; i++) {
    let alpha = 255;
    if (currentY < 150) {
      alpha = map(currentY, 0, 150, 0, 255);
    }
    fill(255, 220, 20, alpha);

    // 标题行（第0行和第2行）用更大字号
    if (i === 0 || i === 2) {
      textSize(28);
    } else {
      textSize(20);
    }

    text(starWarsStory[i], startX, currentY);
    currentY += lineHeight;
  }

  // 4. 每帧向上滚动
  crawlScrollY -= crawlSpeed;

  // 5. 播放完毕：跳转到关卡选择界面
  if (crawlScrollY + totalTextHeight < -100) {
    if (!crawlFinished) {
      crawlFinished = true;
      gameState = "LEVEL"; // ← 播完自动进入关卡选择
    }
  }

  // 6. 左上角跳过提示（呼吸灯效果）
  push();
  let pulseAlpha = 205 + sin(frameCount * 0.08) * 50;
  fill(255, 255, 255, pulseAlpha);
  textAlign(LEFT, TOP);
  textSize(18);
  textStyle(BOLD);
  text("Press [ENTER] to Skip >>", 20, 20);
  pop();
}