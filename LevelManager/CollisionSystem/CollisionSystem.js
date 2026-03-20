class CollisionSystem {
    constructor() {

    }

    collisionDetect() {
        this.detectPlayerPortal();
        this.detectPlayerSpike();
    }

    detectPlayerPortal() {
        if(isCollied = true){
            this.levelMangaer.gameEnd("win");
        } else {
            return false;
        }
    }
    detectPlayerSpike() {
        if(isCollied = true) {
            this.levelManager.gameEnd("lose");
        } else {
            return true;
        }
    }
}
