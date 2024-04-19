export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        // Load assets
    }
    
    create() {
        // Load custom font
        const newFontFace = new FontFace('Nunito', 'url(../assets/Nunito-Black.ttf)');
        document.fonts.add(newFontFace);
        newFontFace.load().then(() => {
            this.scene.start("Menu");
        });
    }
}