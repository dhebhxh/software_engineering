class CollisionSystem {
    constructor(objects) {
        this.objects = objects;
        this.detector = new CollisionDetector();
        this.resolver = new CollisionResolver();
        this.responder = new CollisionResponder();
    
        this.detectionFilter;
        this.initialiseDetectionFilter();
        this.resolvationFilter;
        this.initialiseResolvationFilter();
    }
    collisionEntry() {
        for(let i = 0; i < this.objects.length; i++) {
            for(let j = i + 1; j < this.objects.length; j++) {
                this.processPair(this.objects[i], this.objects[j]);
            }
        }
    }
    setObjects(objects) {
        this.objects = objects;
    }
    processPair(objA, objB) {
        const typeA = objA.collider.colliderType;
        const typeB = objB.collider.colliderType;
        
        const shapeA = objA.collider.colliderShape;
        const shapeB = objB.collider.colliderShape;

        if(this.detectionFilter.get(typeA|typeB)) {
            //第一步：碰撞检测
            const detectFunc = this.detector.get(shapeA|shapeB);
            const detectResult = detectFunc(objA, objB);

            if(detectResult) {//如果发生碰撞，执行if语句，如果没有则跳过
                let collisionMsg;

                //第二步：碰撞修复
                if(this.resolvationFilter.get(typeA|typeB)){ //不需要修复的类型跳过，需要修复的执行if语句
                    const resolveFunc = this.resolver.get(typeA|typeB);
                    collisionMsg = resolveFunc(objA, objB);
                }

                //第三步：碰撞响应
                const responseFunc = this.responder.get(objA, objB);
                responseFunc(objA, objB, collisionMsg);
            }
        }
    }
    initialiseDetectionFilter() {
        this.detectionFilter = new Map();
        this.detectionFilter.set(ColliderType.DYNAMIC|ColliderType.DYNAMIC, true);
        this.detectionFilter.set(ColliderType.DYNAMIC|ColliderType.STATIC, true);
        this.detectionFilter.set(ColliderType.DYNAMIC|ColliderType.TRIGGER, true);

        this.detectionFilter.set(ColliderType.STATIC|ColliderType.DYNAMIC, true);
        this.detectionFilter.set(ColliderType.STATIC|ColliderType.STATIC, false);
        this.detectionFilter.set(ColliderType.STATIC|ColliderType.TRIGGER, false);
        
        this.detectionFilter.set(ColliderType.TRIGGER|ColliderType.DYNAMIC, true);
        this.detectionFilter.set(ColliderType.TRIGGER|ColliderType.STATIC, false);
        this.detectionFilter.set(ColliderType.TRIGGER|ColliderType.TRIGGER, false);
    }
    initialiseResolvationFilter() {
        this.resolvationFilter = new Map();
        this.resolvationFilter.set(ColliderType.DYNAMIC|ColliderType.DYNAMIC, true);
        this.resolvationFilter.set(ColliderType.DYNAMIC|ColliderType.STATIC, true);
        this.resolvationFilter.set(ColliderType.DYNAMIC|ColliderType.TRIGGER, false);

        this.resolvationFilter.set(ColliderType.STATIC|ColliderType.DYNAMIC, true);
        this.resolvationFilter.set(ColliderType.TRIGGER|ColliderType.DYNAMIC, false);
    }

}