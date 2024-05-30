import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Background: new ImageSource('images/bg.png'),
    Ghost: new ImageSource('images/ghost_normal.png'),
    Canon1: new ImageSource('images/canon-1.png'),
    Canon2: new ImageSource('images/canon-2.png'),
    Bullet: new ImageSource('images/fast-shot.png'),
    Heart: new ImageSource('images/heart.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }