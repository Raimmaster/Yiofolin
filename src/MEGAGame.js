var MEGAGame = (function(){
	
	function MEGAGame(phaserGame) {
		this.game = phaserGame;
	
	}
 
 var Ivis;

 MEGAGame.prototype.preload = function() {
		this.game.load.image('backgnd','assets/FONDO.png');
		this.game.load.image('Ivis','assets/rollar.png');
	};

 MEGAGame.prototype.init = function() {
		this.game.stage.backgroundColor = '#9bd3e1';
		this.game.add.plugin(Phaser.Plugin.Debug);
	};

 MEGAGame.prototype.create = function() {
 		game.physics.startSystem(Phaser.Physics.P2JS);
		this.game.add.tileSprite(0,0,600,600,'backgnd');
		Ivis = this.game.add.sprite(this.game.world.centerX, 100,'Ivis');
		Ivis.anchor.setTo(0.5, 0.5);
		Ivis.scale.setTo(0.2, 0.2);
	};

 MEGAGame.prototype.update = function() {
		//game.debug.spriteInfo(Ivis, 20, 32);
		// Ivis.y++;
	};

	return MEGAGame;

})();