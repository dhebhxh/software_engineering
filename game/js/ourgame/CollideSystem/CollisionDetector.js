class CollisionDetector {
    constructor() {
        this.detectionTable = new Map();

        this.detectionTable.set(ColliderShape.RECTANGLE|ColliderShape.RECTANGLE, (a, b) => this.checkRectVsRect(a, b));
        this.detectionTable.set(ColliderShape.RECTANGLE|ColliderShape.CIRCLE, (a, b) => this.checkRectVsCircle(a, b));
        this.detectionTable.set(ColliderShape.CIRCLE|ColliderShape.RECTANGLE, (a, b) => this.checkRectVsCircle(b, a));
        this.detectionTable.set(ColliderShape.CIRCLE|ColliderShape.CIRCLE, (a, b) => this.checkCircleVsCircle(a, b));
    }
    get(key) {
        return this.detectionTable.get(key);
    }
    checkRectVsRect(rectA, rectB) {

    }
    checkCircleVsCircle(circleA, circleB) {

    }
    checkRectVsCircle(rect, circle) {

    }

}
//待整理废稿：
    // collideTestRectRect(r1, r2) {
    //     let result = false;
        
    //     let vx = r1.getCenterX() - r2.getCenterX();
    //     let vy = r1.getCenterY() - r2.getCenterY();

    //     let combinedHalfWidths = r1.getHalfWidth() + r2.getHalfWidth();
    //     let combinedHalfHeights = r1.getHalfHeight() + r2.getHalfHeight();

    //     if(Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
    //         result = true;
    //     }
    
        
    //     return result;
    // }