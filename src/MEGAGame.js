var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
	
	}
 
 var Ivis;
 var bg_music;
 //var cursors;

MEGAGame.prototype.preload = function() {		
		this.game.load.image('backg', 'assets/FONDO.png');
		this.game.load.image('backgINV', 'assets/FONDO_INVERTED.png');
		this.game.load.image('Ivis','assets/rollar_new.png');		
    	this.game.load.audio('fall_velocity', 'assets/Falling_Velocity.ogg');
};

 MEGAGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bt3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
};

 MEGAGame.prototype.create = function() {
	this.game.physics.startSystem(Phaser.Physics.P2JS);
 	//this.game.world.setBounds(0, 0, 600, 3000);
 	bg_music = this.game.add.audio('fall_velocity');
 	cursors = this.game.input.keyboard.createCursorKeys();
 	//for(var i = 0; i < 3; i++){
 	this.background1 = this.game.add.sprite(0, 0, 'backg');
 	this.background2 = this.game.add.sprite(0, 600, 'backgINV'); 	
 	  	
	Ivis = this.game.add.sprite(this.game.world.centerX - 75, 100,'Ivis');
	Ivis.anchor.setTo(0.5, 0.5);
	Ivis.scale.setTo(0.05, 0.05);
	this.game.physics.p2.enable(Ivis);

	this.game.camera.follow(Ivis);
		
	bg_music.play("", 0, 1, true);
	bg_music.onLoop.add(playLevelMusic, this);
	//bg_music.play();
};

MEGAGame.prototype.moveBackground = function(background){
	if (background.y < -590) {
		background.y = 600;
		background.y -= 15;
	}else
		background.y -= 15;			    
};

function playLevelMusic(){
	bg_music.play("", 0, 1, true);
}

			 
MEGAGame.prototype.update = function() {
		//game.debug.spriteInfo(Ivis, 20, 32);
		// Ivis.y++;
	  	//Ivis.body.reverse(150);
		
 		this.moveBackground(this.background1);
  		this.moveBackground(this.background2);

	  	console.log("angle: " + Ivis.body.angle)
	  	if (cursors.left.isDown)
	  	{
	  		if(Ivis.body.angle<30)
	  		{
	    		Ivis.body.rotateRight(50);
	  		}else{
	  			Ivis.body.angle = 30;
	  		}
	  	}   //ship movement
	    else if (cursors.right.isDown)
	    {	
	    	if(Ivis.body.angle>-30)
	    	{
	  			Ivis.body.rotateLeft(50);
	    	}else{
	    		Ivis.body.angle = -30;
	    	}
	    }
	    else 
	    {
	    	Ivis.body.setZeroRotation();
	    }
	    
	    if (cursors.down.isDown)
		{
			Ivis.body.reverse(150);
		}else if (cursors.up.isDown)
		{
			Ivis.body.thrust(150);
		}

		console.log("X: " +  Ivis.x + " Y: " + Ivis.y);		
	};

	return MEGAGame;

})();

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}
