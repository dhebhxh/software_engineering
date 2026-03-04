let scene;
function getP5Y(y, h) {
    return height - (y + h);
}
class InputSystem {
    constructor() {
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        window.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    onKeyDown(e) {
        if (e.isTrusted) {
            scene.character.controller.keyDown(e);
        } else {
            if (e.replayerID === 1) {
            scene.replayer.controller.keyDown(e);
            }
        }
    }

    onKeyUp(e) {
        if (e.isTrusted) {
            scene.character.controller.keyUp(e);
        } else {
            if (e.replayerID === 1) {
                scene.replayer.controller.keyUp(e);
            }
        }
    }
    
}

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
    recordDraw(msg) {
            const cx = width / 2; 
            const cy = height * 0.2; 
            const r = 50;
            fill(255, 120, 80, 200);
            stroke(255, 180, 120); 
            strokeWeight(4);
            ellipse(cx, cy, r * 2, r * 2);
            fill(255); 
            textAlign(CENTER, CENTER); 
            textSize(16); 
            noStroke();
            text(msg, cx, cy);
    }
    draw() {
        if(this.state === "recording") { 
            if (Date.now() - this.startTime > 5000) { 
                this.state = "recordFinish"; 
                this.finishTime = Date.now(); 
                this.replayer = new Replayer(this.startX, this.startY, scene.character.w, scene.character.h); 
                scene.addReplayer(this.replayer); 
            } 
        }
        if(this.state === "replaying") {
            if(this.state === "replaying" && ((Date.now()-this.replayStartTime)>(this.finishTime-this.startTime))) {
                this.state = "recordFinish";
                this.replayer.reset(this.startX, this.startY);
            }        
        }

        if(this.state === "noRecord") {
            this.recordDraw("按E键\n开始录制");
        } else if(this.state === "recording") {
            this.recordDraw("正在录制");
        } else if(this.state === "recordFinish") {
            this.recordDraw("录制完成\n按R键回放\n按Q键清空录制");
        } else if (this.state === "replaying") {
            this.recordDraw("回放中");
        }
    }
    onKeyDown(e) {
        
        if(this.state ==="noRecord" && e.code === "KeyE") {
            this.state = "recording";
            this.startTime = Date.now();
            this.startX = scene.character.x;
            this.startY = scene.character.y;
            
        }
        
        if(this.state === "recording" && (e.code === "KeyW" || e.code === "KeyA" || e.code === "KeyD")) {
            this.records.push({ keyType: "keydown", code: e.code, time: Date.now()-this.startTime});
        }
        
        if(this.state === "recordFinish" && e.code === "KeyQ") {
            this.state = "noRecord";
            scene.removeReplayer(this.replayer);
            this.records.length = 0;
            
        }

        if(this.state === "recordFinish" && e.code === "KeyR") {
            this.state = "replaying";
            this.replayStartTime = Date.now();
            this.dispatchEvent();
            
        }
        
       

    }

    onKeyUp(e) {
        if(this.state === "recording" && (e.code === "KeyW" || e.code === "KeyA" || e.code === "KeyD")) {
            this.records.push({ keyType: "keyup", code: e.code, time: Date.now()-this.startTime});
        }
    }

    dispatchEvent() {
        for(const record of this.records) {
            setTimeout(() => this.triggerKey(record), record["time"]);
        }
    }

    triggerKey(record){
        const event = new KeyboardEvent(record["keyType"], { code: record["code"] } )//创建键盘事件

        Object.defineProperty(event, "replayerID", { value: 1 });

        window.dispatchEvent(event);//发布键盘事件

    }
}

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

class CollideSystem {
    
    static collideTestRectRect(r1, r2) {
        let result = false;
        
        let vx = r1.getCenterX() - r2.getCenterX();
        let vy = r1.getCenterY() - r2.getCenterY();

        let combinedHalfWidths = r1.getHalfWidth() + r2.getHalfWidth();
        let combinedHalfHeights = r1.getHalfHeight() + r2.getHalfHeight();

        if(Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
            result = true;
        }
    
        
        return result;
    }

    static correctPosition(r1, r2) {
        let collisionSide = "";
        if(this.collideTestRectRect(r1, r2)) {
            
            let vx = r1.getCenterX() - r2.getCenterX();
            let vy = r1.getCenterY() - r2.getCenterY();

            let combinedHalfWidths = r1.getHalfWidth() + r2.getHalfWidth();
            let combinedHalfHeights = r1.getHalfHeight() + r2.getHalfHeight();

            //collision happened
            let overlapX = combinedHalfWidths - Math.abs(vx);
            let overlapY = combinedHalfHeights - Math.abs(vy);

            if(overlapX < overlapY) {
                if(vx > 0) {
                    collisionSide = "left";
                    r1.x = r1.x + overlapX;
                } else {
                    collisionSide = "right";
                    r1.x = r1.x - overlapX;
                }
            } else {
                if(vy > 0) {
                    collisionSide = "bottom"
                    r1.y = r1.y + overlapY;
                } else {
                    collisionSide = "top"
                    r1.y = r1.y - overlapY;
                }
            }
        }
        return collisionSide;
    }
}

class GameEntity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }
    getX() { return this.x; }
    getY() { return this.y; }
    
    getWidth() { return this.w; }
    getHeight() { return this.h; }

    getHalfWidth() { return this.w/2 ; }
    getHalfHeight() { return this.h/2 ; }
    
    getCenterX() { return this.x + this.getHalfWidth(); }
    getCenterY() { return this.y + this.getHalfHeight(); }

    getP5X() {
        return this.x;
    }
    getP5Y() {
        return height - (this.y + this.h);
    }

}

