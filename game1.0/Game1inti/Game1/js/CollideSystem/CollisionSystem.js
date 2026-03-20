import { detectorMap } from "./detectorMap.js";
import { resolverMap } from "./resolverMap.js";
import { responderMap } from "./responderMap.js";

export class CollisionSystem {
    constructor(entities) {
        this.entities = entities;
        this.dynamicEntities = [];
        this.staticEntities = [];
        this.triggerEntities = [];
        this.partitionEntitiesByType();
    }

    collisionEntry() {
        for(const dyn of this.dynamicEntities) {
            for(const sta of this.staticEntities) {
                this.processDynamicStaticPair(dyn, sta);
            }
        }

        // for(const dynA of this.dynamicEntities) {
        //     for(const dynB of this.dynamicEntities) {
        //         this.processDynamicDynamicPair(dynA, dynB);
        //     }
        // }

        // for(const dyn of this.dynamicEntities) {
        //     for(const tri of this.triggerEntities) {
        //         this.processDynamicTriggerPair(dyn, tri);
        //     }
        // }
    }

    setEntities(entities) {
        this.entities = entities;
        this.partitionEntitiesByType();
    }

    partitionEntitiesByType() {
        this.dynamicEntities.length = 0;
        this.staticEntities.length = 0;
        this.triggerEntities.length = 0;

        for(const entity of this.entities) {
            switch(entity.collider.colliderType) {
                case "DYNAMIC":
                    this.dynamicEntities.push(entity);
                    break;
                case "STATIC":
                    this.staticEntities.push(entity);
                    break;
                case "TRIGGER":
                    this.triggerEntities.push(entity);
                    break;
            }
        }
    }

    processDynamicStaticPair(dyn, sta) {
        const dynShape = dyn.collider.colliderShape;
        const staShape = sta.collider.colliderShape;

        const typePair = "DYNAMIC-STATIC";
        const shapePair = `${dynShape}-${staShape}`;
        const fullKey = `${typePair}-${shapePair}`;

        const detectFunc = detectorMap[shapePair];
        const detectResult = detectFunc(dyn, sta);//dynamic-static
        if(detectResult) {//如果发生碰撞，执行if语句，如果没有则跳过
            //第二步：碰撞修复
            const resolveFunc = resolverMap[fullKey];

            const collisionMsg = resolveFunc(dyn, sta);

            const responseFunc = responderMap[typePair];
            responseFunc(dyn, collisionMsg);

        }   
    }

    processDynamicDynamicPair(dynA, dynB) {
        const dynAShape = dynA.collider.colliderShape;
        const dynBShape = dynB.collider.colliderShape;

        const typePair = "DYNAMIC-DYNAMIC";
        const shapePair = `${dynAShape}-${dynBShape}`;
        const fullKey = `${typePair}-${shapePair}`;

        const detectFunc = detectorMap[shapePair];
        const detectResult = detectFunc(dynA, dynB);//dynamic-dynamic

        if(detectResult) {
            const resolveFunc = resolverMap[fullKey];
            const collisionMsg = resolveFunc(dynA, dynB);

            const responseFunc = responderMap[typePair];
            responseFunc(dynA, dynB, collisionMsg);
        }
    }
    processDynamicTriggerPair(dyn, tri) {

    }
}