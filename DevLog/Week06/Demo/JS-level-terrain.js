// 关卡 & 地形 & 物理实体；
// 例如地面、按钮、刺、关卡结构等
// 以后加新关卡，只改这个文件。

// --- 全局环境物理参数 ---
// 重力加速度：每一帧都会累加到角色的垂直速度（vel.y）上，数值越大掉落越快
let gravity = 0.6; // 进行全局声明，重力现在属于“关卡环境”的专属属性

// 关卡工厂 (加载关卡1)
function loadLevel(num) {
  levelState = 'IDLE';
  recordingData = [];
  replayIndex = 0;
  
  // 每次进入新关卡前，依然在这里将它重置为默认值
  // 针对特定关卡重力变化的问题，在特定关卡中重新设置重力即可，下一关会恢复默认值
  gravity = 0.6;
  
  // 清空并初始化 portals 数组
  floors = []; buttons = []; spikes = []; portals = [];
  
if (num === 1) { 
    levelState = 'IDLE';
    recordingData = [];
    replayIndex = 0;

    floors = [];
    buttons = [];
    spikes = [];
    portals = [];

    // 主角出生点
    player = new Character(50, 350, color(50, 100, 255), "主角");
    clone = null;

    // === 地形结构 ===
    // 1) 左侧平坦地面
    floors.push(new Platform(0, height - 40, 500, 40));

    // 2) 右侧高台（很高）
    // 高台高度 = 200，顶部平台宽度 = 200
    floors.push(new Platform(500, height - 200, 200, 200));

    // === 传送门：放在高台顶部中央 ===
    portals.push(new Portal(580, height - 260, 40, 60));
    portals[0].isActive = true;

    // === 挑战机制：没有按钮 ===
    // 传送门默认需要按钮才能激活，但你想要“踩分身跳上去即可通关”
    // 所以我们放一个“永远被踩下的假按钮”来让传送门一开始就激活
    let fakeBtn = new Button(-9999, -9999);
    fakeBtn.isPressed = true;
    buttons.push(fakeBtn);
  } else if (num === 2) {
    // ==========================================
    //  第 2 关（原来的大demo）
    // ==========================================
    player = new Character(50, 350, color(50, 100, 255), "主角");
    clone = null; 
    
    floors.push(new Platform(0, height - 40, 250, 40));
    floors.push(new Platform(450, height - 40, 350, 40));
    floors.push(new Platform(250, height - 10, 200, 10, color(50, 30, 10)));
    floors.push(new Platform(50, 250, 100, 20)); 
    floors.push(new Platform(200, 350, 60, 20));
    floors.push(new Platform(320, 280, 60, 20));  
    floors.push(new Platform(550, 300, 100, 20));
    floors.push(new Platform(700, 180, 80, 20));  

    spikes.push(new Spike(250, height, 200));
    
    // 两个按钮的代码
    buttons.push(new Button(80, 250 - 10));
    buttons.push(new Button(600, height - 40 - 10));
    
    // 传送门的代码：
    portals.push(new Portal(720, 120, 40, 60));
    
  } else {
    // 暂时代替其他关卡 (第 3 关及以后)
    player = new Character(50, 350, color(50, 100, 255), "主角");
    clone = null;
    floors.push(new Platform(0, height - 40, width, 40));
  }
}

// ==========================================
// 游戏核心调度，渲染逻辑，关卡1
// ==========================================
function drawPlaying() {
  
// 渲染地牢背景图片
image(bgImage, 0, 0, width, height);
  
  for (let f of floors) f.show();
  for (let s of spikes) s.show();

  let characters = clone ? [player, clone] : [player];
  let pressedCount = 0;
  for (let btn of buttons) {
    btn.update(characters);
    btn.show();
    if (btn.isPressed) pressedCount++;
}

// 更新并显示传送门
    for (let p of portals) {
      p.update(player, buttons); 
      p.show();
    }
  
// 胜负判定
if (levelState !== 'DEAD' && levelState !== 'WIN') {
    if (checkSpikeCollision(player) || (clone && checkSpikeCollision(clone))) {
      levelState = 'DEAD';
  }
}

if (levelState === 'DEAD') {
    player.show(); if(clone) clone.show();
    drawDeadScreen();
  } else if (levelState === 'WIN') {
    player.show(); if(clone) clone.show();
    drawWinScreen();
  } else {
    runGameLogic();
  }

if (levelState !== 'WIN' && levelState !== 'DEAD') drawUI();
  
  rectMode(CENTER); // 绘制返回按钮前切回 CENTER
  drawButton(backButton);
}
