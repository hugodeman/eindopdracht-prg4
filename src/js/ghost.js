import { Actor, Vector, CollisionType, Shape } from "excalibur"
import { Resources } from "./resources.js";
import { Bullet } from "./bullet.js";

export class Ghost extends Actor {
    sprite
    constructor(x, y) {
        super({
            x, y, width: Resources.Ghost.width,
            height: Resources.Ghost.height,
            collisionType: CollisionType.Passive
        })
        this.collider.set(Shape.Box(10, 40))
    }

    onInitialize(engine) {
        this.pos.x = 0
        this.pos.y = Math.random() * 700
        this.sprite = Resources.Ghost.toSprite()
        this.graphics.use(this.sprite)
        this.sprite.flipHorizontal = true
        this.actions.moveTo(new Vector(100, 150), 210)
            .moveTo(new Vector(660, 150), 210)
            .moveTo(new Vector(660, 440), 210)
            .moveTo(new Vector(1500, 440), 210)

        this.on('collisionstart', (event) => this.hitSomething(event))

        this.on('exitviewport', () => this.healthReduce(engine))
    }

    hitSomething(event) {
        if (event.other instanceof Bullet) {
            this.kill()
        }
    }

    healthReduce(engine) {
        this.kill()
        engine.emit('ghost-exit', { ghost: this })
    }
}