class CharacterController {//多例模式，每个可操控角色拥有一个实例，比如主角、过去自己、敌人、ai控制）
    constructor(controlMode) {
        this.controlMode = controlMode;
        window.addEventListener("keydown", (event) => this.controlPipeline(event));
        window.addEventListener("keyup", (event) => this.controlPipeline(event));
    }

    switchMode(controlMode) {
        this.controlMode = controlMode;
    }

    getControlMOde() {
        return this.controlMode;
    }
    
    controlPipeline(event) {

        const processedEvent = this.controlMode.eventHandler(event);//输入层

        const intent = this.controlMode.eventToIntent(processedEvent);//意图层

        const action = this.controlMode.intentToAction(intent);//动作层

        this.controlMode.actionToPhysics(action);//物理层
        //链式调用
        // this.controlMode
        //         .eventHandler(event)
        //         .eventToIntent()
        //         .intentToAction()
        //         .actionToPhysics();

    }
}

