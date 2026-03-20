//伪代码

class RecordSystem {
    constructor() {
        this.clip = [];
    }
    //状态机
    //当前状态 + 转移条件 => 下一个状态 + 执行一段代码
    getClip() {
        return this.clip;
    }
    //frame: 某一帧控制的所有信息：moveX， jump，
    addFrame(frame) {
        this.clip.push(frame);
    }
}