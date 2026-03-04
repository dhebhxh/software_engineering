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
