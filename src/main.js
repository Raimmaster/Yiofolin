var GAME_WIDTH = 600;
var GAME_HEIGHT = 600;

var state = {
	preload: preload,
	init: init,
	create: create,
	update: update
	
}

var phaserGame = new Phaser.Game(
	GAME_WIDTH,
	GAME_HEIGHT,
	Phaser.AUTO, //Auto will switch between WebGL and Canvas
	'container',
	state
);

var taxiGame = new MEGAGame(phaserGame);

function preload(){
	taxiGame.preload();
}
function init(){
	taxiGame.init();
}
function create(){
	taxiGame.create();
}
function update(){
	taxiGame.update();
}