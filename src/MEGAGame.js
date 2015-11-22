var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
	
	}
 
 var Ivis;
 //var cursors;

MEGAGame.prototype.preload = function() {
		this.game.load.image('backg', 'assets/FONDO.png');
		this.game.load.image('backgINV', 'assets/FONDO_INVERTED.png');
		this.game.load.image('Ivis','assets/rollar_new.png');
};

 MEGAGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bt3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

 MEGAGame.prototype.create = function() {
 		this.game.physics.startSystem(Phaser.Physics.P2JS);
 		this.game.world.setBounds(0, 0, 520, 3000);
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
	};
 
 /*MEGAGame.prototype.moveBackground = function(background){
		if (background.y < -590) {
	       	background.y = 600;
	        background.y -= 10;
		}else{
	        background.y -=10;
	    }

	    //console.log("BG - Y: " + background.y);
};*/	
			 
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
			Ivis.body.y = 285;
		}
	};

	return MEGAGame;

})();

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);

}