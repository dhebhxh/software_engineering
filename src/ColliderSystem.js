class ColliderSystem{
    constructor(model, result){
        this.model = model;
        this.result = result;
    }

    colliderEntry(){
        for( entity1 of model){
            for(entity2 of model){
                let newResult = this.colliderDetection(entity1, entity2);
            }
        }
    }
    colliderDetection(entity1, entity2){//gameentity实例的引用
        return //返回这两个实体是否碰撞的布尔值，返回修正信息，比如从哪个方向碰撞
    }

    colliderResponse(){
        //如果人的下方发生碰撞
        //上推
        this.model.character.setVelocityY(0);
        this.model.character.setAccelerationY(0);
        //如果人的左边发生碰撞
        //右推
        if(this.model.character.getVelocity.y < 0){
            this.model.character.setVelocityX(0);
        }
        //如果人的右边发生碰撞
        //左推
        if(this.model.character.getVelocity.x > 0){
            this.model.character.setVelocityX(0);
        }
        //如果人的上方发生碰撞
        //下推
        this.model.character.setVelocityY(0);
        //如果人的下方没有碰撞
        this.model.character.setAcclerationY("g");
    }
}//返回每一对的碰撞结果和修正信息
