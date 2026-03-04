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