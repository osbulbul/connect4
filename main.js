import Phaser from "phaser";
import Preload from "./scenes/Preload";
import Menu from "./scenes/Menu";
import Game from "./scenes/Game";

const game = new Phaser.Game({
    type: Phaser.AUTO, // Phaser.AUTO will use WebGL if available, otherwise it will use Canvas
    width: 1000,
    height: 1200,
    backgroundColor: "#0f0f0f", // Background color of the game
    roundPixels: false, // Round pixels to prevent subpixel rendering
    scale: {
        mode: Phaser.Scale.FIT, // Fit the game to the screen
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game on the screen
    },
    scene: [Preload, Menu, Game]
});