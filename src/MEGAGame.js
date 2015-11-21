var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
	
	}
 
 var Ivis;
 //var cursors;

MEGAGame.prototype.preload = function() {
		this.game.load.image('backg', 'assets/FONDO.png');
		this.game.load.image('Ivis','assets/rollar_new.png');
};

 MEGAGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bt3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

 MEGAGame.prototype.create = function() {
 		this.game.physics.startSystem(Phaser.Physics.P2JS);
 		cursors = this.game.input.keyboard.createCursorKeys();
 	  	this.background1 = this.game.add.sprite(0, 0, 'backg');
 	   	this.background2 = this.game.add.sprite(0, 600, 'backg');
		Ivis = this.game.add.sprite(this.game.world.centerX, 100,'Ivis');
		Ivis.anchor.setTo(0.5, 0.5);
		Ivis.scale.setTo(0.2, 0.2);
		this.game.physics.p2.enable(Ivis);
	};
 
 MEGAGame.prototype.moveBackground = function(background){
		if (background.y < -590) {
	       	background.y = 600;
	        background.y -= 10;
		}else{
	        background.y -=10;
	    }
	};
			 
 MEGAGame.prototype.update = function() {
		//game.debug.spriteInfo(Ivis, 20, 32);
		// Ivis.y++;
	 	this.moveBackground(this.background1);
	  	this.moveBackground(this.background2);

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

		if(Ivis.y > 400)
			Ivis.body.y = 75;
	};

	return MEGAGame;

})();