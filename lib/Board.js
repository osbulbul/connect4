export default class Board{
    constructor(scene){
        this.scene = scene;

        // keep track of the board state
        this.status = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
    }

    create(){
        // create board graphics
        const board = this.scene.add.graphics();
        board.fillStyle(0x61AFEF, 1);
        board.fillRoundedRect(50, 350, 900, 800, 20);
        board.setDepth(1);

        // create board mask
        const boardMask = this.scene.add.graphics().setVisible(false);
        boardMask.fillStyle(0xffffff, 1);
        const mask = boardMask.createGeometryMask().setInvertAlpha(true);
        board.setMask(mask);

        // create board holes
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 7; col++) {
                boardMask.fillCircle(150 + col * 120, 350 + row * 120 + 110, 50);
            }
        }
    }

    dropDisc(disc, callback){
        let col = this.getColumn(disc.x);
        let row = this.getEmptyRow(col);
        if(row == -1)return;
    
        let y = 350 + row * 120 + 110;
        this.scene.tweens.add({
            targets: disc,
            y: y,
            duration: 500,
            ease: "Bounce",
            onComplete: ()=>{
    
                if(this.scene.turn == 'player'){
                    this.status[row][col] = 1;
                } else {
                    this.status[row][col] = 2;
                }
    
                const result = this.checkWin();
    
                if(result.length){
                    this.scene.ui.helperText.setText(this.scene.turn == 'player' ? "Congratulations!" : "Game Over!");
                    if(this.scene.turn == 'player'){
                        this.scene.ui.fireworks();
                        this.scene.time.delayedCall(2500, ()=>{
                            this.scene.ui.addRestartButton();
                        });
                    } else {
                        this.scene.time.delayedCall(500, ()=>{
                            this.scene.ui.addRestartButton();
                        });
                    }
                    this.drawWinLine(result);                    
                } else {
                    callback();
                }
            }
        });
    }

    getColumn(x){
        return Math.floor((x - 50) / 120);
    }
    
    getEmptyRow(col){
        for (let row = 5; row >= 0; row--) {
            if(this.status[row][col] == 0)return row;
        }
        return -1;
    }

    checkWin(){
        // check vertical or horizontal win
        let result = [];
        let player = this.scene.turn == 'player' ? 1 : 2;
    
        // check vertical
        for (let col = 0; col < 7; col++) {
            result = [];
            for (let row = 0; row < 6; row++) {
                if(this.status[row][col] == player){
                    result.push({row: row, col: col});
                    if(result.length >= 4){
                        return result;
                    }
                } else {
                    result = [];
                }
            }
        }
    
        // check horizontal
        for (let row = 0; row < 6; row++) {
            result = [];
            for (let col = 0; col < 7; col++) {
                if(this.status[row][col] == player){
                    result.push({row: row, col: col});
                    if(result.length >= 4){
                        return result;
                    }
                } else {
                    result = [];
                }
            }
        }
    
        // check downward diagonals (top-left to bottom-right)
        for (let col = 0; col <= 7 - 4; col++) { // Ensures there's space for at least 4 discs
            for (let row = 0; row <= 6 - 4; row++) { // Similar boundary for rows
                result = [];
                for (let i = 0; i < 4; i++) { // Only need to check the next 4 spots
                    if (this.status[row + i][col + i] == player) {
                        result.push({row: row + i, col: col + i});
                        if (result.length >= 4) {
                            return result;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    
        // check upward diagonals (bottom-left to top-right)
        for (let col = 0; col <= 7 - 4; col++) { // Ensures there's space for at least 4 discs
            for (let row = 3; row < 6; row++) { // Starts from row 3 to ensure space for 4 upward
                result = [];
                for (let i = 0; i < 4; i++) { // Only need to check the next 4 spots
                    if (this.status[row - i][col + i] == player) {
                        result.push({row: row - i, col: col + i});
                        if (result.length >= 4) {
                            return result;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    
        return false;
    }

    drawWinLine(result){
        let glowColor = this.scene.turn == 'player' ? 0x00ff00 : 0xff0000;
        let lineColor = this.scene.turn == 'player' ? 0x98C379 : 0xE06C75;
        let line = this.scene.add.graphics();
        line.setDepth(2);
    
        let first = result[0];
        let last = result[result.length - 1];
    
        let x1 = 150 + first.col * 120;
        let y1 = 350 + first.row * 120 + 110;
        line.x2 = x1;
        line.y2 = y1;
        let x2 = 150 + last.col * 120;
        let y2 = 350 + last.row * 120 + 110;
        
        // draw line from first to last disc animated
        this.scene.tweens.add({
            targets: line,
            duration: 500,
            x2: x2,
            y2: y2,
            onUpdate: ()=>{
                line.clear();
    
                line.fillStyle(lineColor, 1);
                line.fillCircle(x1, y1, 10);
    
                line.lineStyle(20, lineColor, 1);
                line.beginPath();
                line.moveTo(x1, y1);
                line.lineTo(line.x2, line.y2);
                line.strokePath();
            },
            onComplete: ()=>{
                line.fillCircle(x2, y2, 10);
            }
        });
        
    
    
        const effect = line.postFX.addGlow(glowColor, 0);
        this.scene.tweens.add({
            targets: effect,
            duration: 500,
            outerStrength: 5,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
    
    }
}