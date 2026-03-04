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