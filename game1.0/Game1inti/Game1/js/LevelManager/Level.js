//import all game entity classes
import { Player, Replayer, Ground, Wall, Home, Cliff } from "../GameEntityModel/index.js";
import { CollisionSystem } from "../CollideSystem/CollisionSystem.js";
import { PhysicsSystem } from "../PhysicsSystem/PhysicsSystem.js";
class BaseLevel {
    constructor() {

    }
    clearCanvas() {

    }
    updatePhysics() {

    }
    updateCollision() {

    }
    updateAnimation() {

    }
    draw() {
        
    }

}
export class Level1 extends BaseLevel {
    constructor() {
        super();
        this.gameEntities = [];
        this.gameEntities.push(new Ground(0, 0, sketch.width, 80));
        this.gameEntities.push(new Ground(600, 80, 200, 230));
        this.gameEntities.push(new Home(700, 310, 50, 70));
        this.gameEntities.push(new Wall(-10, 0, 15, sketch.height));
        this.gameEntities.push(new Wall(900, 0, sketch.width-900, sketch.height));
        this.gameEntities.push(new Player(50, 450, 40, 40));

        this.PhysicsSystem = new PhysicsSystem(this.gameEntities);
        this.collisionSystem = new CollisionSystem(this.gameEntities);
    }
    
    clearCanvas() {
        sketch.background(220);
    }
    
    updatePhysics() {
        this.PhysicsSystem.physicsEntry();
    }

    updateCollision() {
        this.collisionSystem.collisionEntry();
    }

    
    draw() {
        for(const entity of this.gameEntities) {
            entity.draw();
        }
    }

}
export class Level2 extends BaseLevel {

}