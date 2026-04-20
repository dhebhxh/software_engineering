import { Player, Ground, Wall, Portal, Button, Enemy } from "../GameEntityModel/index.js";
import { CollisionSystem } from "../CollideSystem/CollisionSystem.js";
import { PhysicsSystem } from "../PhysicsSystem/PhysicsSystem.js";
import { RecordSystem } from "../RecordSystem/RecordSystem.js";
import { BaseLevel } from "./BaseLevel.js";
import { RecordPlayState } from "../RecordSystem/RecordPlayState.js";

export class Level4 extends BaseLevel {
    constructor(p, eventBus) {
        super(p, eventBus);
        this.bgAssetKey = "bgImageLevel2";
        const wallThickness = 20;

        // 左右墙
        this.entities.add(new Wall(0, 0, wallThickness, p.height));
        this.entities.add(new Wall(p.width - wallThickness, 0, wallThickness, p.height));

        // 地面
        this.mainGround = new Ground(0, 0, p.width, 80);
        this.entities.add(this.mainGround);

        // ===== 平台（整体拉长，避免守卫掉落）=====
        this.groundP0 = new Ground(140, 130, 190, 30, true);   // 按钮1
        this.groundP1 = new Ground(400, 220, 210, 30, true);   // 按钮2
        this.groundP2 = new Ground(640, 300, 320, 30, true);   // 按钮3 + 守卫1
        this.groundP3 = new Ground(980, 440, 300, 30, true);   // 按钮4 + 守卫2
        this.groundP4 = new Ground(1180, 580, 120, 25, true);  // 终点前平台

        // 辅助平台
        this.helperA = new Ground(250, 500, 110, 24, true);
        this.helperB = new Ground(610, 180, 120, 24, true);
        this.helperC = new Ground(930, 250, 120, 24, true);

        this.entities.add(this.groundP0);
        this.entities.add(this.groundP1);
        this.entities.add(this.groundP2);
        this.entities.add(this.groundP3);
        this.entities.add(this.groundP4);
        this.entities.add(this.helperA);
        this.entities.add(this.helperB);
        this.entities.add(this.helperC);

        // ===== 按钮 =====
        this.button1 = new Button(220, 160, 22, 5);
        this.button2 = new Button(500, 250, 22, 5);
        this.button3 = new Button(790, 330, 22, 5);
        this.button4 = new Button(1120, 470, 22, 5);

        this.entities.add(this.button1);
        this.entities.add(this.button2);
        this.entities.add(this.button3);
        this.entities.add(this.button4);

        // 终点门
        this.portal = new Portal(1210, 610, 50, 50);
        this.entities.add(this.portal);

        this.buttonSolved = {
            b1: false,
            b2: false,
            b3: false,
            b4: false,
        };

        // 玩家
        const player = new Player(60, 80, 40, 40);
        player.createListeners();
        this.entities.add(player);

        // 录制系统
        this.recordSystem = new RecordSystem(
            player,
            5000,
            (x, y) => this.addReplayer(x, y),
            () => this.removeReplayer()
        );
        this.recordSystem.createListeners();

        // 守卫列表
        this.guards = [];

        // 守卫1：看守按钮3
        this.guard1 = this.createGuard({
            x: 760,
            y: 360,
            patrolLeft: 740,
            patrolRight: 860,
            guardButton: "b3",
        });

        // 守卫2：看守按钮4
        this.guard2 = this.createGuard({
            x: 1030,
            y: 490,
            patrolLeft: 1070,
            patrolRight: 1185,
            guardButton: "b4",
        });

        // 系统
        this.physicsSystem = new PhysicsSystem(this.entities);
        this.collisionSystem = new CollisionSystem(this.entities, eventBus);
    }

    createGuard({ x, y, patrolLeft, patrolRight, guardButton }) {
        const guard = new Enemy(x, y, 36, 36, 1.15);

        guard.aiMode = "patrol";
        guard.homeX = x;
        guard.homeY = y;
        guard.patrolLeft = patrolLeft;
        guard.patrolRight = patrolRight;
        guard.patrolDir = 1;
        guard.aggroRange = 220;
        guard.verticalTolerance = 55;
        guard.guardButton = guardButton;
        guard.lostTargetTimer = 0;

        this.guards.push(guard);
        this.entities.add(guard);
        return guard;
    }

    updatePhysics() {
        this.updateGuardsAI();

        for (const entity of this.entities) {
            if (!this.guards.includes(entity) && entity.update && typeof entity.update === "function") {
                entity.update(this.p);
            }
        }

        if (this.physicsSystem && typeof this.physicsSystem.physicsEntry === "function") {
            this.physicsSystem.physicsEntry();
        }

        this.keepGuardsInsidePatrolRange();
    }

    updateCollision(p = this.p, eventBus = this.eventBus) {
        this.collisionSystem.collisionEntry(eventBus);

        this.checkGuardsHitReplayer();
        this.checkGuardsHitPlayer(eventBus);

        if (this.button1.isPressed) {
            this.buttonSolved.b1 = true;
            this.button1.solved = true;
        }
        if (this.button2.isPressed) {
            this.buttonSolved.b2 = true;
            this.button2.solved = true;
        }
        if (this.button3.isPressed) {
            this.buttonSolved.b3 = true;
            this.button3.solved = true;
        }
        if (this.button4.isPressed) {
            this.buttonSolved.b4 = true;
            this.button4.solved = true;
        }

        if (
            this.buttonSolved.b1 &&
            this.buttonSolved.b2 &&
            this.buttonSolved.b3 &&
            this.buttonSolved.b4
        ) {
            this.portal.openPortal();
        }
    }

