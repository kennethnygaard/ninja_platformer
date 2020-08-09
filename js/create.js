gameScene.create = function(){
  console.log('create');

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNames('ninja', {
      frames: [0, 1, 2]
    }),
    frameRate: 12,
    yoyo: true,
    repeat: -1
  });

  this.anims.create({
    key: 'walking',
    frames: this.anims.generateFrameNames('ninja', {
      frames: [3, 4, 5]
    }),
    frameRate: 12,
    yoyo: false,
    repeat: -1
  });

  this.anims.create({
    key: 'hiding',
    frames: this.anims.generateFrameNames('ninja', {
      frames: [7, 7, 8, 7, 8, 8, 8, 7, 7, 8]
    }),
    frameRate: 2,
    yoyo: false,
    repeat: -1
  });

  this.anims.create({
    key: 'peasant_walking',
    frames: this.anims.generateFrameNames('peasant', {
      frames: [0, 1, 2]
    }),
    frameRate: 8,
    yoyo: true,
    repeat: -1
  });




  this.setupLevel();

  this.player = this.add.sprite( this.levelData.player.x, this.levelData.player.y, 'ninja', 0);
  this.player.setScale(2);
  this.physics.add.existing(this.player);
  this.player.body.setCollideWorldBounds(true);
  this.player.body.setBounce(0);

  this.cameras.main.setBounds(0, 0, this.levelData.world.width, this.levelData.world.height);
  this.cameras.main.startFollow(this.player);

  this.physics.add.collider([this.player, this.enemies], this.platforms);

  this.physics.add.overlap(this.player, this.enemies, this.collide_with_enemies);

  for(let i=0; i<3; i++){
    gameScene.heart[0] = gameScene.add.image(20+ i*35, 20, 'heart');
    gameScene.heart[0].setScale(2);
    gameScene.heart[0].setScrollFactor(0);
    gameScene.heart[0].setVisible(true);
  }

  gameScene.heart[0] = gameScene.add.image(20, 20, 'heart');
  gameScene.heart[0].setScale(0.25);
  gameScene.heart[0].setScrollFactor(0);
  gameScene.heart[0].setVisible(true);

  this.cursors = this.input.keyboard.createCursorKeys();
  this.cursors.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


  this.input.on('pointerdown', (pointer)=>{
    console.log('(' + this.player.body.position.x + ', ' + this.player.body.position.y + ')');
  })


}
