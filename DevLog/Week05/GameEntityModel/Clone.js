class Clone extends Character {
  constructor(x, y, w, h) {
    super(x, y, w, h);

    this.recordedFrames = [];  //保存录制的每一帧数据
    /*{
        x: number,
        y: number,
        vx: number,
        vy: number,
        state: string,
        facing: string
    }*/
    this.currentFrameIndex = 0;  //当前播放到第几帧
    this.isReplaying = false;  //一开始不播放
    this.facing = "right";

    this.collider = new Rectangle(ColliderType.DYNAMIC, this.w, this.h);
  }

  //把外部录制好的数据传进来
  setRecordingData(frames) {
    this.recordedFrames = frames || [];  //如果有数据就保存，没有就给空数组
    this.currentFrameIndex = 0; //每次换新数据都从第0帧开始
  }

  //开始回放
  startReplay() {
    if (this.recordedFrames.length === 0) return;

    this.isReplaying = true;
    this.currentFrameIndex = 0;

    //让分身出现在录制起点的位置
    let firstFrame = this.recordedFrames[0];
    this.x = firstFrame.x;
    this.y = firstFrame.y;
  }

  //回放完毕后分身停止
  stopReplay() {
    this.isReplaying = false;
    this.vx = 0;
    this.vy = 0;
  }

  //把过去的自己在这一帧的状态复制到现在的clone身上
  updateReplay() {
    if (!this.isReplaying) return;

    if (this.currentFrameIndex >= this.recordedFrames.length) {
      this.stopReplay();
      return;
    }

    let frame = this.recordedFrames[this.currentFrameIndex];

    this.x = frame.x;
    this.y = frame.y;
    this.vx = frame.vx;
    this.vy = frame.vy;
    this.state = frame.state;
    this.facing = frame.facing;

    this.currentFrameIndex++;
  }

  update(dt) {
    if (this.isReplaying) {
      this.updateReplay();
    }

    super.update(dt);
  }

  draw() {
    if (!this.visible) return;

    push();
    stroke(0);
    fill(120, 120, 255, 180);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}