window.onload = function() {
var game = new Phaser.Game(800, 600, Phaser.AUTO, '',{ preload: preload, create: create, update: update});
var player
var player2
var controls
var controls2
var speed = 4
var weapon
var weapon2
  function preload(){
  //remeber to add name of sprite here
game.load.spritesheet('player', 'assets/')
game.load.spritesheet('player2', 'assets/')
game.load.image('arrow', 'assets/arrow.png')
game.load.image('background', 'assets/Battlefeild (1).png')
  }
  function create() {
game.add.sprite(0,0,'background')
controls = game.input.keyboard.addKeys(
{
  'shoot': Phaser.KeyCode.W,
  'left': Phaser.KeyCode.A,
  'right': Phaser.KeyCode.D
}
);
controls2 = game.input.keyboard.addKeys(
  {
    'shoot2': Phaser.KeyCode.UPARROW,
    'left2': Phaser.KeyCode.LEFTARROW,
    'right2': Phaser.KeyCode.RIGHTARROW
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
player.animations.add('left', [70,71,72,73,74,75,76,77,78], 10, true);
player.animations.add('right', [88,89,90,91,92,93,94,95,96], 10, true);
player2.animations.add('left2', [70,71,72,73,74,75,76,77,78], 10, true);
player2.animations.add('right2', [88,89,90,91,92,93,94,95,96], 10, true);
  }
  function update() {
if (controls.left.isDown) {
  player.x -= speed;
} else if (controls.right.isDown) {
  player.x += speed;
}
if(controls.shoot.justDown){
weapon.fire ();
}
if (controls2.left2.isDown) {
  player2.x -= speed;
} else if (controls2.right2.isDown) {
    player2.x += speed;
  }
if (controls2.shoot2.justDown){
weapon2.fire ();
}
  }
};
