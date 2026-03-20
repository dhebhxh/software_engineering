class Level1 {
    constructor() {
        this.entities = [];
        this.entities.push(new Home());
        this.entities.push(new Player());
        this.entities.push(new Platform());
        this.entities.push(new Platform());

        this.physicsSystem = new PhysicsSystem(this.entities);
        this.collisionSystem = new CollisionSystem(this.entities);
        this.drawSystem = new DrawSystem(this.entities);
    }
    updatePhysics() {
        this.physicsSystem.update();
    }
    updateCollision() {
        this.collisionSystem.update();
    }
    updateDraw() {
        this.drawSystem.update();
    }
    destory(){
        //监听器
        //定时器
    }
}