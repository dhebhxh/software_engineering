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