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

  this.anims.create({
    key: 'key',
    frames: this.anims.generateFrameNames('key', {
      frames: [0, 1, 2]
    }),
    frameRate: 8,
    yoyo: true,
    repeat: -1
  });

  this.anims.create({
    key: 'ninjastar',
    frames: this.anims.generateFrameNames('ninjastar', {
      frames: [0, 1]
    }),
    frameRate: 16,
    repeat: -1
  });

  this.anims.create({
    key: 'star',
    frames: this.anims.generateFrameNames('star', {
      frames: [0, 1, 2]
    }),
    frameRate: 8,
    yoyo: true,
    repeat: -1
  });

  this.setupLevel();

  this.ninjastars = this.physics.add.group({
    gravity: {
      y: -1
    }
  });

  this.player = this.add.sprite( this.levelData.player.x, this.levelData.player.y, 'ninja', 0);
  this.player.setScale(2);
  this.physics.add.existing(this.player);
  this.player.body.setCollideWorldBounds(true);
  this.player.body.setBounce(0);

  this.cameras.main.setBounds(0, 0, this.levelData.world.width, this.levelData.world.height);
  this.cameras.main.startFollow(this.player);

  this.playerPlatformCollider = this.physics.add.collider(this.player, this.platforms);
  this.physics.add.collider([this.enemies, this.keys, this.sstars], this.platforms);

  this.enemiesOverlap = this.physics.add.overlap(this.player, this.enemies, this.collide_with_enemies);
  this.shadowsOverlap = this.physics.add.overlap(this.player, this.shadows, this.shadows_overlap)

  this.keysOverlap = this.physics.add.overlap(this.player, this.keys, this.key_overlap);

  this.starsOverlap = this.physics.add.overlap(this.player, this.sstars, this.stars_pickup_overlap);

  this.ninjastars_overlap = this.physics.add.overlap(this.ninjastars, this.enemies, this.ninjastars_overlap);

  this.knives_overlap = this.physics.add.overlap(this.player, this.knives, this.knivesOverlap);

  for(let i=0; i<3; i++){
    gameScene.heart[i] = gameScene.add.image(20+ i*35, 20, 'heart');
    gameScene.heart[i].setScale(2);
    gameScene.heart[i].setScrollFactor(0);
    gameScene.heart[i].setVisible(true);
  }

  for(let i=0; i<3; i++){
    gameScene.stars[i] = gameScene.add.image(200 + i*30, 20, 'star');
    gameScene.stars[i].setScale(2);
    gameScene.stars[i].setScrollFactor(0);
  }

  this.keyIcon = this.add.image(620, 10, 'keyIcon');
  this.keyIcon.setScrollFactor(0);
  this.keyIcon.setVisible(false);

  this.gameover = this.add.image(360, 180, 'gameover');
  this.gameover.setScrollFactor(0);
  this.gameover.setVisible(false);
  this.gameover.setDepth(100000);


  this.cursors = this.input.keyboard.createCursorKeys();
  this.cursors.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


  this.input.on('pointerdown', (pointer)=>{
    console.log('(' + this.player.body.position.x + ', ' + this.player.body.position.y + ')');
  })

}

gameScene.shadows_overlap = function(thing1, thing2){
  gameScene.inShadow = true;
  // if(thing2.body.gameObject.texture.key);
}

gameScene.key_overlap = function(thing1, thing2){
  thing2.setVisible(false);
  gameScene.keyIcon.setVisible(true);
}

gameScene.ninjastars_overlap = function(thing1, enemy){
  if(enemy.isAlive){
    enemy.anims.stop('peasant_walking');
    enemy.body.setVelocityX(0);
    enemy.rotation = Math.PI/2;
    enemy.body.position.y += 32;
    enemy.body.allowGravity = false;
    enemy.isAlive = false;
  }
}

gameScene.stars_pickup_overlap = function(player, star){
  if(star.visible){
    gameScene.numStars = gameScene.maxNinjastars;
    star.setVisible(false);
    setTimeout(function(){ star.setVisible(true); star.body.setVelocityY(-300); }, 2000);
  };
}

gameScene.knivesOverlap = function(player, knife){
  gameScene.die();
}
