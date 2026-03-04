const ColliderType = Object.freeze({
    DYNAMIC: "dynamic",
    STATIC: "static",
    TRIGGER: "trigger"
});

const ColliderShape = Object.freeze({
    RECTANGLE: "rectangle",
    CIRCLE: "circle"
});

class Collider {
    constructor(colliderType, colliderShape) {
        this.colliderType = colliderType;
        this.colliderShape = colliderShape;
    }
}

class Rectangle extends Collider {
    constructor(colliderType, w, h) {
        super(colliderType, ColliderShape.RECTANGLE);
        this.w = w;
        this.h = h;
    }
}

class Circle extends Collider{
    constructor(colliderType, r) {
        super(colliderType,ColliderShape.CIRCLE);
        this.r = r;
    }
}
