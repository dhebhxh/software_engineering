class Recorder {
    constructor() {
        this.state = "noRecord";
        this.replayer = null;
        this.startTime;
        this.finishTime;
        this.replayStartTime;
        this.startX;
        this.startY;
        this.records = [];

        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    
    onKeyDown(e) {
        //无录制，按下e开始录制
        if(this.state ==="noRecord" && e.code === "KeyE") {
            this.state = "recording";//状态转移
            this.startTime = Date.now();//记录录制开始时间戳
            this.startX = scene.character.x;//记录录制开始时的角色位置
            this.startY = scene.character.y;
            //console.log("start recording! startTime: ", this.recorder.startTime);
        }
        //录制中，按下任意方向键以及时间戳会被记录在records中
        if(this.state === "recording" && (e.code === "KeyW" || e.code === "KeyA" || e.code === "KeyD")) {
            this.records.push({ keyType: "keydown", code: e.code, time: e.timeStamp-this.startTime});
        }
        //按下e，或者超时/死亡，录制结束
        if(this.state === "recording" && (e.code === "KeyE" || ((Date.now()-this.startTime)>5000))){
            this.state = "recordFinish";
            this.finishTime = Date.now();
            this.replayer = new Character(this.startX, this.startY, scene.character.w, scene.character.h);
            scene.addReplayer(this.replayer);
            //console.log("record finished!")
        }
        //不满意录制结果，按下e重新录制
        if(this.state === "recordFinish" && e.code === "KeyE") {
            this.state = "noRecord";
            scene.removeReplayer(this.replayer);
            this.records.length = 0;//clear records
            
        }


        //录制结束，按下r键开始回放
        if(this.state === "recordFinish" && e.code === "KeyR") {
            this.state = "replaying";
            this.replayStartTime = Date.now();
            this.emitEvent();
            //
        }
        //再次按下r键或者时间结束回到recordfinish状态
        if(this.state === "replaying" && (e.code === "KeyR" || ((Date.now()-this.replayStartTime)>(this.finishTime-this.startTime)))) {
            this.state = "recordFinish";
            //过去的自己回到原位，等待下一次回放
            this.replayer.x = this.startX;
            this.replayer.y = this.startY;
            
        }        

    }

    onKeyUp(e) {
        if(this.state === "recording" && (e.code === "KeyW" || e.code === "KeyA" || e.code === "KeyD")) {
            this.records.push({ keyType: "keyup", code: e.code, time: e.timeStamp-this.startTime});
        }
    }

    dispatchEvent() {
        for(const record of this.records) {
            setTimeout(() => this.triggerKey(record), record[time]);
        }
    }

    triggerKey(record){
        const event = new KeyboardEvent(record[keyType], { code: record[code], replayerID: 1 } )//创建键盘事件
        window.dispatchEvent(event);//发布键盘事件

    }
}