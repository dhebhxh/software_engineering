import { ColliderShape, ColliderType } from "./enumerator.js";

export const resolverMap = {
    // "DYNAMIC-DYNAMIC": (a, b) => resolveBoth(a, b),
    "DYNAMIC-STATIC-RECTANGLE-RECTANGLE": (a, b) => resolveFirst(a, b),
    "DYNAMIC-DYNAMIC-RECTANGLE-RECTANGLE": (a, b) => resolveDynDyn(a, b),
}

function resolveFirst(a, b) {
    let  collisionMsg= "";

    let vectorX = (a.x+a.collider.w/2) - (b.x+b.collider.w/2);
    let vectorY = (a.y+a.collider.h/2) - (b.y+b.collider.h/2);

    let combinedHalfWidths = a.collider.w/2 + b.collider.w/2;
    let combinedHalfHeights = a.collider.h/2 + b.collider.h/2;

    //collision happened
    let overlapX = combinedHalfWidths - Math.abs(vectorX);
    let overlapY = combinedHalfHeights - Math.abs(vectorY);

    if(overlapX <= overlapY) {
        if(vectorX > 0) {
            collisionMsg = "left";
            a.x = a.x + overlapX;
        } else {
            collisionMsg = "right";
            a.x = a.x - overlapX;
        }
    } else {
        if(vectorY > 0) {
            collisionMsg = "bottom"
            a.y = a.y + overlapY;
        } else {
            collisionMsg = "top"
            a.y = a.y - overlapY;
        }
    }
    return collisionMsg;
}

function resolveDynDyn(a, b) {
    let  collisionMsg= "";

    let vectorX = (a.x+a.collider.w/2) - (b.x+b.collider.w/2);
    let vectorY = (a.y+a.collider.h/2) - (b.y+b.collider.h/2);

    let combinedHalfWidths = a.collider.w/2 + b.collider.w/2;
    let combinedHalfHeights = a.collider.h/2 + b.collider.h/2;

    //collision happened
    let overlapX = combinedHalfWidths - Math.abs(vectorX);
    let overlapY = combinedHalfHeights - Math.abs(vectorY);

    let totalX, weightAX, weightBX;
    totalX = Math.abs(a.movementComponent.velX) + Math.abs(b.movementComponent.velX);
    weightAX = Math.abs(a.movementComponent.velX) / totalX;
    weightBX = Math.abs(b.movementComponent.velX) / totalX;

    let totalY, weightAY, weightBY;
    totalY = Math.abs(a.movementComponent.velY) + Math.abs(b.movementComponent.velY);
    weightAY = Math.abs(a.movementComponent.velY) / totalY;
    weightBY = Math.abs(b.movementComponent.velY) / totalY;

    if (overlapX < overlapY) {
        // 水平碰撞 → 看 vx

        if (vectorX > 0) {
            collisionMsg = "left";
            a.x += overlapX * weightAX;
            b.x -= overlapX * weightBX;
        } else {
            collisionMsg = "right";
            a.x -= overlapX * weightAX;
            b.x += overlapX * weightBX;
        }

    } else {
        // 垂直碰撞 → 看 vy
        if (vectorY > 0) {
            collisionMsg = "bottom";
            a.y += overlapY * weightAY;
            b.y -= overlapY * weightBY;
        } else {
            collisionMsg = "top"
            a.y -= overlapY * weightAY;
            b.y += overlapY * weightBY;
        }
    }

    return collisionMsg;
}