    updateGuardsAI() {
        if (!this.guards || this.guards.length === 0) return;

        if (this.recordSystem.state === RecordPlayState.Recording) {
            for (const guard of this.guards) {
                if (!guard) continue;
                guard.movementComponent.velX = 0;
            }
            return;
        }

        const player = this.referenceOfPlayer();
        const replayer = this.referenceOfReplayer();

        for (const guard of this.guards) {
            if (!guard) continue;

            if (typeof guard.tickAIState === "function") {
                guard.tickAIState();
            }

            const target = this.pickGuardTarget(guard, player, replayer);

            if (target) {
                guard.aiMode = "chase";
                guard.lostTargetTimer = 18;
                this.moveGuardTowardX(guard, target.x);
            } else {
                if (guard.lostTargetTimer > 0) {
                    guard.lostTargetTimer--;
                    this.moveGuardTowardX(guard, guard.homeX);
                } else {
                    guard.aiMode = "patrol";
                    this.patrolGuard(guard);
                }
            }
        }
    }

    pickGuardTarget(guard, player, replayer) {
        // 优先追实体分身
        if (replayer && replayer.isReplaying && this.isTargetVisibleToGuard(guard, replayer)) {
            return replayer;
        }

        // 没有实体分身时，再追玩家
        if (player && this.isTargetVisibleToGuard(guard, player)) {
            return player;
        }

        return null;
    }

    isTargetVisibleToGuard(guard, target) {
        if (!guard || !target || !target.collider) return false;

        const dx = Math.abs((target.x + target.collider.w / 2) - (guard.x + guard.collider.w / 2));
        const dy = Math.abs(target.y - guard.y);

        // 只在同一平台附近的小范围内追击
        const withinX = dx <= guard.aggroRange;
        const withinY = dy <= guard.verticalTolerance;

        return withinX && withinY;
    }

    patrolGuard(guard) {
        if (!guard) return;

        if (guard.x <= guard.patrolLeft) {
            guard.patrolDir = 1;
        }
        if (guard.x >= guard.patrolRight) {
            guard.patrolDir = -1;
        }

        guard.movementComponent.velX = guard.patrolDir * guard.speed;
    }

    moveGuardTowardX(guard, targetX) {
        const centerX = guard.x + guard.collider.w / 2;
        const dx = targetX - centerX;

        if (Math.abs(dx) < 6) {
            guard.movementComponent.velX = 0;
            return;
        }

        guard.movementComponent.velX = dx > 0 ? guard.speed : -guard.speed;
    }

    keepGuardsInsidePatrolRange() {
        for (const guard of this.guards) {
            if (!guard || !guard.collider) continue;

            // 不让守卫离开自己的巡逻台太远
            if (guard.x < guard.patrolLeft - 10) {
                guard.x = guard.patrolLeft - 10;
                guard.movementComponent.velX = 0;
                guard.patrolDir = 1;
            }

            if (guard.x + guard.collider.w > guard.patrolRight + 10) {
                guard.x = guard.patrolRight + 10 - guard.collider.w;
                guard.movementComponent.velX = 0;
                guard.patrolDir = -1;
            }
        }
    }

    checkGuardsHitReplayer() {
        const replayer = this.referenceOfReplayer();
        if (!replayer || !replayer.isReplaying) return;

        for (const guard of this.guards) {
            if (!guard) continue;

            if (this.isOverlap(guard, replayer)) {
                // 先删掉守卫
                this.entities.delete(guard);

                // 从 guards 数组里移除
                this.guards = this.guards.filter(g => g !== guard);

                // 再删掉实体分身
                this.removeReplayer();

                // 同步系统实体集合
                this.syncSystemsEntities();
                return;
            }
        }
    }

    checkGuardsHitPlayer(eventBus = this.eventBus) {
        const player = this.referenceOfPlayer();
        if (!player) return;

        for (const guard of this.guards) {
            if (!guard) continue;

            if (this.isOverlap(guard, player)) {
                player.triggerDeath("enemy");
                eventBus.publish("autoResult", "lose");
                return;
            }
        }
    }

    isOverlap(a, b) {
        if (!a || !b || !a.collider || !b.collider) return false;

        return (
            a.x < b.x + b.collider.w &&
            a.x + a.collider.w > b.x &&
            a.y < b.y + b.collider.h &&
            a.y + a.collider.h > b.y
        );
    }

    draw(p = this.p) {
        for (const entity of this.entities) {
            if (entity.type === "ground") {
                entity.draw(p);
            }
        }

        for (const entity of this.entities) {
            if (entity.type !== "ground") {
                entity.draw(p);
            }
        }

        this.recordSystem.draw && this.recordSystem.draw(p);

        this.button1.releaseButton();
        this.button2.releaseButton();
        this.button3.releaseButton();
        this.button4.releaseButton();

        this.drawSolvedHint(p);
    }

    drawSolvedHint(p = this.p) {
        p.push();
        p.scale(1, -1);
        p.fill(255);
        p.textSize(16);

        p.text(`B1: ${this.buttonSolved.b1 ? "OK" : "..."}`, 80, -40);
        p.text(`B2: ${this.buttonSolved.b2 ? "OK" : "..."}`, 180, -40);
        p.text(`B3: ${this.buttonSolved.b3 ? "OK" : "..."}`, 280, -40);
        p.text(`B4: ${this.buttonSolved.b4 ? "OK" : "..."}`, 380, -40);
        p.pop();
    }
}