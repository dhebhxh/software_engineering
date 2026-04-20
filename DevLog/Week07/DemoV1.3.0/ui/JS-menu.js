/*
 菜单模块
 职责：仅处理菜单界面的绘制、点击逻辑
*/

// 菜单界面绘制（原 JS-ui.js 里的 drawMenu 完整迁移）
function drawMenu() {
  // 菜单背景图铺满
  image(bgImage_menu, 0, 0, width, height);

  // 三个圆的位置（按背景图原始尺寸 2350x1322 缩放）
  let scaleX = width / 2350;
  let scaleY = height / 1322;

  let circles = [
    {
      id: "setting",
      label: "SETTING",
      x: 910 * scaleX,
      y: 1150 * scaleY,
      r: 75 * scaleX,
      textSizeRatio: 0.4,
      textOffsetX: 0,
      textOffsetY: -1
    },
    {
      id: "play",
      label: "PLAY",
      x: 1175 * scaleX,
      y: 1150 * scaleY,
      r: 95 * scaleX,
      textSizeRatio: 0.75,
      textOffsetX: 0,
      textOffsetY: -5
    },
    {
      id: "credits",
      label: "CREDITS",
      x: 1440 * scaleX,
      y: 1150 * scaleY,
      r: 75 * scaleX,
      textSizeRatio: 0.4,
      textOffsetX: 0,
      textOffsetY: -1
    }
  ];

  for (let c of circles) {
    let hovering = dist(mouseX, mouseY, c.x, c.y) < c.r;
    if (hovering) {
      fill(255, 255, 255, 40);
      noStroke();
      ellipse(c.x, c.y, c.r * 2.2, c.r * 2.2);
    }

    textFont(customFont);
    textSize(c.r * c.textSizeRatio);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);

    if (hovering) {
      fill(128, 0, 128);
      stroke(255);
      strokeWeight(1.2);
    } else {
      fill(100, 0, 100);
      stroke(0, 0, 0);
      strokeWeight(0.8);
    }

    text(c.label, c.x + c.textOffsetX, c.y + c.textOffsetY);
  }
}

// 菜单界面点击逻辑（从原 mousePressed 拆分，供主文件调用）
function handleMenuClick() {
  let scaleX = width / 2350;
  let scaleY = height / 1322;
  let circles = [
    { id: "setting", x: 900 * scaleX, y: 1150 * scaleY, r: 75 * scaleX },
    { id: "play",    x: 1175 * scaleX, y: 1150 * scaleY, r: 95 * scaleX },
    { id: "credits", x: 1450 * scaleX, y: 1150 * scaleY, r: 75 * scaleX }
  ];

  for (let c of circles) {
    if (dist(mouseX, mouseY, c.x, c.y) < c.r) {
      if (c.id === "play") {
        // 点击 PLAY → 故事动画
        gameState = ST_STORY_CRAWL;
        crawlScrollY = height;
        crawlFinished = false;
        if (currentBGM) currentBGM.stop();
      } else if (c.id === "setting") {
        gameState = "SETTING";
      } else if (c.id === "credits") {
        gameState = "CREDITS"; // 切换到 credits 界面
      }
    }
  }
}