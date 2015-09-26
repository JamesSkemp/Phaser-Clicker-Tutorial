/// <reference path="../lib/phaser-2.4.3.js" />
// Create a game with dimensions 800x600, and use the WebGL (default) or Canvas renderer, depending upon the browser.
var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('play', {
	preload: function () {
		// Load in the images for our background.
		game.load.image('forest-back', 'assets/parallax_forest_pack/layers/parallax-forest-back-trees.png');
		game.load.image('forest-lights', 'assets/parallax_forest_pack/layers/parallax-forest-lights.png');
		game.load.image('forest-middle', 'assets/parallax_forest_pack/layers/parallax-forest-middle-trees.png');
		game.load.image('forest-front', 'assets/parallax_forest_pack/layers/parallax-forest-front-trees.png');

		// Sizes are the width and height of an individual image, and how many frames there are.
		game.load.spritesheet('skeleton', 'assets/allacrost_enemy_sprites/skeleton.png', 256 / 4, 128, 4);
	},
	create: function () {
		var state = this;
		// Create a group to hold our related background images.
		this.background = this.game.add.group();
		// Setup each of our background layers to take the full screen.
		['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
			.forEach(function (image) {
				var bg = state.game.add.tileSprite(0, 0, state.game.world.width, state.game.world.height, image, '', state.background);
				// If not set, the image will repeat horizontally and vertically (4x4).
				bg.tileScale.setTo(4, 4);
			});

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