import { GameObject } from "../game_object.js";

export class Player extends GameObject {
    constructor(root, info) {
        super();

        this.root = root;
        this.x = info.x;
        this.y = info.y;
        this.id = info.id;
        this.width = info.width;
        this.height = info.height;
        this.ctx = this.root.gamemap.ctx;
        this.direction = 1; // 移动的方向，向前走是1，向后走是-1
        this.vx = 0;    // 初始拥有的水平速度
        this.vy = 0;    // 初始拥有的竖直速度
        this.speedx = 400;  // 移动时的水平速度
        this.speedy = 2000; // 向上起跳的初始速度
        this.gravity = 50;  // 下落的重力
        this.status = 3; // 玩家所处的状态。0：idle, 1:forward, 2: back, 3: jump, 4: attack, 5: hurt, 6: die
        this.animation = new Map();     // 记录状态对应的动作
        this.frame_current_cnt = 0; // 帧编号，当前记录了多少帧

        this.pressed_keys = this.root.gamemap.PlayerControl.pressed_keys;       // 记录这一帧按下的键
        this.start();
    }

    start() {

    }

    update_move() {
        if (this.status == 3) {
            this.vy += this.gravity;
        }
        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 450) {
            this.status = 0;
            this.y = 450;
            this.vy = 0;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        }
    }

    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        }
        else if (this.id === 1) {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }

        if (this.status === 0 || this.status === 1 || this.status === 2) {
            if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = -this.speedy;
                this.status = 3;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 2;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update() {
        this.update_control();
        this.update_move();
        this.render();
    }

    render() {
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        let status = this.status;
        let obj = this.animation.get(status);
        if (obj && obj.loaded) {
            let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
            let image = obj.gif.frames[k].image;
            this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
        }
        this.frame_current_cnt++;
    }
}