import { Bullet } from "./bullet"
import { Scene, Label, Font, FontUnit, Vector, Color, Keys, Timer } from "excalibur"
import { Resources } from './resources.js'
import { Background } from './background.js'
import { Ghost } from './ghost.js'
import { Canon1 } from './canon_1.js'
import { UI } from './ui.js'

export class Intro extends Scene {
    onInitialize(engine) {
        this.title = new Label({
            text: 'Ghost Shooter Tower Defense',
            pos: new Vector(150, 30),
            font: new Font({
                family: 'impact',
                size: 80,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        engine.add(this.title)

        this.instructions = new Label({
            text: 'Click anywhere to place a tower, press SPACE to upgrade the towers',
            pos: new Vector(30, 200),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        engine.add(this.instructions)

        this.purpose = new Label({
            text: 'Try to kill 20 ghosts and dont let 3 pass.',
            pos: new Vector(30, 350),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        engine.add(this.purpose)

        this.start = new Label({
            text: 'Press SPACE to start  ( :',
            pos: new Vector(30, 500),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        engine.add(this.start)
    }

    onPreUpdate(engine) {
        let kb = engine.input.keyboard

        if (kb.wasPressed(Keys.Space)) {
            engine.goToScene('game')
        }
    }
}

export class GameScene extends Scene {
    onInitialize(engine) {
        this.ghosts = []
        this.canonTowers = []

        this.createBackground()
        this.createGhost()

        this.timer = new Timer({
            fcn: () => this.createGhost(),
            interval: 700,
            repeats: true
        })
        this.add(this.timer)
        this.timer.start()

        this.input.pointers.primary.on('up', (event) => {
            const pos = event.worldPos
            this.selectedTower = this.createCanonTower(pos)
        })

        this.ui = new UI(this, engine)
        this.add(this.ui)

        this.on('ghost-killed', () => this.addPoint())
    }

    createBackground() {
        const bg = new Background(Resources.Background.toSprite())
        this.add(bg)
    }

    createGhost() {
        const randomColor = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255)
        const ghost = new Ghost(Resources.Ghost.toSprite(), randomColor)
        this.add(ghost)
        this.ghosts.push(ghost)
    }

    createCanonTower(pos) {
        const canon = new Canon1(pos.x, pos.y)
        this.add(canon)
        this.canonTowers.push(canon)
    }

    addBullet() {
        this.add(new Bullet())
    }

    updateScore() {
        if (this.ui) {
            this.engine.score++;
            this.ui.updateScore(this.engine.score)
        }

        if (this.engine.score === 20) {
            this.engine.goToScene('gameOver')
        }
    }
}

export class GameOver extends Scene {
    onInitialize(engine) {
        if (this.engine.score === 20 || this.engine.score >= 20) {

            this.victory = new Label({
                text: 'Sweet victoryy',
                pos: new Vector(30, 200),
                font: new Font({
                    family: 'impact',
                    size: 80,
                    unit: FontUnit.Px,
                    color: Color.Black
                })
            })
            engine.add(this.victory)

        } else {
            this.gameover = new Label({
                text: 'You got spooked',
                pos: new Vector(30, 200),
                font: new Font({
                    family: 'impact',
                    size: 40,
                    unit: FontUnit.Px,
                    color: Color.Black
                })
            })
            engine.add(this.gameover)
        }
    }
}
