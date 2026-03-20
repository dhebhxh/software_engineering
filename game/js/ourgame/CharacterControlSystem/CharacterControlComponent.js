class CharacterControlComponent {
    constructor() {
        this.velocityX;
        this.velocityY;
        this.accelerationX;
        this.accelerationY;
    }
}

class BasicControlComponent extends CharacterControlComponent {
    constructor() {
        this.isOnGround;
    }
}

class ComplexControlComponent extends CharacterControlComponent {
    constructor() {
        this.isGrabbing;
        this.isOnGround;
    }
}