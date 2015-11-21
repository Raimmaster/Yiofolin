var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
	
	}
 
 
 MEGAGame.prototype.preload = function() {
		
	};

 MEGAGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bd3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

 MEGAGame.prototype.create = function() {
	
	};

 MEGAGame.prototype.update = function() {
		
	};

	return MEGAGame;

})();