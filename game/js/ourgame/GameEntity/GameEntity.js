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