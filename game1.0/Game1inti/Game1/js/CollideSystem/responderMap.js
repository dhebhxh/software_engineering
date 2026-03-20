import { ColliderShape, ColliderType } from "./enumerator.js";

export const responderMap = {
    "DYNAMIC-STATIC": (a, msg) => basicBlockResponse(a, msg),
    "DYNAMIC-DYNAMIC": (a, b, msg) => dynDynBlockResponse(a, b, msg),
}

function basicBlockResponse(a, msg) {
    if(msg === "left" || msg === "right") {
        a.movementComponent.velX = 0;
    } else {
        a.movementComponent.velY = 0;
        if(msg === "bottom") {
            a.controllerManager.currentControlComponent.abilityCondition["isOnGround"] = true;
        }
    }
}

function dynDynBlockResponse(a, b, msg) {
    if(msg === "left" || msg === "right") {
        a.movementComponent.velX = 0;
        b.movementComponent.velX = 0;
    } else {
        a.movementComponent.velY = 0;
        a.movementComponent.velY = 0;
    }
}