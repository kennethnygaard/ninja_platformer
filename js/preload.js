gameScene.preload = function(){
  console.log('preload');

  this.load.spritesheet('ninja', 'assets/images/ninja_spritesheet2.png', {
    frameWidth: 16,
    frameHeight: 32,
    margin: 1,
    spacing: 1
  });

  this.load.spritesheet('peasant', 'assets/images/peasant.png', {
    frameWidth: 16,
    frameHeight: 32,
    margin: 1,
    spacing: 1
  });

  //hard level
  this.load.image('brick', 'assets/images/bricks.png');
  this.load.image('ground1', 'assets/images/ground_1.png');
  this.load.image('ground1left', 'assets/images/ground_1_left.png');
  this.load.image('ground1right', 'assets/images/ground_1_right.png');
  this.load.image('frame', 'assets/images/frame.png');

  //decor
  this.load.image('shade', 'assets/images/shade.png');
  this.load.image('pagoda_roof', 'assets/images/pagoda_roof.png');
  this.load.image('grass1', 'assets/images/grass_1.png');
  this.load.image('background', 'assets/images/background.png');
  this.load.image('tree', 'assets/images/tree.png');
  this.load.image('barrel', 'assets/images/barrel.png');

  this.load.image('heart', 'assets/images/heart.png');

  this.load.json('levelData', 'assets/json/level1.json');

}
