class Scene {
    constructor(character, home, ground1, ground2, platform, cliff, wall1, wall2) {
        this.entities = [];
        this.character = character;
        this.replayer = null;
        this.home = home;
        this.cliff = cliff;
        this.entities.push(ground1);
        this.entities.push(ground2);
        this.entities.push(platform);
        this.entities.push(wall1);
        this.entities.push(wall2);

        this.recorder = new Recorder();//实例化监听器，监听按键，专门负责控制录制回放状态机
        this.inputHandler = new InputSystem();//实例化监听器，监听按键，分发按键到不同控制器，专门负责控制角色

    }

    draw() {
        this.character.draw();
        this.recorder.draw();
        this.home.draw();
        for(const entity of this.entities) {
            entity.draw();
        }
        if(this.replayer !== null) {
            this.replayer.draw();
        }
    }

    addReplayer(replayer) {
        this.replayer = replayer;
    }
    
    removeReplayer() {
        this.replayer = null;
    }

    collideUpdate() {
        let charIsGround = false;
        if(CollideSystem.collideTestRectRect(this.character, this.cliff)) {
            this.character.reset(10, 80);
        }

        for(const entity of this.entities) {
            
            if(CollideSystem.collideTestRectRect(this.character, entity)) {
                const collideSide = CollideSystem.correctPosition(this.character, entity);
                this.character.collideResponse(collideSide);
                if(collideSide === "bottom") {
                    charIsGround = true;
                }
            }
        }
        
        if(this.replayer){
            let replayerIsGround = false;
            for(const entity of this.entities) {
                if(CollideSystem.collideTestRectRect(this.replayer, entity)) {
                    const collideSide = CollideSystem.correctPosition(this.replayer, entity);
                    this.replayer.collideResponse(collideSide);
                    if(collideSide === "bottom") {
                        replayerIsGround = true;
                    }
                }
            }
                
            if(CollideSystem.collideTestRectRect(this.character, this.replayer)) {
                const collideSide = CollideSystem.correctPosition(this.character, this.replayer);
                this.character.collideResponse(collideSide);
                if(collideSide === "bottom") {
                    charIsGround = true;
                    this.replayer.collideResponse("top");
                } else if (collideSide === "top") {
                    this.replayer.collideResponse("bottom");
                    this.replayerIsGround = true;
                } else if (collideSide === "right") {
                    this.replayer.collideResponse("left");
                } else {
                    this.replayer.collideResponse("right");
                }
                
            }
            this.replayer.isOnGround = replayerIsGround;
        }    
        this.character.isOnGround = charIsGround;
    }

}