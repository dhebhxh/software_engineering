import { Character } from "./Character.js";
import { MovementComponent } from "../PhysicsSystem/MovementComponent.js";
import { RectangleCollider } from "../CollideSystem/CollideComponent.js";
import { ColliderType } from "../CollideSystem/enumerator.js";

export class Enemy extends Character {
    constructor(x, y, w = 36, h = 36, speed = 1.2) {
        super(x, y);
        this.type = "enemy";
        this.w = w;
        this.h = h;

        // 给怪物加重力，不然一跳会飞走
        this.movementComponent = new MovementComponent(0, 0, 0, -0.4);
        this.collider = new RectangleCollider(ColliderType.DYNAMIC, w, h);

        this.speed = speed;
        this.target = null;
        this.zIndex = 5;

        this.jumpCooldown = 0;
    }

    setTarget(target) {
        this.target = target;
    }

    tickAIState() {
        if (this.jumpCooldown > 0) {
            this.jumpCooldown--;
        }
    }

    jump(force = 9) {
        if (this.jumpCooldown > 0) return;
        this.movementComponent.velY = force;
        this.jumpCooldown = 18;
    }

    update() {
        // 这里先留空，AI 已经放到 Level4 里了
    }

    draw(p) {
        p.push();
        p.noStroke();
        p.fill(180, 60, 200);
        p.rect(this.x, this.y, this.w, this.h);
        p.pop();
    }
}