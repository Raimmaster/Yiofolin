
var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
		this.Ivis;
		this.bg_music;
		this.hasStarted = false;
		this.hasPaused = false;
		this.mouseTouchDown = false;
		this.startScreen = undefined;
		this.pauseScreen = undefined;
		this.score = 0;
		this.curr_Texture;
		this.curr_enemy;
		this.btmText = undefined;

		this.anim;
		this.triangle;
	}

	MEGAGame.prototype.touchDown = function() {
		this.mouseTouchDown = true;
		
		if (!this.hasStarted) {
			this.startGame();			
			this.timer_color = this.game.time.create(true);
		    this.timer_color.loop(5000, this.changePlayerColor, this);
		    this.timer_color.start();

		    this.timer_enemy = this.game.time.create(true);
		    this.timer_enemy.loop(7000, this.createEnemyGroup, this);
		    this.timer_enemy.start(); 
		}else if(this.hasPaused){
			this.create();
			this.startGame();
			this.hasPaused=false;
			this.pauseScreen.visible=false;
			this.btmText.x=5;
			this.btmText.y=10;
			this.btmText.text = "score: 0";
			this.Ivis.body.velocity.x=0;
			this.Ivis.body.velocity.y=0;
			this.Ivis.loadTexture('Ivis1');
			this.Ivis.visible=true;
			this.Ivis.x=this.game.world.centerX;
			this.Ivis.y=300;
			// this.Ivis = this.game.add.sprite(this.game.world.centerX, 300, 'Ivis1');
			// this.Ivis = this.game.add.sprite(this.game.world.centerX, 300, 'Ivis1');
			// this.Ivis.anchor.setTo(0.5, 0.5);
			// this.Ivis.scale.setTo(0.25, 0.25);
			// this.game.physics.enable(this.Ivis, Phaser.Physics.ARCADE);
			// this.Ivis.body.collideWorldBounds = true;
			// this.game.camera.follow(this.Ivis);

		}
	}
 

	MEGAGame.prototype.preload = function() {		
		this.game.load.image('backg', 'assets/Fil/Fondo.png');
		this.game.load.image('startScreen', 'assets/startScreen.png');
		this.game.load.image('loseScreen', 'assets/loseScreen.png');
		this.game.load.image('backgINV', 'assets/Fil/Fondo.png');
		this.game.load.image('backgOver', 'assets/Fil/EnfrenteGradiente.png');
		//this.game.load.image('Ivis','assets/rollar_new.png');		
    	this.game.load.audio('fall_velocity', 'assets/Falling_Velocity.ogg');
    	//TRIANGLES
    	this.game.load.image('Ivis1','assets/triangle/t1.png');
    	this.game.load.image('Ivis2','assets/triangle/t2.png');
    	this.game.load.image('Ivis3','assets/triangle/t3.png');
    	this.game.load.image('Ivis4','assets/triangle/t4.png');
    	this.game.load.image('Ivis5','assets/triangle/t5.png');
    	this.game.load.image('Ivis6','assets/triangle/t6.png');  

    	//Squares
    	this.game.load.image('Enemy1','assets/squares/b1.png');
    	this.game.load.image('Enemy2','assets/squares/b2.png');
    	this.game.load.image('Enemy3','assets/squares/b3.png');
    	this.game.load.image('Enemy4','assets/squares/b4.png');
    	this.game.load.image('Enemy5','assets/squares/b5.png');
    	this.game.load.image('Enemy6','assets/squares/b6.png');

    	//changing animation
    	this.game.load.spritesheet('triangle', 'assets/triangle/tri_spritesheet.png',
    	 200, 200, 5);  	

    	//bitmap
    	this.game.load.bitmapFont('carrier_command', 'assets/carrier_command.png', 'assets/carrier_command.xml');
	};

	MEGAGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bt3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
	};

	MEGAGame.prototype.create = function() {
		//this.game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	 	
	 	this.bg_music = this.game.add.audio('fall_velocity');
	 	cursors = this.game.input.keyboard.createCursorKeys();
	 	
	 	this.background1 = this.game.add.sprite(0, 0, 'backg');
	 	this.background2 = this.game.add.sprite(0, 600, 'backgINV'); 	
	 	  	
 		this.startScreen = this.game.add.sprite(0, 0, 'startScreen');
 		this.pauseScreen = this.game.add.sprite(0, 0, 'loseScreen');
 		this.pauseScreen.visible=false;
		this.Ivis = this.game.add.sprite(this.game.world.centerX, 300, 'Ivis1');
		// this.Ivis.inputEnabled = true;
		// this.Ivis.input.enableDrag(true);
		this.curr_Texture = 1;
		this.Ivis.anchor.setTo(0.5, 0.5);
		this.Ivis.scale.setTo(0.25, 0.25);
		this.game.physics.enable(this.Ivis, Phaser.Physics.ARCADE);
		this.Ivis.body.collideWorldBounds = true;
		this.game.camera.follow(this.Ivis);

		this.bg_music.play("", 0, 1, true);
		this.bg_music.onLoop.add(playLevelMusic, this);

		this.anim_actual = 0;
		//this.game.world.body.checkCollision.up = false;

		/***/
		this.cuadrados1 = this.game.add.group();
		this.cuadrados1.enableBody = true;
		this.cuadrados1.physicsBodyType = Phaser.Physics.ARCADE;

		//this.createEnemyGroup();
		/***/
		// this.enemies = this.game.add.group();
		// this.enemies.enableBody = true;
		// this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
		//this.Ivis.body.angularAcceleration = 0;	


		this.btmText = this.game.add.bitmapText(10, 5, 'carrier_command','score: 0',34);
		this.btmText.visible = false;
		this.backOver = this.game.add.sprite(0,0,'backgOver');
	};

	MEGAGame.prototype.createEnemyGroup = function(){
		this.curr_enemy = (Math.floor(Math.random() * 6 + 1));
		this.cuadrados1.createMultiple(4, "Enemy" + this.curr_enemy);
		this.cuadrados1.setAll('anchor.x', 0.5);
		this.cuadrados1.setAll('anchor.x', 1);
		this.cuadrados1.setAll('outOfBoundsKill', true);
		this.cuadrados1.setAll('checkWorldBounds', true);		

		// enemio = this.cuadrados1.getFirstExists(false);

		// if(this.hasStarted && enemio){
		// 	enemio.reset(this.game.world.randomX, 590);
		// 	enemio.scale.setTo(0.15, 0.15);
		// 	enemio.body.velocity.y = -300;
		// }
	}

	//Aplicacion para iniciar el juego 
	MEGAGame.prototype.startGame = function() {
		this.hasStarted = true;
		this.startScreen.visible = false;
		this.btmText.visible = true;
		this.score = 0;
		
		//this.counter.visible = true;
	};

	MEGAGame.prototype.pauseGame = function() {
		this.hasPaused = true;
		this.pauseScreen.visible = true;
		this.btmText.text = " " + this.score;
		this.btmText.x = this.game.world.centerX+10;
		this.btmText.y = this.game.world.centerY+85;
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

	MEGAGame.prototype.changePlayerColor = function (){
		//change colors

		var animacion = this.anim_actual;
		
		//this.Ivis = this.game.add.sprite(this.Ivis.x, this.Ivis.y,'Ivis2');	
		//this.Ivis.anchor.setTo(0.5, 0.5);
		//this.Ivis.scale.setTo(0.15, 0.15)1;
		//this.game.physics.p2.enable(this.Ivis);	
		
		this.anim_actual = Math.floor((Math.random() * 5)); ;		

		this.curr_Texture = this.anim_actual+1;
		if(animacion !== this.anim_actual){	
			//console.log("Y yo estoy aqui");
			switch(this.anim_actual){
				case 0:
					this.Ivis.loadTexture('Ivis1');
					break;
				case 1:
					this.Ivis.loadTexture('Ivis2');
					break;
				case 2:
					this.Ivis.loadTexture('Ivis3');
					break;
				case 3:
					this.Ivis.loadTexture('Ivis4');
					break;
				case 4:
					this.Ivis.loadTexture('Ivis5');
					break;
				case 5:
					this.Ivis.loadTexture('Ivis6');
					break;
			}
		}
	}

	MEGAGame.prototype.ascend = function(){
		this.cuadrados1.y -= 10;
	}

	MEGAGame.prototype.touchUp = function() {
		this.mouseTouchDown = false;
	};
		 
	MEGAGame.prototype.update = function() {		
 		this.moveBackground(this.background1);
  		this.moveBackground(this.background2);

  		if (this.game.input.activePointer.isDown) {
			if (!this.mouseTouchDown)
				this.touchDown();
		} else {
			if (this.mouseTouchDown)
				this.touchUp();			
		}

	  	if (cursors.left.isDown)
	  	{
	  		this.Ivis.body.velocity.x = -150;;	  		
	  	}   //ship movement
	    else if (cursors.right.isDown)
	    {	
	    	this.Ivis.body.velocity.x = 150;;	    	
	    }
	    
	    if (cursors.down.isDown)
		{
			this.Ivis.body.velocity.y = 150;
		}else if (cursors.up.isDown)
		{
			this.Ivis.body.velocity.y = -150;
		}

		enemio = this.cuadrados1.getFirstExists(false);

		if(this.hasStarted && enemio){
			enemio.reset(this.game.world.randomX, 590);
			enemio.scale.setTo(0.15, 0.15);
			enemio.body.velocity.y = -300;
		}	

		if(this.hasStarted)
		{
			this.game.physics.arcade.overlap(this.cuadrados1,this.Ivis, 
				this.collisionHandler, null, this);
		}

		for (var i = 0; i < this.cuadrados1.children.length; i++) {
			var squ = this.cuadrados1.children[i];
			//console.log(squ.y);
			if(this.cuadrados1.children[i].y <= 1)
				this.resetBullet(this.cuadrados1.children[i]);
		}
		
		//console.log("X: " +  this.Ivis.x + " Y: " + this.Ivis.y);		
	};

	MEGAGame.prototype.resetBullet = function(il_enem){
		console.log("Ciao, dude!");
		il_enem.kill();
	}

	//invierte los parametros no se porque
	MEGAGame.prototype.collisionHandler = function (cuadrado, player) {
		// cuadrado.kill();
		// player.kill();

		// console.log("player: " + this.curr_Texture);
		// console.log("Enemy: " + this.curr_enemy)
		// console.log("key player: " + player.key);
		// console.log("key enemy: " + cuadrado.key);

		var enem_key = player.key.charAt(player.key.length - 1);
		var player_key = cuadrado.key.charAt(cuadrado.key.length - 1);
		// console.log("E-key: " + enem_key + " Player-key: " + player_key);
		if(enem_key === player_key)
		{
			this.score++;
			console.log("dogeeeees " + this.score);
			this.btmText.text = "score: " + this.score;
			player.kill();
		}else{
			// cuadrado.kill();
			cuadrado.visible=false;
			this.pauseGame();
		}


		// this.pauseGame();
		// this.create();
		// this.hasStarted = false;
		// this.startScreen.visible = true;
	}

	MEGAGame.prototype.render = function() {
	    game.debug.cameraInfo(game.camera, 32, 32);
	    game.debug.spriteCoords(player, 32, 500);
	};

	return MEGAGame;

})();

