export default class Ui{
    constructor(scene){
        this.scene = scene;
    }

    addInfos(){
        let userDisc = this.scene.add.circle(100, 100, 30, 0xE06C75);
        let userText = this.scene.add.text(150, 70, "User", {
            fontFamily: "Nunito",
            fontSize: 48,
            color: "#e6e6e6",
            align: "center"
        });
    
        let aiDisc = this.scene.add.circle(900, 100, 30, 0xE5C07B);
        let aiText = this.scene.add.text(800, 70, "AI", {
            fontFamily: "Nunito",
            fontSize: 48,
            color: "#e6e6e6",
            align: "center"
        });
    
        // Helper Text
        this.helperText = this.scene.add.text(500, 200, "Your turn!", {
            fontFamily: "Nunito",
            fontSize: 48,
            color: "#e6e6e6",
            align: "center"
        }).setOrigin(0.5);
    }

    fireworks(){
        let graphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0xffffff, 1);
        graphics.fillCircle(4, 4, 4); // x, y, radius
        graphics.generateTexture('spark', 8, 8);
        graphics.destroy();
    
        this.scene.time.addEvent({
            delay: 50,
            repeat: 50,
            callback: ()=>{
                this.explode(Math.random() * 1000, Math.random() * 600);
            },
        });
    }
    
    addRestartButton(){
        const overlay = this.scene.add.rectangle(0, 0, 1000, 1200, 0x000000, 0.5).setOrigin(0);
        overlay.setDepth(3);
    
        // Restart button
        const restartButtonBackground = this.scene.add.graphics();
        restartButtonBackground.setDepth(4);
        restartButtonBackground.fillStyle(0xC678DD, 1);
        restartButtonBackground.fillRoundedRect(400, 655, 240, 100, 20);
        
        const restartButton = this.scene.add.text(520, 700, "restart", {
            fontFamily: "Nunito",
            fontSize: 52,
            color: "#e6e6e6",
            align: "center"
        }).setOrigin(0.5);
        restartButton.setDepth(5);
    
        restartButtonBackground.setInteractive(new Phaser.Geom.Rectangle(400, 655, 200, 100), Phaser.Geom.Rectangle.Contains);
        restartButtonBackground.on("pointerdown", () => {
            this.scene.scene.start("Game");
        });
    }

    explode(x, y){
        const hsv = Phaser.Display.Color.HSVColorWheel(); // get an array of color objects
        const tint = hsv.map(entry => entry.color); // get an array of color values
    
        let particles = this.scene.add.particles(x, y, 'spark', {
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 1500,
            gravityY: 300,
            quantity: 25,
            duration: 50,
            tint: tint
        });
        particles.setDepth(2);
    }
}