class Character extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.velX = 0;
        this.velY = 0;
        this.accY = 0;

        this.controller = new Controller();
        this.moveSpeed = 5;
        this.jumpSpeed = 10;
        this.speedLimit = 5;
        this.gravity = -0.5;
        this.isOnGround = true;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velX = 0;
        this.velY = 0;
        this.accY = 0;
        this.isOnGround = true;
        this.controller.moveLeft = false;
        this.controller.moveRight = false;
        this.controller.jump = false;
        this.controller.wKeyDownCallbackExecutable = true;
    }

    draw() {
        fill(102, 204, 255);
        rect(this.x, height - (this.y+(this.h-this.w/2)), this.w, this.h-this.w/2);
        ellipse(this.x + this.w/2, height - (this.y+(this.h-this.w/2)), this.w, this.w);
        fill(65, 40, 20);
        ellipse(this.x + this.w/3, height -(this.y+(this.h-this.w/2)), 10, 10);
        ellipse(this.x + 2*this.w/3, height -(this.y+(this.h-this.w/2)), 10, 10);
        fill(245, 245, 245);
        ellipse(this.x + this.w/3 + 1.8, height -(this.y+(this.h-this.w/2)), 5, 5);
        ellipse(this.x + 2*this.w/3 + 1.8, height -(this.y+(this.h-this.w/2)),5,5);
    }

    update() {
        if(!this.isOnGround) {
            this.accY = this.gravity;
        }
        //convert intention to velocity or acceleration
        if(this.controller.jump && this.isOnGround) {
            this.isOnGround = false;
            this.controller.jump = false;
            this.velY = this.jumpSpeed;
            this.accY = this.gravity;
        }
        if(this.controller.moveLeft && !this.controller.moveRight) {
          this.velX = -this.moveSpeed;
        } else if(!this.controller.moveLeft && this.controller.moveRight) {
          this.velX = this.moveSpeed;
        } else if(!this.controller.moveLeft && !this.controller.moveRight) {
          this.velX = 0;
        }
        //update velocity
        this.velY = this.velY + this.accY;
        //update position
        this.x = this.x + this.velX;
        this.y = this.y + this.velY;
    }

    collideResponse(collideSide) {
        switch(collideSide) {
            case "bottom": 
                this.velY = 0;
                this.accY = 0;
                this.isOnGround = true;
                break;
            case "top":
                this.velY = 0;
                break;
            case "right":
                this.velX = 0;
                break;
            case "left":
                this.velX = 0;
                break;
        }
                
    }
  
}

class Replayer extends Character {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    draw() {
        fill(255, 120, 80);
        rect(this.x, height - (this.y+(this.h-this.w/2)), this.w, this.h-this.w/2);
        ellipse(this.x + this.w/2, height - (this.y+(this.h-this.w/2)), this.w, this.w);
        fill(65, 40, 20);
        ellipse(this.x + this.w/3, height -(this.y+(this.h-this.w/2)), 10, 10);
        ellipse(this.x + 2*this.w/3, height -(this.y+(this.h-this.w/2)), 10, 10);
        fill(245, 245, 245);
        ellipse(this.x + this.w/3 + 1.8, height -(this.y+(this.h-this.w/2)), 5, 5);
        ellipse(this.x + 2*this.w/3 + 1.8, height -(this.y+(this.h-this.w/2)),5,5);
    }
}

class Cliff extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    collideResponse() {

    }
}

class Ground extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    
    draw() {
        const grassHeight = this.h * 0.2;
        fill(139, 69, 19);
        rect(this.x, getP5Y(this.y, this.h) + grassHeight, this.w, this.h - grassHeight);

        fill(34, 139, 34);
        rect(this.x, getP5Y(this.y, this.h), this.w, grassHeight);
    }

    collideResponse(collideSide) {
        //什么都不做
    }
}

class wall extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    
    draw() {

    }
    
    collideResponse(collideSide) {

    }
}

class Home extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    
    draw() {
        stroke(80, 40, 20);
        strokeWeight(4);
        fill(160, 82, 45);
        rect(this.x, getP5Y(this.y, this.h), this.w, this.h);
        
        noStroke();
        fill(200, 180, 50);
        let handleX = this.x + this.w * 1/3 ;
        let handleY = this.y + this.h * 1/2 ;
        ellipse(handleX, height - handleY, 10, 10);
    }

    collideResponse(collideSide) {
        //什么都不做
    }
}

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

function setup() {
    createCanvas(800, 600);
    background(220);
    home = new Home(700, 80, 50, 70);
    ground1 = new Ground(0, 0, 300, 80);
    ground2 = new Ground(600, 0, 200, 80);
    character = new Character(10, 80, 40, 40);
    platform = new Ground(200, 130, 70, 25);
    wall1 = new Ground(-50, 0, 50, 600);
    wall2 = new Ground(800, 0, 50, 600);
    cliff = new Cliff(300, -50, 300, 50);
    
    scene = new Scene(character, home, ground1, ground2, platform, cliff, wall1, wall2);
}

function draw() {
    background(220);

    scene.character.update();
    if(scene.replayer) {
        scene.replayer.update();
    }
    
    scene.collideUpdate();

    scene.draw();
}

