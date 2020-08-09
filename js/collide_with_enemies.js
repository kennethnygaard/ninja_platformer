gameScene.collide_with_enemies = function(){

  if(gameScene.currentAnim != 'hiding'){
    die();
  }

  function die(){

    if(!gameScene.dying){
      console.log(gameScene.jumpStrength + " dying: " + gameScene.dying);

      gameScene.player.body.setVelocityY(gameScene.jumpStrength+100);


      gameScene.lives--;

      for(let i=0; i<3; i++){
        if(i<gameScene.lives){
          gameScene.heart[i].setVisible(true);
        } else {
          gameScene.heart[i].setVisible(false);
        }
      }

      gameScene.physics.world.removeCollider(gameScene.playerPlatformCollider);

      gameScene.dying = true;

    }

  }


}
