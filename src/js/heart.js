import { Actor, Vector } from "excalibur"
import { Resources } from './resources'

export class Heart extends Actor {
    constructor() {
        super({
            width: 10,
            height: 10
        })
    }

    onInitialize() {
        this.graphics.use(Resources.Heart.toSprite())
        this.scale = new Vector(0.2, 0.2)
    }
}