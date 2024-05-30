import { Actor, Timer } from "excalibur"
import { Resources } from './resources'
import { Bullet } from "./bullet.js"

export class Canon2 extends Actor {
    constructor(x, y) {
        super({
            x, y, width: Resources.Canon2
                .width, height: Resources.Canon2.height
        })

        this.shootTimer = new Timer({
            interval: 1000,
            fcn: () => this.shoot(),
            repeats: true
        })

        this.once('initialize', () => {
            if (this.scene) {
                this.scene.add(this.shootTimer)
                this.shootTimer.start()
            }
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Canon2.toSprite())
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true
        this.scene = engine.currentScene
    }

    shoot() {
        if (this.scene) {
            const bullet = new Bullet(this.pos.x, this.pos.y)
            this.scene.add(bullet)
        }
    }
}