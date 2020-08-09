gameScene.collide_with_enemies = function(){

  if(gameScene.currentAnim != 'hiding'){
    gameScene.player.body.setVelocityY(gameScene.jumpStrength+100);
  }

}
