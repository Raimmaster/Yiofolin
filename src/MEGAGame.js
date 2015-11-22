var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
		this.Ivis;
		this.bg_music;
		this.hasStarted = false;
		this.mouseTouchDown = false;
		this.startScreen = undefined;

		this.anim;
		this.triangle;

	}

 MEGAGame.prototype.touchDown = function() {
		this.mouseTouchDown = true;

		if (!this.hasStarted) {
			this.startGame();
		};

	}
 

	MEGAGame.prototype.preload = function() {		
		this.game.load.image('backg', 'assets/FONDO.png');
		this.game.load.image('startScreen', 'assets/startScreen.png');
		this.game.load.image('backgINV', 'assets/FONDO_INVERTED.png');
		//this.game.load.image('Ivis','assets/rollar_new.png');		
    	this.game.load.audio('fall_velocity', 'assets/Falling_Velocity.ogg');
    	//TRIANGLES
    	this.game.load.image('Ivis1','assets/triangle/t1.png');
    	this.game.load.image('Ivis2','assets/triangle/t2.png');
    	this.game.load.image('Ivis3','assets/triangle/t3.png');
    	this.game.load.image('Ivis4','assets/triangle/t4.png');
    	this.game.load.image('Ivis5','assets/triangle/t5.png');
    	this.game.load.image('Ivis6','assets/triangle/t6.png');  

    	this.game.load.spritesheet('triangle', 'assets/triangle/tri_spritesheet.png',
    	 200, 200, 5);  	
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
		this.Ivis = this.game.add.sprite(this.game.world.centerX - 75, 100,'Ivis1');
		this.Ivis.anchor.setTo(0.5, 0.5);
		this.Ivis.scale.setTo(0.15, 0.15);
		this.game.physics.p2.enable(this.Ivis);

		this.game.camera.follow(this.Ivis);

		this.triangle = this.game.add.sprite(50, 150, 'triangle', 5);
		this.triangle.scale.setTo(0.15, 0.15);
		this.triangle.smoothed = false;
		this.anim = this.triangle.animations.add('change_color');
		//this.anim.onStart.add(animationStarted, this);
		//this.anim.onLoop.add(animationLooped, this);
		//this.anim.onComplete.add(animationStopped, this);
		this.anim.play(50, true);

		this.bg_music.play("", 0, 1, true);
		this.bg_music.onLoop.add(playLevelMusic, this);
	};


//Aplicacion para iniciar el juego 
MEGAGame.prototype.startGame = function() {
	this.hasStarted = true;
	this.startScreen.visible = false;
	//this.counter.visible = true;
	

};

	MEGAGame.prototype.moveBackground = function(background){
		if (background.y < -590) {
			background.y = 600;
			background.y -= 20;
		}else
			background.y -= 20;			    
	};

	function playLevelMusic(){
		this.bg_music.play("", 0, 1, true);
	}

MEGAGame.prototype.touchUp = function() {
		this.mouseTouchDown = false;
	};
		 
	MEGAGame.prototype.update = function() {
		//game.debug.spriteInfo(this.Ivis, 20, 32);
		// this.Ivis.y++;
	  	//this.Ivis.body.reverse(150);
		
 		this.moveBackground(this.background1);
  		this.moveBackground(this.background2);

  		if (this.game.input.activePointer.isDown) {
			if (!this.mouseTouchDown) {
				this.touchDown();
			};
		} else {
			if (this.mouseTouchDown) {
				this.touchUp();
			};
		}

	  	console.log("angle: " + this.Ivis.body.angle)
	  	if (cursors.left.isDown)
	  	{
	  		//if(this.Ivis.body.angle<30)
	  		//{
	    		this.Ivis.body.rotateRight(50);
	  		//}else{
	  		//	this.Ivis.body.angle = 30;
	  		//}
	  	}   //ship movement
	    else if (cursors.right.isDown)
	    {	
	    	//if(this.Ivis.body.angle>-30)
	    	//{
	  			this.Ivis.body.rotateLeft(50);
	    	//}else{
	    	//	this.Ivis.body.angle = -30;
	    	//}
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

		//change colors
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
			this.Ivis = this.game.add.sprite(this.Ivis.x, this.Ivis.y,'Ivis2');	
			this.Ivis.anchor.setTo(0.5, 0.5);
			this.Ivis.scale.setTo(0.15, 0.15);
			this.game.physics.p2.enable(this.Ivis);	
		}else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){			
			this.Ivis = this.game.add.sprite(this.Ivis.x, this.Ivis.y,'Ivis3');
		}

		console.log("X: " +  this.Ivis.x + " Y: " + this.Ivis.y);		
	};

	MEGAGame.prototype.render = function() {

	    game.debug.cameraInfo(game.camera, 32, 32);
	    game.debug.spriteCoords(player, 32, 500);

	};

	return MEGAGame;

})();

