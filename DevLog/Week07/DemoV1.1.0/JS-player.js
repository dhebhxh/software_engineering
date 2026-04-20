// 玩家/分身文件，和角色有关的一切，包括各种属性碰撞体积等内容

// 角色类：定义了游戏中所有人物（本体和分身）的共有属性和行为
class Character {
  constructor(x, y, c, label) {
    this.pos = createVector(x, y);      // 位置向量
    this.vel = createVector(0, 0);      // 速度向量 (Velocity)
    this.w = 30;                        // 角色宽度
    this.h = 30;                        // 角色高度
    this.c = c;                         // 角色颜色
    this.label = label;                 // 角色标签（显示在头顶的文字）
    this.speed = 5;                     // 左右移动速度
    this.jumpForce = -11;               // 跳跃力度（负数向上）
    this.onGround = false;              // 是否在地面上（用于判断能否跳跃）
    this.facingRight = true;            // 朝向（用于渲染眼睛方向）
    this.didJumpThisFrame = false;      // 录制关键位：本帧是否触发了跳跃
  }

  // 应用重力：每一帧都给垂直速度增加一个向下的量
  applyGravity() {
    this.vel.y += gravity;
  }

  // 处理键盘输入：检测 A 和 D 键
  handleInput() {
    this.vel.x = 0; // 默认停止移动
    if (keyIsDown(65)) { // 65 是 A 键
      this.vel.x = -this.speed;
      this.facingRight = false;
    }
    if (keyIsDown(68)) { // 68 是 D 键
      this.vel.x = this.speed;
      this.facingRight = true;
    }
  }

  // 跳跃动作
  jump() {
    this.vel.y = this.jumpForce;
    this.onGround = false;
    this.didJumpThisFrame = true; // 标记已跳跃，方便分身记录
  }

  // 移动核心逻辑：先算横向，再算纵向，每次移动后都要检测墙壁碰撞
  move(obstacles) {
    this.pos.x += this.vel.x;
    this.resolveMapCollisionX(obstacles); // 横向碰撞修复
    this.pos.y += this.vel.y;
    this.resolveMapCollisionY(obstacles); // 纵向碰撞修复
  }

  // 横向碰撞处理：如果撞墙，就把坐标挤回到墙边缘
  resolveMapCollisionX(obstacles) {
    this.pos.x = constrain(this.pos.x, 0, width - this.w); // 限制在屏幕内
    for (let o of obstacles) {
      if (this.checkMapOverlap(o)) {
        if (this.vel.x > 0) this.pos.x = o.x - this.w;      // 撞到左侧
        else if (this.vel.x < 0) this.pos.x = o.x + o.w;   // 撞到右侧
        this.vel.x = 0;
      }
    }
  }

  // 纵向碰撞处理：判断是踩在地上还是撞到天花板
  resolveMapCollisionY(obstacles) {
    this.onGround = false;
    for (let o of obstacles) {
      if (this.checkMapOverlap(o)) {
        if (this.vel.y > 0) {            // 正在向下落
          this.pos.y = o.y - this.h;     // 踩在物体上方
          this.vel.y = 0;
          this.onGround = true;          // 恢复跳跃能力
        } else if (this.vel.y < 0) {     // 正在向上跳
          this.pos.y = o.y + o.h;        // 撞到物体底部
          this.vel.y = 0;
        }
      }
    }
  }

  // 简单的矩形重叠检测逻辑
  checkMapOverlap(o) {
    return (
      this.pos.x + this.w > o.x &&
      this.pos.x < o.x + o.w &&
      this.pos.y + this.h > o.y &&
      this.pos.y < o.y + o.h
    );
  }

// 绘制角色形象：
// 根据 label 不同画出本体或红色的分身
show() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();

// 绘制角色外观 (复用小人绘制逻辑，this.c 已经自动区分了红蓝颜色)
    fill(this.c);
    rect(2, 6, this.w - 4, this.h - 12);     // 身体
    rect(4, 0, this.w - 8, 8);               // 头部
    rect(4, this.h - 6, 6, 6);               // 左脚
    rect(this.w - 10, this.h - 6, 6, 6);     // 右脚

// 画眼睛
    fill(255);
    let eyeOffset = this.facingRight ? 2 : -2;
    rect(8 + eyeOffset, 2, 4, 4);
    rect(this.w - 12 + eyeOffset, 2, 4, 4);
    fill(0);
    rect(10 + eyeOffset, 4, 2, 2);
    rect(this.w - 10 + eyeOffset, 4, 2, 2);

// 非录制状态显示头顶标签
    if (levelState !== 'RECORDING' || this.label === "分身") {
      fill(255); textAlign(CENTER); textSize(10);
      text(this.label, this.w / 2, -10);
    }
    pop();
  }
}

