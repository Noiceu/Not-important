window.onload = function() {
var game = new Phaser.Game(800, 600, Phaser.AUTO, '',{ preload: preload, create: create, update: update});
var player
var player2
var controls
var controls2
var speed = 4;
var weapon
var weapon2
var OrkSpear
var Ork
var score = 0;
var scoreText;
  function preload(){
  //remeber to add name of sprite here
game.load.spritesheet('player', 'assets/Femalesheet1.png', 64,64)
game.load.spritesheet('player2', 'assets/Playersheet4.png', 64,64)
game.load.image('arrow', 'assets/arrow.png')
game.load.image('background', 'assets/Battlefeild (1).png')
game.load.spritesheet('Ork', 'assets/Ork with Spear.png', 64,64)
  }
  function create() {
game.add.sprite(0,0,'background');
controls = game.input.keyboard.addKeys(
{
  'shoot': Phaser.KeyCode.W,
  'left': Phaser.KeyCode.A,
  'right': Phaser.KeyCode.D
}
);
controls2 = game.input.keyboard.addKeys(
  {
    'shoot2': Phaser.KeyCode.I,
    'left2': Phaser.KeyCode.J,
    'right2': Phaser.KeyCode.L
  }
);
player = game.add.sprite(game.world.width/3, game.world.height - 50, 'player');
player.anchor.setTo(0.5,0.5);
game.physics.arcade.enable(player);
player.body.collideWorldBounds = true;
player2 = game.add.sprite(game.world.width/1.5, game.world.height - 50, 'player2');
player2.anchor.setTo(0.5,0.5);
game.physics.arcade.enable(player2);
player2.collideWorldBounds = true;
weapon = game.add.weapon(5, 'arrow');
weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
weapon.bulletSpeed = 300;
weapon.fireRate = 500;
weapon.bulletRotateToVelocity = true;
weapon.trackSprite(player);
weapon2 = game.add.weapon(5, 'arrow');
weapon2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
weapon2.bulletSpeed = 300;
weapon2.fireRate = 500;
weapon2.bulletRotateToVelocity = true;
weapon2.trackSprite(player2);
player.animations.add('left', [117,118,119,120,121], 10, true);
player.animations.add('right', [143,144,145,146,147,148,149], 10, true);
player2.animations.add('left2', [117,118,119,120,121], 10, true);
player2.animations.add('right2', [143,144,145,146,147,148], 10, true);
player.animations.add('shoot', [121,122,123,124,125,126,127,128,129,130,131,132,133], 15, false);
player2.animations.add('shoot2', [121,122,123,124,125,126,127,128,129,130,131,132,133], 15, false);
OrkSpear = game.add.group();
OrkSpear.enableBody = true;
spawnWave(10);
scoreText = game.add.text(16,game.world.height-96,'Score: ' + score, {fill:'yellow'})
  }

  function update() {
if (controls.left.isDown) {
  player.x -= speed;
  player.animations.play('left');
} else if (controls.right.isDown) {
  player.x += speed;
  player.animations.play('right');
} else {
  player.animations.stop();
  player.frame = 109;
}
if(controls.shoot.justDown){
weapon.fire ();
}
if (controls2.left2.isDown) {
  player2.x -= speed;
  player2.animations.play('left2')
} else if (controls2.right2.isDown) {
    player2.x += speed;
    player2.animations.play('right2')
  } else {
    player2.animations.stop();
    player2.frame = 109;
  }
if (controls2.shoot2.justDown){
weapon2.fire ();
}
game.physics.arcade.collide(OrkSpear, weapon.bullets, OrkKill)
game.physics.arcade.collide(OrkSpear, weapon2.bullets, OrkKill)
}

  function spawnWave(numSpawn) {
    for (var i = 0; i < numSpawn; i++)
    {
      var randX = game.rnd.integerInRange(0,game.width);
      var newOrkSpear = OrkSpear.create(randX, -32, 'Ork');
      var targetX = game.rnd.integerInRange(0, game.world.width);
      game.physics.arcade.moveToXY(newOrkSpear, targetX, game.world.height);
      newOrkSpear.body.gravity.y = game.rnd.integerInRange(6, 15);
      newOrkSpear.frame = 131;
    }
  }
  function OrkKill(Ork, arrow) {
    Ork.kill();
    arrow.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    OrkSpear.remove(Ork);
    if(OrkSpear.total < 1) {
      spawnWave(13)
    }
  }

};
