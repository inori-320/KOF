import { Player } from "./player.js";
import { GIF } from "../utils.js";

export class Kusanagi extends Player {
    constructor(root, info) {
        super(root, info);

        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let action = ['idle', 'forward', 'back', 'jump', 'attack', 'hurt', 'die'];
        let y_offset = [0, -22, -22, -100, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            gif.load(`/static/images/player/kusanagi/${action[i]}.gif`);
            this.animation.set(i, {
                'gif': gif,
                'frame_cnt': 0,     // 动画的帧数=(60-frame_cnt)
                'frame_rate': 12,    // 每frame_rate渲染一次，即角色的帧率=(60/fream_rate)
                'offset_y': y_offset[i],      // y轴方向的偏移量
                'loaded': false,     // 模型是否加载完成 
                'scale': 2
            });

            gif.onload = function () {
                let obj = outer.animation.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
            }
        }
    }
}