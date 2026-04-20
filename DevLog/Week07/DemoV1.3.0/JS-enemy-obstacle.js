// JS-enemy-obstacle.js
// 职责：地图实体类
// 内容：Ground（地面）、Platform（悬空平台）、GoalDoor（终点门）

// ============================================================
// Ground 地面类
// ============================================================
class Ground {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    let tileW = tileImage_ground.width;
    let tileH = tileImage_ground.height;
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(this.x, this.y, this.w, this.h);
    drawingContext.clip();
    for (let ty = this.y; ty < this.y + this.h; ty += tileH) {
      for (let tx = this.x; tx < this.x + this.w; tx += tileW) {
        image(tileImage_ground, tx, ty, tileW, tileH);
      }
    }
    drawingContext.restore();
  }
}

// ============================================================
// Platform 悬空平台类
// ============================================================
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    let tileW = tileImage_platform.width;
    let tileH = tileImage_platform.height;
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.rect(this.x, this.y, this.w, this.h);
    drawingContext.clip();
    for (let ty = this.y; ty < this.y + this.h; ty += tileH) {
      for (let tx = this.x; tx < this.x + this.w; tx += tileW) {
        image(tileImage_platform, tx, ty, tileW, tileH);
      }
    }
    drawingContext.restore();
  }
}

// ============================================================
// GoalDoor 终点门类（正方形贴图 + 呼吸灯描边）
// 玩家碰到即触发过关（levelState = 'WIN'）
// ============================================================
class GoalDoor {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.w = size || 50;
    this.h = size || 50; // 正方形，宽高相等
  }

  update(player) {
    if (
      player.pos.x + player.w > this.x &&
      player.pos.x < this.x + this.w &&
      player.pos.y + player.h > this.y &&
      player.pos.y < this.y + this.h
    ) {
      levelState = 'WIN';
    }
  }

  show() {
    push();
    rectMode(CORNER); // 确保描边和贴图坐标系一致

    // 贴图铺满正方形
    image(goalImage, this.x, this.y, this.w, this.h);

    // 呼吸灯描边（紧贴贴图边缘）
    let breathe = sin(frameCount * 0.07);
    let strokeA = 160 + breathe * 75;   // 85 ~ 235
    let sWeight = 0.8 + breathe * 0.4;  // 0.4 ~ 1.2
    stroke(255, 200, 210, strokeA);     // 淡粉色
    strokeWeight(sWeight);
    noFill();
    rect(this.x, this.y, this.w, this.h, 4);

    pop();
  }
}
