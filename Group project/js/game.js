window.onload = function() {
  /var game = new Phaser.Game(800, 600, Phaser.AUTO, '',{ preload: preload, create: create, update: update});
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
  }
  function create() {
controls = game.input.keyboard.addKeys(
{
  'shoot': Phaser.KeyCode.W,
  'left': Phaser.KeyCode.A,
  'right': Phaser.KeyCode.D
}
);
controls2 = game.input.keyboard.addKeys(
  {
    'shoot2': Phaser.KeyCode.UPARROW
    'left2': Phaser.KeyCode.LEFTARROW
    'right2': Phaser.KeyCode.RIGHTARROW
  }
);
player = game.add.sprite(game.world.width/3, game.world.height - 150, 'player');
player.anchor.setTo(0.5,0.5);
game.physics.arcade.enable(player);
player.body.collideWorldBounds = true;
player2 = game.add.sprite(game.world.width/1, game.world.height - 150, 'player2');
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
