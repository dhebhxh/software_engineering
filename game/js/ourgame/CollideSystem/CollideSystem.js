class CollideSystem {
    constructor() {
        this.objects = [];
    }

    setObjects(objects) {
        this.objects = objects;
    }

    collisionDetection() {
        for(int i = 0; i < this.objects.length; i++) {
            if(shouldDetection(object1, object2))
        }
    }

    get

    resolvePositionOne(object1, object2) {
        
    }
    
    resolvePositionBoth(object1, object2) {

    }
    collideTestRectRect(r1, r2) {
        let result = false;
        
        let vx = r1.getCenterX() - r2.getCenterX();
        let vy = r1.getCenterY() - r2.getCenterY();

        let combinedHalfWidths = r1.getHalfWidth() + r2.getHalfWidth();
        let combinedHalfHeights = r1.getHalfHeight() + r2.getHalfHeight();

        if(Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
            result = true;
        }
    
        
        return result;
    }

    correctPosition(r1, r2) {
        let collisionSide = "";
        if(this.collideTestRectRect(r1, r2)) {
            
            let vx = r1.getCenterX() - r2.getCenterX();
            let vy = r1.getCenterY() - r2.getCenterY();

            let combinedHalfWidths = r1.getHalfWidth() + r2.getHalfWidth();
            let combinedHalfHeights = r1.getHalfHeight() + r2.getHalfHeight();

            //collision happened
            let overlapX = combinedHalfWidths - Math.abs(vx);
            let overlapY = combinedHalfHeights - Math.abs(vy);

            if(overlapX < overlapY) {
                if(vx > 0) {
                    collisionSide = "left";
                    r1.x = r1.x + overlapX;
                } else {
                    collisionSide = "right";
                    r1.x = r1.x - overlapX;
                }
            } else {
                if(vy > 0) {
                    collisionSide = "bottom"
                    r1.y = r1.y + overlapY;
                } else {
                    collisionSide = "top"
                    r1.y = r1.y - overlapY;
                }
            }
        }
        return collisionSide;
    }
    
}