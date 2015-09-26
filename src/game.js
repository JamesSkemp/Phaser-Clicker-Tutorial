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
		this.game.load.spritesheet('aerocephal', 'assets/allacrost_enemy_sprites/aerocephal.png', 768 / 4, 192, 4);
		this.game.load.spritesheet('arcana_drake', 'assets/allacrost_enemy_sprites/arcana_drake.png', 768 / 4, 256, 4);
		this.game.load.spritesheet('aurum-drakueli', 'assets/allacrost_enemy_sprites/aurum-drakueli.png', 1280 / 4, 256, 4);
		this.game.load.spritesheet('bat', 'assets/allacrost_enemy_sprites/bat.png', 512 / 4, 128, 4);
		this.game.load.spritesheet('daemarbora', 'assets/allacrost_enemy_sprites/daemarbora.png', 512 / 4, 128, 4);
		this.game.load.spritesheet('deceleon', 'assets/allacrost_enemy_sprites/deceleon.png', 1024 / 4, 256, 4);
		this.game.load.spritesheet('demonic_essence', 'assets/allacrost_enemy_sprites/demonic_essence.png', 512 / 4, 192, 4);
		this.game.load.spritesheet('dune_crawler', 'assets/allacrost_enemy_sprites/dune_crawler.png', 256 / 4, 64, 4);
		this.game.load.spritesheet('green_slime', 'assets/allacrost_enemy_sprites/green_slime.png', 256 / 4, 64, 4);
		this.game.load.spritesheet('nagaruda', 'assets/allacrost_enemy_sprites/nagaruda.png', 768 / 4, 256, 4);
		this.game.load.spritesheet('rat', 'assets/allacrost_enemy_sprites/rat.png', 256 / 4, 64, 4);
		this.game.load.spritesheet('scorpion', 'assets/allacrost_enemy_sprites/scorpion.png', 256 / 4, 64, 4);
		this.game.load.spritesheet('scorpion_goliath', 'assets/allacrost_enemy_sprites/scorpion_goliath.png', 2048 / 4, 448, 4);
		this.game.load.spritesheet('skeleton', 'assets/allacrost_enemy_sprites/skeleton.png', 256 / 4, 128, 4);
		this.game.load.spritesheet('snake', 'assets/allacrost_enemy_sprites/snake.png', 512 / 4, 64, 4);
		this.game.load.spritesheet('spider', 'assets/allacrost_enemy_sprites/spider.png', 256 / 4, 64, 4);
		this.game.load.spritesheet('stygian_lizard', 'assets/allacrost_enemy_sprites/stygian_lizard.png', 768 / 4, 192, 4);
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

		var monsterData = [
			{ name: 'Aerocephal', image: 'aerocephal' },
			{ name: 'Arcana Drake', image: 'arcana_drake' },
			{ name: 'Aurum Drakueli', image: 'aurum-drakueli' },
			{ name: 'Bat', image: 'bat' },
			{ name: 'Daemarbora', image: 'daemarbora' },
			{ name: 'Deceleon', image: 'deceleon' },
			{ name: 'Demonic Essence', image: 'demonic_essence' },
			{ name: 'Dune Crawler', image: 'dune_crawler' },
			{ name: 'Green Slime', image: 'green_slime' },
			{ name: 'Nagaruda', image: 'nagaruda' },
			{ name: 'Rat', image: 'rat' },
			{ name: 'Scorpion', image: 'scorpion' },
			{ name: 'Scorpion Goliath', image: 'scorpion_goliath' },
			{ name: 'Skeleton', image: 'skeleton' },
			{ name: 'Snake', image: 'snake' },
			{ name: 'Spider', image: 'spider' },
			{ name: 'Stygian Lizard', image: 'stygian_lizard' }
		];

		this.monsters = this.game.add.group();

		var monster;
		monsterData.forEach(function (data) {
			// Create a sprite for them off scrren.
			monster = state.monsters.create(1500, state.game.world.centerY, data.image);
			// Center sprite anchor.
			monster.anchor.setTo(0.5);
			// Reference to the data.
			monster.details = data;
			// Enable clicking.
			monster.inputEnabled = true;
			monster.events.onInputDown.add(state.onClickMonster, state);
		});

		this.currentMonster = this.monsters.getRandom();
		this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);

		/*
		// Location of the image, and in this case the frame to use (zero-based as usual).
		var skeletonSprite = game.add.sprite(450, 290, 'skeleton', 0);
		// Set the rotation point to the center of the image, instead of the top left (0, 0).
		skeletonSprite.anchor.setTo(0.5, 0.5);
		*/
	},
	render: function () {
		game.debug.text(
			this.currentMonster.details.name,
			this.game.world.centerX - this.currentMonster.width / 2,
			this.game.world.centerY + this.currentMonster.height / 2);
		
		//game.debug.text('Adventure Awaits!', 250, 250);
	},
	
	onClickMonster: function () {
		// Reset the current monster before we move him.
		this.currentMonster.position.set(1500, this.game.world.centerY);
		// Get another random monster.
		this.currentMonster = this.monsters.getRandom();
		this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
	}
});

game.state.start('play');