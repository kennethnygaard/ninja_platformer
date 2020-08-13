gameScene.collide_with_enemies = function(player, enemy){

  if(gameScene.currentAnim != 'hiding' && enemy.isAlive){
    gameScene.die();
  }


}


gameScene.die = function(){
  if(!gameScene.dying){
    console.log(gameScene.jumpStrength + " dying: " + gameScene.dying);

    gameScene.player.body.position.y -= 5;
    gameScene.player.body.setVelocityY(gameScene.jumpStrength+100);

    gameScene.player.flipY = true;

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
