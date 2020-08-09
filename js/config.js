var gameScene = new Phaser.Scene('Game');

gameScene.playerSpeed = 0;
gameScene.maxSpeed = 200;
gameScene.acceleration = 10;
gameScene.currentAnim = 'abc';
gameScene.jumpStrength = -600;

gameScene.heart = [];
gameScene.lives = 3;

gameScene.inShadow = false;

gameScene.dying = false;

var coll = {
  'brick' : {
    up: true,
    down: true,
    left: true,
    right: true
  },
  'frame': {
    up: true,
    down: false,
    left: false,
    right: false
  },
  'ground1': {
    up: true,
    down: false,
    left: false,
    right: false
  },
  'ground1left': {
    up: true,
    down: false,
    left: false,
    right: false
  },
  'ground1right': {
    up: true,
    down: false,
    left: false,
    right: false
  },
  'shade': {
    up: false,
    down: false,
    left: false,
    right: false
  }


}



var config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: gameScene,
  title: 'Shadow Ninja',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 1000
      },
      debug: false
    }
  }
};
