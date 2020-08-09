gameScene.setupLevel = function(){
  console.log('setting up level');

  this.levelData = this.cache.json.get('levelData');

  this.physics.world.bounds.width = this.levelData.world.width;
  this.physics.world.bounds.height = this.levelData.world.height;

  this.platforms = this.physics.add.staticGroup();
  this.enemies = this.physics.add.group();


  this.levelData.platforms.forEach((platform)=>{
    let newObj;
    if(platform.numTiles == 1){
      newObj = this.add.sprite(platform.x, platform.y, platform.key);
    } else {
      let width = this.textures.get(platform.key).get(0).width;
      let height = this.textures.get(platform.key).get(0).height;
      newObj = this.add.tileSprite(platform.x, platform.y, platform.numTiles*width, height, platform.key);
    }

    this.add.existing(newObj, true);
    this.platforms.add(newObj);

    newObj.body.checkCollision.up = coll[platform.key].up;
    newObj.body.checkCollision.down = coll[platform.key].down;
    newObj.body.checkCollision.left = coll[platform.key].left;
    newObj.body.checkCollision.right = coll[platform.key].right;

    newObj.setDepth(platform.depth);

  });

  this.levelData.decor.forEach((item)=>{
    let newObj;
    if(item.numTiles == 1){
      newObj = this.add.sprite(item.x, item.y, item.key);
    } else {
      let width = this.textures.get(item.key).get(0).width;
      let height = this.textures.get(item.key).get(0).height;
      newObj = this.add.tileSprite(item.x, item.y, item.numTiles*width, height, item.key);
    }
    newObj.setDepth(item.depth);

    if(item.key == 'background') {
      console.log('bg');
      newObj.setScale(2);
      newObj.setScrollFactor(0.75);
    }
  });

  this.levelData.enemies.forEach((enemy)=>{
      let newEnemy;
      newEnemy = this.add.sprite(enemy.x, enemy.y, enemy.key, 0);
      newEnemy.setScale(2);
      newEnemy.anims.play(enemy.anim);
      this.enemies.add(newEnemy);

      newEnemy.minX = enemy.minX;
      newEnemy.maxX = enemy.maxX;

      newEnemy.body.setVelocityX(enemy.speed * enemy.direction);
      if(enemy.direction < 0) {
        newEnemy.flipX = true;
      }

      newEnemy.body.setCollideWorldBounds(true);
      newEnemy.setDepth(enemy.depth);


  });


}
