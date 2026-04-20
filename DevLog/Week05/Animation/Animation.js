/**
 * Animation
 * ----------------
 * 表示一个完整动画，例如：
 * - run
 * - jump
 * - attack
 */
class Animation {

    constructor(name, frames, frameRate, isLooping = true) {
        this.name = name;

        this.currentFrame = 0;

        this.frameRate = frameRate;

        this.isLooping = isLooping;

        this.frames = frames;

        this.timer = 0;
    }

    play() {
        this.currentFrame = 0;
    }

    pause() {
        // 可以在这里增加暂停逻辑
    }

    stop() {
        this.currentFrame = 0;
    }

    update(dt) {

        this.timer += dt;

        if (this.timer >= 1 / this.frameRate) {

            this.currentFrame++;

            if (this.currentFrame >= this.frames.length) {

                if (this.isLooping) {
                    this.currentFrame = 0;
                } else {
                    this.currentFrame = this.frames.length - 1;
                }

            }

            this.timer = 0;
        }
    }

    getFrame() {
        return this.frames[this.currentFrame];
    }

}