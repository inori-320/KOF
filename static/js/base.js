import { GameMap } from './map.js';
import { Kusanagi } from './player/kusanagi.js';

class KOF {
    constructor(id) {
        this.$kof = $('#' + id);

        this.gamemap = new GameMap(this);
        this.Player = [
            new Kusanagi(this, {
                x: 200, y: 0, id: 0, width: 120, height: 200
            }),
            new Kusanagi(this, {
                x: 900, y: 0, id: 1, width: 120, height: 200
            })
        ];
    }
}

export {
    KOF
}