class CollisionResolver {
    constructor() {
        this.resolveTable = new Map();
        this.resolveTable.set(ColliderType.DYNAMIC|ColliderType.DYNAMIC, (a, b) => this.resolveBoth(a, b));
        this.resolveTable.set(ColliderType.DYNAMIC|ColliderType.STATIC, (a, b) => this.resolveFirst(a, b));

        this.resolveTable.set(ColliderType.STATIC|ColliderType.DYNAMIC, (a, b) => this.resolveFirst(b, a));
    }
    get(key) {
        return this.resolveTable.get(key);
    }
    resolveBoth(a, b) {

    }
    resolveFirst(a, b) {

    }
}
//待整理废稿：
   // correctPosition(r1, r2) {
    //     let collisionSide = "";
    //     if(this.collideTestRectRect(r1, r2)) {
            
    //         let vx = r1.getCenterX() - r2.getCenterX();
    //         let vy = r1.getCenterY() - r2.getCenterY();

    //         let combinedHalfWidths = r1.getHalfWidth() + r2.getHalfWidth();
    //         let combinedHalfHeights = r1.getHalfHeight() + r2.getHalfHeight();

    //         //collision happened
    //         let overlapX = combinedHalfWidths - Math.abs(vx);
    //         let overlapY = combinedHalfHeights - Math.abs(vy);

    //         if(overlapX < overlapY) {
    //             if(vx > 0) {
    //                 collisionSide = "left";
    //                 r1.x = r1.x + overlapX;
    //             } else {
    //                 collisionSide = "right";
    //                 r1.x = r1.x - overlapX;
    //             }
    //         } else {
    //             if(vy > 0) {
    //                 collisionSide = "bottom"
    //                 r1.y = r1.y + overlapY;
    //             } else {
    //                 collisionSide = "top"
    //                 r1.y = r1.y - overlapY;
    //             }
    //         }
    //     }
    //     return collisionSide;
    // }
    