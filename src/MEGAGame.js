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
 		this.game.world.setBounds(0, 0, 520, 3000);
 		bg_music = this.game.add.audio('fall_velocity');
 		cursors = this.game.input.keyboard.createCursorKeys();
 		//for(var i = 0; i < 3; i++){
 		this.game.add.sprite(0, 0, 'backg');
		this.game.add.sprite(0, 600, 'backgINV');
 		this.game.add.sprite(0, 1200, 'backg');
		this.game.add.sprite(0, 1800, 'backgINV');
 		this.game.add.sprite(0, 2400, 'backg');
		this.game.add.sprite(0, 3000, 'backgINV');	
 		
 	  	
		Ivis = this.game.add.sprite(this.game.world.centerX, 100,'Ivis');
		Ivis.anchor.setTo(0.5, 0.5);
		Ivis.scale.setTo(0.09, 0.09);
		this.game.physics.p2.enable(Ivis);

		this.game.camera.follow(Ivis);

		bg_music.play("", 0, 1, true);
		bg_music.onLoop.add(this.playLevelMusic, this);
		//bg_music.play();
};

function playLevelMusic(){
	bg_music.play("", 0, 1, true);
}


			 
 MEGAGame.prototype.update = function() {
		//game.debug.spriteInfo(Ivis, 20, 32);
		// Ivis.y++;
	 	//this.moveBackground(this.background1);
	  	//this.moveBackground(this.background2);

	  	if (cursors.left.isDown)
	  	{
	  		Ivis.body.rotateLeft(100);	  		
	  	}   //ship movement
	    else if (cursors.right.isDown)
	    {	
	    	Ivis.body.rotateRight(100);
	    }
	    else 
	    {
	    	Ivis.body.setZeroRotation();
	    }
	    
	    if (cursors.up.isDown)
	    {
			Ivis.body.thrust(400);
		}
	    else if (cursors.down.isDown)
		{
			Ivis.body.reverse(400);
		}

		console.log("X: " +  Ivis.x + " Y: " + Ivis.y);

		if(Ivis.y > 2700){
			Ivis.body.y = 294;
		}
	};
	MEGAGame.prototype.render = function() {

	    this.game.debug.cameraInfo(this.game.camera, 32, 32);
	    this.game.debug.spriteCoords(this.player, 32, 500);

	}
	return MEGAGame;

})();