// 3. 分身类 Clone (继承 Character)
class Clone extends Character {
  constructor(x, y, actionQueue) {
    super(x, y);
    this.actionQueue = actionQueue;
    this.frameIndex = 0;
    
// [修改点 1] 新增：给分身赋予红色的实例变量
    this.c = color(255, 80, 80); 
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    
// [修改点 2] 将原本的礼物盒代码替换为像素小人的绘制逻辑
// 躯干与头部将使用上面定义的红色 (this.c)
    fill(this.c);
    rect(2, 6, this.w-4, this.h-12); // 躯干
    rect(4, 0, this.w-8, 8); // 头
    rect(4, this.h-6, 6, 6); // 脚
    rect(this.w-10, this.h-6, 6, 6);
    
// 眼睛 (根据朝向偏移)
    fill(255);
    let eyeOffset = this.facingRight ? 2 : -2;
    rect(8 + eyeOffset, 2, 4, 4);
    rect(this.w - 12 + eyeOffset, 2, 4, 4);
    fill(0);
    rect(10 + eyeOffset, 4, 2, 2);
    rect(this.w - 10 + eyeOffset, 4, 2, 2);

// [修改点 3] 名字标签改为“分身”
    fill(255);
    textAlign(CENTER); textSize(10); text("分身", this.w/2, -10);
    pop();
  }
}

// --- 分身逻辑 & 录制/回放 ---
function startRecording() {
  levelState = 'RECORDING';
  recordingData = [];              // 清空旧的录制数据
  recordStartTime = millis();      // 记录开始的时间戳

  // 关键修复：录制开始前，强行清空可能残留的跳跃指令！防止分身出场自跳
  player.didJumpThisFrame = false;
  
  // 关键修改：录制期间只记录起点坐标，【不生成分身】！
  recordStartPosX = player.pos.x;
  recordStartPosY = player.pos.y;
  clone = null; // 确保录制时画面上只有本体
}

function startReplay() {
  levelState = 'REPLAYING';
  replayIndex = 0;                 
  
  // 关键修改：录制或中断结束后，红色的分身在这里【凭空出现】！
  clone = new Character(recordStartPosX, recordStartPosY, color(255, 80, 80), "分身");
  clone.facingRight = player.facingRight;
}

function runGameLogic() {
  // 1) 闲置状态：只有本体
  if (levelState === 'IDLE') {
    player.applyGravity();
    player.handleInput();
    player.move(floors);
    
    // 关键修复：在闲置状态下也要及时清空跳跃指令，不能带到录制里
    player.didJumpThisFrame = false; 

    if (clone) clone.show();
    player.show();
  } 
  // 2) 录制状态：你控制本体跑动，系统暗中记录（没有红色分身）
  else if (levelState === 'RECORDING') {
    player.applyGravity();
    player.handleInput(); 
    player.move(floors);
    
    // 存入本体的坐标和动作
    recordingData.push({ x: player.pos.x, jumpCmd: player.didJumpThisFrame, frame: player.facingRight });
    player.didJumpThisFrame = false; 
    
    // 时间到了，自动进入回放并生成分身
    if (millis() - recordStartTime > recordDuration) startReplay();
    
    player.show();
  } 
  // 3) 回放状态：红色分身出现并重复动作，你继续控制本体配合！
  else if (levelState === 'REPLAYING') {
    player.applyGravity();
    player.handleInput(); // 你依然可以控制本体
    
    if (clone) {
      clone.applyGravity();
      if (replayIndex < recordingData.length) {
        let data = recordingData[replayIndex];
        let diffX = data.x - clone.pos.x;
        clone.vel.x = diffX * 0.2;
        clone.facingRight = data.frame;
        if (data.jumpCmd) {
          clone.vel.y = clone.jumpForce;
          clone.onGround = false;
        }
        replayIndex++;
      } else {
        levelState = 'IDLE'; 
        clone = null;  // 回放结束后，红色小人再次凭空消失
        return;
      }
    }

    // 更新位置与地图碰撞
    player.pos.x += player.vel.x;
    if (clone) clone.pos.x += clone.vel.x;
    
    player.resolveMapCollisionX(floors);
    if (clone) clone.resolveMapCollisionX(floors);
    
    // 实体互相推挤
    if (clone) resolveEntityCollisionX(player, clone);

    player.pos.y += player.vel.y;
    if (clone) clone.pos.y += clone.vel.y;
    
    player.resolveMapCollisionY(floors);
    if (clone) clone.resolveMapCollisionY(floors);
    
    // 实体互相踩踏
    if (clone) resolveEntityCollisionY(player, clone);

    if (clone) clone.show();
    player.show();
  }
}

