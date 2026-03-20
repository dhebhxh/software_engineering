import { Level1, Level2 } from "./Level.js";

export class LevelManager {
    constructor() {
        this.levelMap = {
            "level1": Level1,
            "level2": Level2,
        }
        this.level = null;//生命周期和loadlevel，unloadlevel一致
    }
    loadLevel(levelIndex) {
        if(!this.level) {
            const LevelClass = this.levelMap[levelIndex];
            this.level = new LevelClass();
        }
    }
    unloadLevel() {
        if(this.level) {
            this.level.clearLevel();
            this.level = null;
        }
        
    }
    update() {
        if(this.level) {
            this.flipY();// every frame flip y axis
            this.level.clearCanvas();
            this.level.draw();
            this.level.updatePhysics();
            this.level.updateCollision();
        }
    }
    flipY() {
        sketch.translate(0, sketch.height);
        sketch.scale(1, -1);
    }
}