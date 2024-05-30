import { Actor, Keys, Timer } from "excalibur"
import { Resources } from './resources'
import { Canon2 } from './canon_2.js'
import { Bullet } from "./bullet.js"

export class Canon1 extends Actor {

    scene

    constructor(x, y) {
        super({
            x, y, width: Resources.Canon1
                .width, height: Resources.Canon1.height
        })

        this.canonTowers = []

        this.shootTimer = new Timer({
            interval: 3000,
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
        this.graphics.use(Resources.Canon1.toSprite())
        this.enableCapturePointer = true
        this.pointer.useGraphicsBounds = true
        this.scene = engine.currentScene
    }

    onPreUpdate(engine) {
        let kb = engine.input.keyboard

        if (kb.wasPressed(Keys.Space)) {
            this.upgrade()
        }
    }

    shoot() {
        if (this.scene) {
            const bullet = new Bullet(this.pos.x, this.pos.y)
            this.scene.add(bullet)
        }
    }

    upgrade() {
        this.kill()
        const canon2 = new Canon2(this.pos.x, this.pos.y)
        this.canonTowers.push(canon2)
        this.scene.add(canon2)
    }
}