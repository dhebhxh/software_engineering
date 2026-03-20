class LevelManager {
    constructor() {
        this.recordSystem = new RecordSystem();
        this.controllerManager = new ControllerManager();
    }
    startReplay() {
        //伪代码
        if(this.recordSystem.canReplay === true) {
            const clip = this.recordSystem.getClip();
            this.controllerManager.controlEntry(clip);
        }
    }
}