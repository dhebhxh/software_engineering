/**
 * CharacterAnimation
 * ----------------
 * 控制角色动画状态，例如：
 * IDLE / RUN / JUMP
 * 像是一个状态机 决定播放哪种画面
 */
class CharacterAnimation {

    constructor() {

        this.state = AnimationState.IDLE;

        this.bodyPart = "body";
    }

    switchState(state) {
        this.state = state;
    }

    update(dt) {

        // 根据状态更新动画 全部都在这里添加
        //根据角色逻辑自动切换状态
        //根据状态选择对应的Animation
        //更新当前Animation
        //通知Animator
    }

}