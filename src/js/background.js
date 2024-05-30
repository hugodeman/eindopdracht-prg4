import { Actor, Engine, Vector } from "excalibur"
import { Resources } from "./resources.js";

export class Background extends Actor {

    constructor() {
        super({ width: 1280, height: 720 })
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Background.toSprite())
        this.pos = new Vector(650, 400)
    }
}