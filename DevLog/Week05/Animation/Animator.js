/**
 * Animator
 * ----------------
 * 控制动画播放行为，例如：
 * - 切换到下一帧
 * - 切换到上一帧
 * - 设置播放速度
 * - 设置当前帧
 */
class Animator {

    constructor() {
        this.playbackSpeed = 1.0;

        this.isPaused = false;
    }

    nextFrame(animation) {
        if (this.isPaused) return;

        animation.currentFrame++;
    }

    prevFrame(animation) {
        if (this.isPaused) return;

        animation.currentFrame--;
    }

    setFrame(index) {

        // 具体实现可根据 animation 来设置
    }

    setSpeed(speed) {
        this.playbackSpeed = speed;
    }

}