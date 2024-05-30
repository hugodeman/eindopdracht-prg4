import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from './resources'
import { Ghost } from './ghost.js'

export class Bullet extends Actor {
    sprite
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Bullet.width,
            height: Resources.Bullet.height,
            collisionType: CollisionType.Passive,
        })

        this.graphics.use(Resources.Bullet.toSprite())

        this.on('exitviewport', () => this.kill())
    }

    onInitialize(engine) {
        this.vel = new Vector(0, -500)
        const sprite = Resources.Bullet.toSprite();
        sprite.scale = new Vector(1, -1);
        this.graphics.use(sprite)
        this.on('collisionstart', (event, engine) => this.hitSomething(event, engine))
        this.engine = engine
    }

    hitSomething(event) {
        if (event.other instanceof Ghost) {
            this.engine.currentScene.updateScore();
            this.kill()
        }
    }
}