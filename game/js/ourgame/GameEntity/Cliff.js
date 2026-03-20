class Cliff extends GameEntity {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.collider = new Rectangle(ColliderType.TRIGGER, 100, 50);
    }
    collideResponse() {

    }
}