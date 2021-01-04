scene.onOverlapTile(SpriteKind.Player, myTiles.tile3, function (sprite, location) {
    game.over(true, effects.smiles)
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
    turnEnemy(otherSprite)
    info.changeLifeBy(-1)
    if (info.life() > 0) {
        tiles.placeOnRandomTile(Ghostee, myTiles.tile2)
        sprite.startEffect(effects.halo, 500)
    }
})
let Baddee: Sprite = null
let Ghostee: Sprite = null
tiles.setTilemap(tilemap`level_0`)
Ghostee = sprites.create(img`
    . . . . . . . . . . . . . . 
    . . . 6 6 6 6 6 6 6 6 . . . 
    . 6 6 9 9 9 9 9 9 9 9 6 6 . 
    6 9 9 9 9 9 9 9 9 9 9 9 9 6 
    6 9 c c 1 9 9 9 9 c c 1 9 6 
    6 9 c c 1 9 9 9 9 c c 1 9 6 
    6 9 c c c 9 9 9 9 c c c 9 6 
    6 9 1 c c 9 9 9 9 1 c c 9 6 
    6 9 9 9 9 9 9 9 9 9 9 9 9 6 
    6 9 6 9 9 9 6 6 9 9 9 6 9 6 
    6 9 9 6 6 6 b b 6 6 6 9 9 6 
    6 9 9 c b b b b b b c 9 9 6 
    6 9 9 9 c b b b b c 9 9 9 6 
    6 6 9 9 9 c c c c 9 9 9 6 6 
    . 6 6 6 6 6 6 6 6 6 6 6 6 . 
    . . 6 6 . . 6 6 . . 6 6 . . 
    `, SpriteKind.Player)
Ghostee.z = 2
tiles.placeOnRandomTile(Ghostee, myTiles.tile2)
scene.cameraFollowSprite(Ghostee)
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
    Baddee.ay = 500
    Baddee.setVelocity(-50, 0)
}
info.setLife(3)
game.onUpdate(function () {
    if (onLadder() == 1) {
        setClimbing(true)
    } else {
        setClimbing(false)
    }
})
