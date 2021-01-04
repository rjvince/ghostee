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
    turnEnemy(sprite)
})
function onLadder () {
    if (Ghostee.tileKindAt(TileDirection.Center, myTiles.tile7)) {
        return 1
    } else if (Ghostee.tileKindAt(TileDirection.Center, myTiles.tile10)) {
        return 1
    } else if (Ghostee.tileKindAt(TileDirection.Center, myTiles.tile8)) {
        return 1
    } else if (Ghostee.tileKindAt(TileDirection.Center, myTiles.tile9)) {
        return 1
    } else {
        return 0
    }
}
info.onLifeZero(function () {
    game.over(false)
})
function turnEnemy (sprite: Sprite) {
    sprite.image.flipX()
    sprite.setVelocity(sprite.vx * -1, 0)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    turnEnemy(otherSprite)
    info.changeLifeBy(-1)
    tiles.placeOnRandomTile(Ghostee, myTiles.tile2)
    sprite.startEffect(effects.halo, 500)
})
let Baddee: Sprite = null
let Ghostee: Sprite = null
tiles.setTilemap(tiles.createTilemap(hex`1e001600010000000000000000000000000000000000000000000000000000000001010200000000000000000000000000000000000000000000000000000001010100000005080000000000000000000000000000050800000004000001010101010106070101010101010101010101010101060701010101010101010000000005080000000000000000000000000000050800000000000001010000000005080005080000000004000000050800050800000000000001010101010101010106070101010101010101060701010101010101010101010000000000000005080000000000000000050800000000000000000001010000040000000005080000050800000000050800000400000000000001010101010101010101010101060701010101010101010101010101010101010000000000000000000000050800000000000000000000000000000001010000050800040000000000050800000508000000000005080400000001010101060701010101010101010101010607010101010106070101010101010000050800000000000000000000000508000000000005080000000001010000050800050804000000000000000508040005080005080000000001010101010101060701010101010101010101010106070101010101010101010000000000050800000000000000000000000005080000000000000001010000050800050800000000000508000004050805080000000000000001010101060701010101010101010607010101060701010101010101010101010000050800000000000000000508000000050800000000000000000001010000050804000000000000000508000000050800000000000000000301010101010101010101010101010101010101010101010101010101010101`, img`
    2............................2
    2............................2
    22...........................2
    22222..22222222222222..2222222
    2............................2
    2............................2
    22222222..22222222..2222222222
    2............................2
    2............................2
    222222222222..2222222222222222
    2............................2
    2............................2
    222..22222222222..22222..22222
    2............................2
    2............................2
    222222..222222222222..22222222
    2............................2
    2............................2
    222..22222222..222..2222222222
    2............................2
    2............................2
    222222222222222222222222222222
    `, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile4,myTiles.tile7,myTiles.tile8,myTiles.tile9,myTiles.tile10], TileScale.Sixteen))
Ghostee = sprites.create(img`
    . . . . 6 6 6 6 6 6 6 6 . . . . 
    . . 6 6 6 9 9 9 9 9 9 6 6 6 . . 
    . 6 6 9 9 9 9 9 9 9 9 9 9 6 6 . 
    . 6 9 9 9 9 9 9 9 9 9 9 9 9 6 . 
    6 6 9 c c 1 9 9 9 9 c c 1 9 6 6 
    6 9 9 c c 1 9 9 9 9 c c 1 9 9 6 
    6 9 9 c c c 9 9 9 9 c c c 9 9 6 
    6 9 6 1 c c 9 9 9 9 1 c c 6 9 6 
    6 9 9 9 9 9 9 9 9 9 9 9 9 9 9 6 
    6 9 9 6 9 9 9 9 9 9 9 9 6 9 9 6 
    6 9 9 9 c c c c c c c c 9 9 9 6 
    6 6 9 9 c b b b b b b c 9 9 6 6 
    . 6 9 9 9 c b b b b c 9 9 9 6 . 
    . 6 6 9 9 9 c c c c 9 9 9 6 6 . 
    . . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
    . . . 6 6 . . 6 6 . . 6 6 . . . 
    `, SpriteKind.Player)
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
