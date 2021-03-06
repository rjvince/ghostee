namespace SpriteKind {
    export const Enemy_MacPain = SpriteKind.create()
    export const ExtraLife = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile3, function (sprite, location) {
    Ghostee.destroy()
    for (let value of Enemies) {
        value.destroy()
    }
    Level += 1
    loadLevel()
})
function handleDamage (enemy: Sprite) {
    turnEnemy(enemy)
    info.changeLifeBy(-1)
    music.pewPew.play()
    if (info.life() > 0) {
        tiles.placeOnRandomTile(Ghostee, myTiles.tile2)
        Ghostee.startEffect(effects.halo, 500)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ExtraLife, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
    Ghostee.say("sweet!", 1000)
    music.baDing.play()
})
function initBaddeeProperties (sprite: Sprite, _type: string) {
    sprite.setFlag(SpriteFlag.BounceOnWall, false)
    sprite.ay = 500
    if (_type == "Mac") {
        sprites.setDataBoolean(sprite, "jumper", false)
    } else if (_type == "Sig") {
        sprites.setDataBoolean(sprite, "jumper", true)
    }
    sprite.setVelocity(-50, 0)
}
scene.onOverlapTile(SpriteKind.Enemy, myTiles.tile5, function (sprite, location) {
    if (sprites.readDataBoolean(sprite, "jumper") && sprite.tileKindAt(TileDirection.Bottom, myTiles.tile1)) {
        sprite.vy = -25
    }
})
function setClimbing (on: boolean) {
    if (on) {
        controller.moveSprite(Ghostee, 45, 45)
        Ghostee.ay = 0
    } else {
        controller.moveSprite(Ghostee, 45, 0)
        Ghostee.ay = 500
    }
}
function loadLevel () {
    if (Level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (Level == 2) {
        tiles.setTilemap(tiles.createTilemap(hex`1e001600010000000000000000000000000000000000000000000000000000000001010200000000000000000000000000000000000000000000000000000001010100000000000400000000000000000000040000000000000000000001010101010105010101010101010501010101010101010501010101010101010000000005000000000000000500000000000000000500000000000001010006000005000000000000000500000000000000000500000000000001010101010101010501010101010101010101010105010101010101010101010000000000000500000000000000000000000005000000000000000001010000000400000500000000000000000004000005000000000000000001010101010101010101010101010501010101010101010101010101010101010000000000000000000000000500000000000000000000000000000001010000000000000006000000000500000000000000000007000000000001010101010101050101010101010101010101010105010101010101010101010000000000050000000000000000000000000005000000000000000001010000000000050000000000000000000004000005000000000000000001010101010101010101010501010101010101010101010101050101010101010000000000000000000500000000000000000000000000050000000001010000000400000000000500000000000000000000000400050000000001010101010101010101010101010105010101010101010101010101010101010000000000000000000000000005000000000000000000000000000001010000000000000000000000000005000000000600000000000000000301010101010101010101010101010101010101010101010101010101010101`, img`
            2............................2
            2............................2
            22...........................2
            22222.2222222.22222222.2222222
            2............................2
            2............................2
            2222222.222222222222.222222222
            2............................2
            2............................2
            2222222222222.2222222222222222
            2............................2
            2............................2
            222222.2222222222222.222222222
            2............................2
            2............................2
            2222222222.2222222222222.22222
            2............................2
            2............................2
            22222222222222.222222222222222
            2............................2
            2............................2
            222222222222222222222222222222
            `, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile5,myTiles.tile11,myTiles.tile12], TileScale.Sixteen))
    } else {
        game.over(true, effects.smiles)
    }
    for (let value of tiles.getTilesByType(myTiles.tile2)) {
        Ghostee = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . 6 6 6 6 6 6 6 6 . . . . 
            . . 6 6 9 9 9 9 9 9 9 9 6 6 . . 
            . 6 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
            . 6 9 c c 1 9 9 9 9 c c 1 9 6 . 
            . 6 9 c c 1 9 9 9 9 c c 1 9 6 . 
            . 6 9 c c c 9 9 9 9 c c c 9 6 . 
            . 6 9 1 c c 9 9 9 9 1 c c 9 6 . 
            . 6 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
            . 6 9 6 9 9 9 6 6 9 9 9 6 9 6 . 
            . 6 9 9 6 6 6 b b 6 6 6 9 9 6 . 
            . 6 9 9 c b b b b b b c 9 9 6 . 
            . 6 9 9 9 c b b b b c 9 9 9 6 . 
            . 6 6 9 9 9 c c c c 9 9 9 6 6 . 
            . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
            . . . 6 6 . . 6 6 . . 6 6 . . . 
            `, SpriteKind.Player)
        tiles.placeOnTile(Ghostee, value)
        scene.cameraFollowSprite(Ghostee)
        Ghostee.ay = 10
        Ghostee.setFlag(SpriteFlag.BounceOnWall, false)
    }
    for (let value of tiles.getTilesByType(myTiles.tile4)) {
        Baddee = sprites.create(img`
            . e e e e e e e . . . . . . . . 
            e 4 4 4 4 4 4 e e e e . . . . . 
            e 4 4 4 e e 4 4 4 4 e e e . . . 
            e 4 4 4 4 e e 4 4 4 4 4 e e . . 
            e 4 4 4 4 4 e e 4 4 4 4 4 e e . 
            e 4 4 4 e e e e 4 4 4 4 4 4 e . 
            e e 4 4 4 4 4 4 4 4 4 e e e e e 
            . e 4 4 4 4 4 4 d d e 4 4 4 4 e 
            . e 4 4 4 4 4 4 d e 4 4 4 4 4 e 
            . e 4 4 4 4 4 4 4 e 4 4 4 4 4 e 
            . e 4 4 4 4 4 4 e 4 4 4 4 4 4 e 
            . e 4 4 4 4 4 4 4 4 4 4 4 4 4 e 
            . . e 4 4 4 4 4 4 4 4 4 4 4 e . 
            . . e 4 4 4 4 4 4 4 4 4 4 4 e . 
            . . . e e 4 4 4 4 4 4 4 e e . . 
            . . . . . e e e e e e e . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(Baddee, value)
        Baddee.image.flipX()
        initBaddeeProperties(Baddee, "Mac")
    }
    for (let value of tiles.getTilesByType(myTiles.tile11)) {
        Baddee = sprites.create(img`
            . . . 4 4 4 9 9 9 9 . . . . . . 
            . . 4 4 4 9 9 9 9 9 . . . . . . 
            . . 4 4 4 9 9 9 9 9 9 . . . . . 
            . 4 4 4 4 4 4 4 4 4 4 4 4 4 . . 
            . 4 4 4 4 4 e e 4 4 4 4 4 4 4 . 
            . b b d d d d e e d b b b . . . 
            b d d b d d d d d d d d b b . . 
            b d d d d d d d d d d d d b . . 
            b d d d d d d d d d d d d b . . 
            . b b d d d d d b d d d d b . . 
            . b d d d d d d d b b b b b . . 
            . . b d d d d d d e e e e e . . 
            . . . b b b d d e e e e e e e . 
            . . 4 4 4 4 b b e 4 e 4 e . e . 
            . 4 4 4 4 4 . . . 4 4 4 4 4 . . 
            4 4 4 4 4 4 . . . 4 4 4 4 4 4 . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(Baddee, value)
        Baddee.image.flipX()
        initBaddeeProperties(Baddee, "Sig")
    }
    for (let value of tiles.getTilesByType(myTiles.tile12)) {
        oneUp = sprites.create(img`
            . . . . . . . 3 a . . . . . . . 
            . . . . . . 3 a a a . . . . . . 
            . . . . . 3 3 . . a a . . . . . 
            . . . . . 3 . . . . a . . . . . 
            . . . . . 3 . . . . a . . . . . 
            . . . . . 3 . . . . a . . . . . 
            . . . . . a a . . a a . . . . . 
            . . 3 a . . a a a a . . 3 a . . 
            . . 3 a a 3 3 a a a a a a a . . 
            . . . a . . . 3 a . . . a . . . 
            . . . . . . . 3 a . . . . . . . 
            . . . . . . . 3 a . . . . . . . 
            . . . . . . . 3 a . . . . . . . 
            . . . . . . . 3 a . . . . . . . 
            . . . . . . . 3 a . . . . . . . 
            . . . . . 3 a a a a a . . . . . 
            `, SpriteKind.ExtraLife)
        tiles.placeOnTile(oneUp, value)
    }
    Enemies = sprites.allOfKind(SpriteKind.Enemy)
    music.jumpUp.play()
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (!(sprite.isHittingTile(CollisionDirection.Bottom))) {
        turnEnemy(sprite)
    }
})
function onLadder () {
    if (Ghostee.tileKindAt(TileDirection.Bottom, myTiles.tile5) || Ghostee.tileKindAt(TileDirection.Center, myTiles.tile5)) {
        return 1
    } else {
        return 0
    }
}
info.onLifeZero(function () {
    game.over(false)
})
function turnEnemy (sprite: Sprite) {
    sprite.setVelocity(sprite.vx * -1, sprite.vy)
    sprite.image.flipX()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    handleDamage(otherSprite)
})
let oneUp: Sprite = null
let Baddee: Sprite = null
let Enemies: Sprite[] = []
let Ghostee: Sprite = null
let Level = 0
music.setVolume(35)
info.setLife(3)
Level = 1
loadLevel()
game.onUpdate(function () {
    if (onLadder() == 1) {
        setClimbing(true)
    } else {
        setClimbing(false)
    }
    for (let value of Enemies) {
        if (value.tileKindAt(TileDirection.Bottom, myTiles.tile5)) {
            value.ay = 0
        } else {
            value.ay = 500
        }
    }
})
