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
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.$canvas.width(), this.$canvas.height());
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.$canvas.width(), this.$canvas.height());
    }
}