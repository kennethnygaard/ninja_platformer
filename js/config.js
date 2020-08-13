var gameScene = new Phaser.Scene('Game');

gameScene.playerSpeed = 0;
gameScene.maxSpeed = 200;
gameScene.acceleration = 10;
gameScene.currentAnim = 'abc';
gameScene.jumpStrength = -600;

gameScene.heart = [];
gameScene.lives = 3;

gameScene.stars = [];

gameScene.numStars = 0;
gameScene.maxNinjastars = 3;

gameScene.inShadow = false;

gameScene.dying = false;

gameScene.readyToFire = true;

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
  'ground2': {
    up: true,
    down: false,
    left: false,
    right: false
  },
  'ground2left': {
    up: true,
    down: false,
    left: false,
    right: false
  },
  'ground2right': {
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
  width: 1440,
  height: 720,
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
