import '../css/style.css'
import { Engine, DisplayMode } from 'excalibur'
import { ResourceLoader } from './resources.js'
import { GameScene } from './scene'
import { Intro } from './scene'
import { GameOver } from './scene'

export class Game extends Engine {

    score
    myLabel

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            suppressPlayButton: true
        })

        this.score = 0

        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        const intro = new Intro()
        this.add('intro', intro)
        this.goToScene('intro')

        const gameScene = new GameScene()
        this.add('game', gameScene)

        const gameOver = new GameOver()
        this.add('gameOver', gameOver)
    }
}

new Game()
