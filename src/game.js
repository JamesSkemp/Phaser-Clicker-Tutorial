/// <reference path="../lib/phaser-2.4.3.js" />
// Create a game with dimensions 800x600, and use the WebGL (default) or Canvas renderer, depending upon the browser.
var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('play', {
	preload: function () {
		game.load.image('skeleton', 'assets/allacrost_enemy_sprites/skeleton.png');
	},
	create: function () {
		var skeletonSprite = game.add.sprite(450, 290, 'skeleton');
		skeletonSprite.anchor.setTo(0.5, 0.5);
	},
	render: function () {
		game.debug.text('Adventure Awaits!', 250, 250);
	}
});

game.state.start('play');