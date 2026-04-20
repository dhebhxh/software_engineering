/**
 * AnimationSystem
 * ----------------
 * 负责管理游戏中的所有动画和特效。
 * 包括：
 * 1. 更新动画帧
 * 2. 更新特效
 */
class AnimationSystem {

    constructor() {
        this.objects = [];

        this.animations = [];

        this.effects = [];

        this.animator = new Animator();
    }

    
    addAnimation(animation) {
        this.animations.push(animation);
    }

    
    removeAnimation(animation) {
        const index = this.animations.indexOf(animation);

        if (index !== -1) {
            this.animations.splice(index, 1);
        }
    }

    update(dt) {
        for (let animation of this.animations) {
            animation.update(dt);
        }

        for (let effect of this.effects) {
            effect.update(dt);
        }
    }


}