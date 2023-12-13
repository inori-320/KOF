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
        this.speedy = 1600; // 向上起跳的初始速度
        this.gravity = 30;  // 下落的重力
        this.status = 3; // 玩家所处的状态。0：idle, 1:forward, 2: back, 3: jump, 4: attack, 5: hurt, 6: die
        this.animation = new Map();     // 记录状态对应的动作
        this.frame_current_cnt = 0; // 帧编号，当前记录了多少帧
        this.last_frame_cnt = 0;
        this.hp = 100;  // 血量
        this.maxhp = 100;   // 最大血量
        this.$hp_red = this.root.$kof.find(`.player${this.id}_hp>.red`);     // 获取红底血条，用于更新（美化用）
        this.$hp_green = this.root.$kof.find(`.player${this.id}_hp>.red>.green`);   // 获取绿色血条，用于更新现有血量

        this.pressed_keys = this.root.gamemap.PlayerControl.pressed_keys;       // 记录这一帧按下的键
        this.start();
    }

    start() {

    }

    update_move() {
        this.vy += this.gravity;
        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 450) {
            if (this.status == 3) {
                this.status = 0;
            }
            this.y = 450;
            this.vy = 0;
        }
        if (this.x < 0) {
            console.log(this.id);
            this.x = 0;
        }
        if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        }
    }

    update_control() {
        if (this.status === 6) {
            return;
        }
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
            if (space && this.frame_current_cnt - this.last_frame_cnt > 100) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            }
            else if (w && this.frame_current_cnt - this.last_frame_cnt > 100) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = -this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                if (this.direction === 1) {
                    this.status = 1;
                } else {
                    this.status = 2;
                }
            } else if (a) {
                this.vx = -this.speedx;
                if (this.direction === 1) {
                    this.status = 2;
                } else {
                    this.status = 1;
                }
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_direction() {
        if (this.status === 6) {
            return;
        }
        let players = this.root.Players;
        let me = this, you = players[1 - this.id];
        if (me && you) {
            if (me.x < you.x) {
                me.direction = 1;
            } else {
                me.direction = -1;
            }
        }
    }

    is_collision(r1, r2) {
        if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2)) {
            return false;
        }
        if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2)) {
            return false;
        }
        return true;
    }

    is_attack() {
        if (this.status === 6) {
            return;
        }
        this.status = 5;
        this.frame_current_cnt = 0;
        this.hp -= 15;
        this.$hp_green.animate({ width: this.$hp_red.parents().width() * this.hp / 100 }, 300);
        this.$hp_red.animate({ width: this.$hp_red.parents().width() * this.hp / 100 }, 1000);
        if (this.hp <= 0) {
            this.status = 6;
            this.vx = this.vy = 0;
            this.frame_current_cnt = 0;
        }
    }

    update_attack() {
        if (this.status === 4 && this.frame_current_cnt === 18) {
            let me = this, you = this.root.Players[1 - this.id];
            let r1;
            if (this.direction === 1) {
                r1 = {
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 220,
                    y2: me.y + 140,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 220,
                    y1: me.y + 40,
                    x2: me.x + me.width - 120,
                    y2: me.y + 140,
                };
            }
            let r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height
            };
            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        }
    }

    update() {
        this.update_control();
        this.update_move();
        this.update_direction();
        this.update_attack();
        this.render();
    }

    render() {
        // this.ctx.fillStyle = "blue";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        let status = this.status;
        let obj = this.animation.get(status);
        if (obj && obj.loaded) {
            if (this.direction === 1) {
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.ctx.canvas.width, 0);

                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.ctx.canvas.width - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }
        }

        if (status === 4 || status === 5) {
            if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {
                this.status = 0;
            }
        }
        if (status === 6) {
            if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {
                this.frame_current_cnt--;
            }
        }
        this.last_frame_cnt = (this.last_frame_cnt + 1) % 100;
        this.frame_current_cnt++;
    }
}