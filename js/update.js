gameScene.update = function(){

  if(this.cursors.right.isDown){
    gameScene.playerSpeed += gameScene.acceleration;
    if(!this.cursors.left.isDown) this.player.flipX = false;

    if(gameScene.playerSpeed>gameScene.maxSpeed){
      gameScene.playerSpeed=gameScene.maxSpeed;
    }
  }
  if(this.cursors.left.isDown){
    gameScene.playerSpeed -= gameScene.acceleration;
    if(!this.cursors.right.isDown) this.player.flipX = true;

    if(gameScene.playerSpeed<-gameScene.maxSpeed){
      gameScene.playerSpeed=-gameScene.maxSpeed;
    }
  }

  if(!this.cursors.right.isDown && !this.cursors.left.isDown){
    if(gameScene.playerSpeed > 0){
      gameScene.playerSpeed -= gameScene.acceleration;
    }
    if(gameScene.playerSpeed < 0){
      gameScene.playerSpeed += gameScene.acceleration;
    }
  }

  if(this.cursors.space.isDown){

    if(gameScene.readyToFire && gameScene.numStars > 0){
      let star = this.ninjastars.get(this.player.body.position.x+this.player.body.halfWidth, this.player.body.position.y+this.player.body.halfHeight, 'ninjastar');

      star.anims.play('ninjastar');
      let velX;
      this.player.flipX ? velX=-700 : velX = 700;
      star.body.setVelocityX(velX);
      star.body.setVelocityY(-200);

      gameScene.numStars--;

    }
    gameScene.readyToFire = false;

  }

  this.ninjastars.getChildren().forEach((star)=>{
    if(star.body.position.y > 1000){
      star.destroy();
    }
  })

  if(this.cursors.space.isUp){
    gameScene.readyToFire = true;
  }

  this.player.body.setVelocityX(gameScene.playerSpeed);

  if(this.cursors.up.isDown && this.player.body.touching.down) {
    this.player.body.setVelocityY(gameScene.jumpStrength);
  }





  // handling animations

  // from walking to idle;
  // velX == 0, was not idle

  if(!this.player.body.touching.down){    // jumping
    this.player.setFrame(6);
    this.player.anims.stop('idle');
    this.player.anims.stop('walking');
    this.player.anims.stop('hiding');
    gameScene.currentAnim = 'jumping';
  } else {                                // not jumping


    if(this.player.body.velocity.x == 0){   //idle or hiding
      if(this.cursors.keyH.isDown && gameScene.inShadow){

        if(this.currentAnim != 'hiding'){
          this.player.anims.stop('idle');
          this.player.anims.stop('walking');
          this.player.anims.play('hiding');
          gameScene.currentAnim = 'hiding';
        }
      }
      else if(gameScene.currentAnim != 'idle'){
        this.player.anims.stop('walking');
        this.player.anims.stop('hiding');
        this.player.anims.play('idle');
        gameScene.currentAnim = 'idle';
      }
    }

    if(Math.abs(this.player.body.velocity.x)>0 && gameScene.currentAnim != 'walking'){
      this.player.anims.stop('idle');
      this.player.anims.stop('hiding');
      this.player.anims.play('walking');
      gameScene.currentAnim = 'walking';
    }

  }

  this.enemies.getChildren().forEach((enemy)=>{
    if(enemy.body.position.x > enemy.maxX){
      enemy.body.setVelocityX(-enemy.body.velocity.x);
      enemy.flipX = true;
    } else {
      if(enemy.body.position.x < enemy.minX){
        enemy.body.setVelocityX(-enemy.body.velocity.x);
        enemy.flipX = false;
      }
    }

  });

  updateNinjastars();


  // player dying, bottom of screen

  if(this.player.body.position.y > this.levelData.world.height - gameScene.player.body.height-2){
    restart();
  }

  peasantAttack();
  removeKnives();

  this.inShadow = false;  // overlap-checks seems to happen before udpate();

}

function restart(){
  gameScene.dying = false;

  if(gameScene.lives>0){

    gameScene.player.body.position.x = gameScene.levelData.player.x;
    gameScene.player.body.position.y = gameScene.levelData.player.y;
    gameScene.playerPlatformCollider = gameScene.physics.add.collider(gameScene.player, gameScene.platforms);
    gameScene.player.flipY = false;
  } else {
    gameScene.player.setVisible(false);
    gameScene.gameover.setVisible(true);
  }

  //gameScene.physics.world.addCollider(gameScene.playerPlatformCollider);
}

function updateNinjastars(){

  for(let i=0; i<gameScene.maxNinjastars; i++){
    if(i<gameScene.numStars){
      gameScene.stars[i].setVisible(true);
    } else {
      gameScene.stars[i].setVisible(false);
    }
  }
}

function peasantAttack(){


  let e = gameScene.enemies.getChildren().forEach((e)=>{

    let p = gameScene.player;

    let dir;
    if(e.body.velocity.x > 0) {
      dir = 1;
    } else {
      dir = -1;
    }

    let diffX = e.body.position.x - p.body.position.x;
    let diffY = e.body.position.y - p.body.position.y;

    let withinRangeY;
    if(Math.abs(diffY) < 40){
      withinRangeY = true;
    }
    let range = 200;
    let withinRangeX = false;
    if(Math.abs(diffX) < 200) {
      if(dir==-1 && diffX > 0){
        withinRangeX = true;
      }
      if(dir==1 && diffX < 0){
        withinRangeX = true;
      }
    }

    if(gameScene.currentAnim != 'hiding' && e.isAlive && e.readyToFire && withinRangeX && withinRangeY){
      let e_pos = e.body.position;
      let p_pos = p.body.position;
      let newKnife = gameScene.add.sprite(e_pos.x + e.body.halfWidth, e_pos.y+e.body.halfHeight, 'knife');
      gameScene.add.existing(newKnife);
      gameScene.knives.add(newKnife);

      newKnife.body.setVelocityX(700 * dir);
      newKnife.body.setVelocityY(-200);
      if(dir>0)newKnife.flipX = true;

      e.readyToFire = false;

      setTimeout(function(){ e.readyToFire = true; }, 1000);
    }

  });

}

function removeKnives(){

  gameScene.knives.getChildren().forEach((knife)=>{
    if(knife.body.position.y > gameScene.levelData.world.height){
      knife.destroy();
    };
  })
}
