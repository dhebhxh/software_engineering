/**
 * Frame
 * ----------------
 * 表示动画的一帧图像
 */
class Frame {

    constructor(index, image, duration) {
        this.index = index;

        this.image = image;

        this.duration = duration;
    }

    draw(x, y) {

        image(this.image, x, y);
    }

}