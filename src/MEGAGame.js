var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
		this.Ivis;
		this.bg_music;
		this.hasStarted = false;
		this.mouseTouchDown = false;
		this.startScreen = undefined;

	}

 MEGAGame.prototype.touchDown = function() {
		this.mouseTouchDown = true;

		if (!this.hasStarted) {
			this.startGame();
		};

	};

MEGAGame.prototype.preload = function() {		
		this.game.load.image('backg', 'assets/FONDO.png');
		this.game.load.image('startScreen', 'assets/startScreen.png');
		this.game.load.image('backgINV', 'assets/FONDO_INVERTED.png');
		this.game.load.image('this.Ivis','assets/rollar_new.png');		
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
 	this.bg_music = this.game.add.audio('fall_velocity');
 	cursors = this.game.input.keyboard.createCursorKeys();
 	//for(var i = 0; i < 3; i++){
 	this.background1 = this.game.add.sprite(0, 0, 'backg');
 	this.background2 = this.game.add.sprite(0, 600, 'backgINV'); 	
 	
 	this.startScreen = this.game.add.sprite(0, 0, 'startScreen');
	//this.startScreen.anchor.setTo(0.5, 0.5);
	//this.startScreen.x = this.game.world.centerX;
	//this.startScreen.y = 100;

	this.Ivis = this.game.add.sprite(this.game.world.centerX - 75, 100,'this.Ivis');
	this.Ivis.anchor.setTo(0.5, 0.5);
	this.Ivis.scale.setTo(0.05, 0.05);
	this.game.physics.p2.enable(this.Ivis);

	this.game.camera.follow(this.Ivis);
		
	this.bg_music.play("", 0, 1, true);
	this.bg_music.onLoop.add(playLevelMusic, this);
	//this.bg_music.play();
};

MEGAGame.prototype.moveBackground = function(background){
	if (background.y < -590) {
		background.y = 600;
		background.y -= 15;
	}else
		background.y -= 15;			    
};

function playLevelMusic(){
	this.bg_music.play("", 0, 1, true);
}

//Aplicacion para iniciar el juego 
MEGAGame.prototype.startGame = function() {
	this.hasStarted = true;
	this.startScreen.visible = false;
	this.counter.visible = true;
	this.tapToStart.visible = false;

};
		 
MEGAGame.prototype.update = function() {
		//game.debug.spriteInfo(this.Ivis, 20, 32);
		// this.Ivis.y++;
	  	//this.Ivis.body.reverse(150);
		
 		this.moveBackground(this.background1);
  		this.moveBackground(this.background2);

	  	console.log("angle: " + this.Ivis.body.angle)
	  	if (cursors.left.isDown)
	  	{
	  		if(this.Ivis.body.angle<30)
	  		{
	    		this.Ivis.body.rotateRight(50);
	  		}else{
	  			this.Ivis.body.angle = 30;
	  		}
	  	}   //ship movement
	    else if (cursors.right.isDown)
	    {	
	    	if(this.Ivis.body.angle>-30)
	    	{
	  			this.Ivis.body.rotateLeft(50);
	    	}else{
	    		this.Ivis.body.angle = -30;
	    	}
	    }
	    else 
	    {
	    	this.Ivis.body.setZeroRotation();
	    }
	    
	    if (cursors.down.isDown)
		{
			this.Ivis.body.reverse(150);
		}else if (cursors.up.isDown)
		{
			this.Ivis.body.thrust(150);
		}

		console.log("X: " +  this.Ivis.x + " Y: " + this.Ivis.y);		
	};

	MEGAGame.prototype.render = function() {

	    game.debug.cameraInfo(game.camera, 32, 32);
	    game.debug.spriteCoords(player, 32, 500);

	};

	return MEGAGame;

})();

