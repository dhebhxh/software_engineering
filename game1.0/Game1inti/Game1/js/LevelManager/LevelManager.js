import { Level1, Level2 } from "./Level.js";

const levelMap = {
    1: Level1,
    2: Level2,
    //......
}

export class LevelManager {
    constructor() {
        this.currentLevel = null;
    }

    levelEntry(levelIndex) {
        const canvas = sketch.createCanvas(960, 540);
        canvas.parent("#game-area");

        const LevelClass = levelMap[levelIndex];
        this.currentLevel = new LevelClass();
    }

    update() {
        if(this.currentLevel) {
            this.flipY();// every frame flip y axis
            this.currentLevel.clearCanvas();
            this.currentLevel.updatePhysics();
            this.currentLevel.updateCollision();
            this.currentLevel.draw();
        }
    }
    
    levelExit() {
        //去掉画布，修改currentlevel，关闭监听
        //发布关卡结束，切换ui的事件
    }

    flipY() {
        sketch.translate(0, sketch.height);
        sketch.scale(1, -1);
    }
}