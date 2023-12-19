let game_objects = [];

export class GameObject {
    constructor() {
        game_objects.push(this);

        this.timedelta = 0;
        this.has_call_start = false;
    }

    start() {

    }

    update() {

    }

    destroy() {
        for (let i in game_objects) {
            if (game_objects[i] === this) {
                game_objects.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
function game_objects_frame(timestamp) {
    for (let obj of game_objects) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(game_objects_frame);
}

requestAnimationFrame(game_objects_frame);