function createCollider(colliderConfig){
    switch(colliderConfig.type){
        case "rect":
            return new RectCollider(colliderConfig.width, colliderConfig.height);
        case "circle":
            return new CircleCollider(colliderConfig.radius);
        default:
            throw new Error("Unknown collider type: " + colliderConfig.type);
    }
}

class Collider{
   constructor(){
    if(new.target === Collider){
        throw new Error("Collider is abstract and connot be instantiated");
    }
   }
   getColliderParams(){
    throw new Error("getParams() must be implemented");
   }
}

class RectCollider extends Collider{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
    getColliderParams(){
        return { type: "rect", width: this.width, height: this.height };
    }
}

class CircleCollider extends Collider{
    constructor(radius){
        super();
        this.radius = radius;
    }
    getColliderParams(){
        return { type: "circle", radius: this.radius };
    }
}