// 实体碰撞 X 轴修复：智能判断上下踩踏 vs 左右碰撞
function resolveEntityCollisionX(a, b) {
  if (checkOverlap(a, b)) {
    // 1. 计算 Y 轴（垂直方向）的重叠量
    let centerAY = a.pos.y + a.h / 2;
    let centerBY = b.pos.y + b.h / 2;
    let overlapY = (a.h / 2 + b.h / 2) - abs(centerAY - centerBY);
    
    // 2. 计算 X 轴（水平方向）的重叠量
    let centerAX = a.pos.x + a.w / 2;
    let centerBX = b.pos.x + b.w / 2;
    let overlapX = (a.w / 2 + b.w / 2) - abs(centerAX - centerBX);

    // 【终极物理修复】：不再固定限制 8 个像素！
    // 只要垂直重叠量(Y) < 水平重叠量(X)，就说明是“从上往下砸”或者“从下往上顶”。
    // 此时 X 轴绝对不能互相推挤，直接退出函数，把后续工作留给 Y 轴碰撞去托举！
    if (overlapY < overlapX) return; 

    // 3. 只有当确实是左右“硬碰硬”时，才把彼此推开
    if (overlapX > 0) {
      let pushAmt = overlapX * 0.5; // 互相平分推开的距离
      if (centerAX < centerBX) { 
        a.pos.x -= pushAmt; 
        b.pos.x += pushAmt; 
      } else { 
        a.pos.x += pushAmt; 
        b.pos.x -= pushAmt; 
      }
    }
  }
}

// 实体碰撞 Y 轴修复：
// 实现“踩在对方头上”，“托举电梯”，与“踩头”逻辑
// 加入“顶头”检测，防止从下方撞击导致对方滞空或二段跳
function resolveEntityCollisionY(a, b) {
  if (checkOverlap(a, b)) {
    let centerAY = a.pos.y + a.h / 2;
    let centerBY = b.pos.y + b.h / 2;
    let overlapY = (a.h / 2 + b.h / 2) - abs(centerAY - centerBY);
    
    if (overlapY > 0) {
      if (centerAY < centerBY) { 
        // a 在 b 的正上方 (a 踩在 b 头上)
        a.pos.y -= overlapY; // 始终把上方的 a 往上推，避免陷进去
        
        // 【核心托举逻辑】：如果底下的 b 正在往上跳，就把速度完美传递给 a！
        if (b.vel.y < 0) {
          a.vel.y = b.vel.y; // a 坐上了 b 的“电梯”，两人同步起飞
        } else {
          a.vel.y = 0;       // b 没跳，a 就稳稳踩在头上
        }
        a.onGround = true;   // a 获得了地面的支撑，甚至可以在空中起跳！
        
      } else { 
        // b 在 a 的正上方 (b 踩在 a 头上)
        b.pos.y -= overlapY; // 始终把上方的 b 往上推
        
        // 同理，如果底下的 a 正在往上跳，带着 b 一起飞
        if (a.vel.y < 0) {
          b.vel.y = a.vel.y; // b 坐上了 a 的“电梯”
        } else {
          b.vel.y = 0; 
        }
        b.onGround = true; 
      }
    }
  }
}

// 碰撞通用检测函数
function checkOverlap(a, b) {
  return (a.pos.x + a.w > b.pos.x && a.pos.x < b.pos.x + b.w && a.pos.y + a.h > b.pos.y && a.pos.y < b.pos.y + b.h);
}

// 尖刺死亡检测：比普通碰撞箱稍窄一点，防止玩家觉得“明明没碰到却死了”
function checkSpikeCollision(char) {
  let hitBoxX = char.pos.x + 8;
  let hitBoxW = char.w - 16;
  let hitBoxY = char.pos.y + 5;
  let hitBoxH = char.h - 5;
  for (let s of spikes) {
    if (hitBoxX + hitBoxW > s.x && hitBoxX < s.x + s.w && hitBoxY + hitBoxH > s.y - s.h && hitBoxY < s.y) {
      return true;
    }
  }
  return false;
}
