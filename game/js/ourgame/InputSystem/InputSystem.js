class InputSystem {
    constructor() {
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    onKeyDown(e) {
        if(e.isTrusted === true){
            scene.character.controller.keyDown(e);
        } else {
            scene.replayer.controller.keyDown(e);
        }
    }
    
    onKeyUp(e) {
        if(e.isTrusted === true) {
            scene.character.controller.keyUp(e);
        } else {
            scene.replayer.controller.keyUp(e);
        }
    }
    
}