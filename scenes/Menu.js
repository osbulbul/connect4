export default class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    create() {
        // Logo
        this.add.text(500, 250, "Connect4", {
            fontFamily: "Nunito",
            fontSize: 98,
            color: "#e6e6e6",
            align: "center"
        }).setOrigin(0.5);

        // Create Animation
        const disc1 = this.add.circle(440, 500, 50, 0xE06C75);
        const disc2 = this.add.circle(560, 500, 50, 0xE5C07B);

        this.tweens.add({
            targets: disc1,
            x: 560,
            duration: 200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            repeatDelay: 1000
        });

        this.tweens.add({
            targets: disc2,
            x: 440,
            duration: 200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            repeatDelay: 1000
        });

        // Play button
        const playButtonBackground = this.add.graphics();
        playButtonBackground.fillStyle(0xC678DD, 1);
        playButtonBackground.fillRoundedRect(400, 655, 200, 100, 20);

        const playButton = this.add.text(500, 700, "start", {
            fontFamily: "Nunito",
            fontSize: 52,
            color: "#e6e6e6",
            align: "center"
        }).setOrigin(0.5);

        playButtonBackground.setInteractive(new Phaser.Geom.Rectangle(400, 655, 200, 100), Phaser.Geom.Rectangle.Contains);
        playButtonBackground.on("pointerup", () => {
            this.scene.start("Game");
        });
    }
}