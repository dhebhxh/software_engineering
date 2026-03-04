// <!-- 创建一个model和view
// 监听指令

// 键盘左键：改变model中主角的状态、改变当前视窗（改变地形、背景板、家门、悬崖）
// 键盘右键：同上

// 键盘上建：改变model中主角的状态

// 键盘space键：开始录制，改变录制的状态（不能自己停止，时间到了自动结束）
// 键盘space键：开始播放，改变过去主角的状态
// 和上一个组成一个状态机

// 键盘r键：清空录制，再次按space重新录制

// 三个状态：
// 空壳状态-space->正在录制-时间结束或死亡->录制完成-space->正在播放->播放完成
// 总之录制这个对象是一个状态机

// 字典，input打包这一帧按键的所有状态 -->
class Controller{
    constructor() {
        this.wKeyDownCallbackExecutable = true;
        this.jump = false;
        this.moveLeft = false;
        this.moveRight = false;
    }
    
    keyDown(e) {
        if(e.code === "KeyW" && this.wKeyDownCallbackExecutable === true) {
            this.wKeyDownCallbackExecutable = false;
            this.jump = true;
        }
        if(e.code === "KeyA") {
            this.moveLeft = true;
            this.moveRight = false;
        }
        if(e.code === "KeyD") {
            this.moveRight = true;
            this.moveLeft = false;
        }
    }

    keyUp(e) {
        if(e.code === "KeyW") {
          this.wKeyDownCallbackExecutable = true;
        }
        if(e.code === "KeyA") {
            this.moveLeft = false;
        }
        if(e.code === "KeyD") {
            this.moveRight = false;
        }
    }

}



    // handleInput(rawInput){//rawInput:["left","jump"]
    //     //"idle", "air"
    //     const allowed = AllowedInputs[this.model.character.state];
    //     const filteredInput = [];
        
    //     for(const input of rawInput){
    //         if(!allowed.includes(input)){
    //             result.push(input);
    //         }
    //     }
    //     return filteredInput;
    // }
   
    // control(filteredInput){
    //     const state = this.model.character.state;
        
    //     switch(state){
    //         case "idle":
    //                 if(filteredInput.includes("left")){
    //                     this.model.character.setVelocityX("left");
    //                 }else if(filteredInput.includes("right")){
    //                     this.model.character.setVelocityX("right");
    //                 }

    //                 if(filteredInput.includes("jump")){
    //                     this.model.character.setVelocityY("jump");
    //                     this.model.character.setAccelerationY("g");
    //                 }
    //         default:
    //                 throw new Error("Unknown state type: " + state);
    //     }
    // }
    // physics(){
    //     let x = this.model.character.getPosition();
    //     let v = this.model.character.getVelocity();
    //     let a = this.model.character.getAcceleration();
    //     v.x = v.x + a.x * t;
    //     v.y = v.y + a.y * t;

    //     x.x = x.x + v.x * t;
    //     x.y = x.y + v.y * t;

    //     this.model.character.setVelocity(v);
    //     this.model.character.setPosition(x);
    // }
    // collide(){
    //     collideResult = collideDetectionSystem(this.model);
    //     collideReponse(this.model, collideResult);
    //     modifyCharacterState(this.model, collideResult);
