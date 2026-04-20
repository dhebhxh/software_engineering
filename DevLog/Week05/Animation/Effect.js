/**
 * Effect
 * ----------------
 * 表示特效动画，例如：
 * 分身出现的光效
 * 子弹发射特效
 * 角色死亡特效
 * 。。。
 */
class Effect {

    constructor(x, y, lifetime) {
        this.x = x;
        this.y = y;

        this.lifetime = lifetime;
    }

    update(dt) {

        this.lifetime -= dt;
    }

    render() {

        // 在这里绘制特效
    }

}