/// <reference path="../lib/phaser-2.4.3.js" />
// Create a game with dimensions 800x600, and use the WebGL (default) or Canvas renderer, depending upon the browser.
var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('play', {
	preload: function () {
		// Sizes are the width and height of an individual image, and how many frames there are.
		game.load.spritesheet('skeleton', 'assets/allacrost_enemy_sprites/skeleton.png', 256 / 4, 128, 4);
	},
	create: function () {
		// Location of the image, and in this case the frame to use (zero-based as usual).
		var skeletonSprite = game.add.sprite(450, 290, 'skeleton', 0);
		// Set the rotation point to the center of the image, instead of the top left (0, 0).
		skeletonSprite.anchor.setTo(0.5, 0.5);
	},
	render: function () {
		game.debug.text('Adventure Awaits!', 250, 250);
	}
});

game.state.start('play');