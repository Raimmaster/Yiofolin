var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
	
	}
 

 
 MEGAGame.prototype.preload = function() {
		 this.game.load.image('backg', 'assets/FONDO.png');
	};

 MEGAGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bt3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

 MEGAGame.prototype.create = function() {
 	  this.background1 = this.game.add.sprite(0, 0, 'backg');
 	   this.background2 = this.game.add.sprite(0, 600, 'backg');
	
	};
	 MEGAGame.prototype.moveBackground = function(background){
			 	   if (background.y < -590) {
			        background.y = 600;
			        background.y -= 10;
			      } else{
			        background.y -=10;
			    }
			    };
			 
 MEGAGame.prototype.update = function() {
 	this.moveBackground(this.background1);
  	this.moveBackground(this.background2);
};

	return MEGAGame;

})();