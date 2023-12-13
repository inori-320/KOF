import { GameObject } from './game_object.js';
import { PlayerControl } from './controller.js';

export class GameMap extends GameObject {
    constructor(root) {
        super();
        this.root = root;
        this.$canvas = $('<canvas id="tutorial" width="1280" height="720" tabindex=0></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
        this.PlayerControl = new PlayerControl(this.$canvas);

        this.root.$kof.append(`
        <div class="head">
            <div class="player0_hp">
                <div class="red">
                    <div class="green"></div>
                </div>
            </div>
            <div class="time"></div>
            <div class="player1_hp">
                <div class="red">
                    <div class="green"></div>
                </div>
            </div>
        </div>
        `);
        this.time_left = 60000;     // 剩余时间，毫秒
        this.$timer = this.root.$kof.find(`.time`);
    }

    start() {

    }

    update_time() {
        let [a, b] = this.root.Players;
        if (a.status == 6 || b.status == 6) {
            return;
        }
        this.time_left -= this.timedelta;
        let t = parseInt(this.time_left / 1000) + 1;
        if (t <= 0) {
            t = 0;
            a.status = b.status = 6;
            a.frame_current_cnt = b.frame_current_cnt = 0;
            a.vx = b.vx = 0;
        }
        this.$timer.text(t);
    }

    update() {
        this.update_time();
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.$canvas.width(), this.$canvas.height());
    }
}