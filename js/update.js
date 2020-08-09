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


  // manually check for overlap with shadows??

  // console.log(gameScene.player.body);


  // player dying, bottom of screen

  if(this.player.body.position.y > this.levelData.world.height - gameScene.player.body.height-2){
    restart();
  }

  this.inShadow = false;  // overlap-checks seems to happen before udpate();

}

function restart(){
  gameScene.dying = false;

  if(gameScene.lives>0){

    gameScene.player.body.position.x = gameScene.levelData.player.x;
    gameScene.player.body.position.y = gameScene.levelData.player.y;
    //gameScene.player.body.velocity.x = 0;
    //gameScene.player.body.velocity.y = 0;

    gameScene.playerPlatformCollider = gameScene.physics.add.collider(gameScene.player, gameScene.platforms);
  } else {
    gameScene.player.setVisible(false);
  }

  //gameScene.physics.world.addCollider(gameScene.playerPlatformCollider);
}
