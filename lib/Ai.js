export default class Ai{
    constructor(scene){
        this.scene = scene;
    }

    makeMove(board){
        this.board = board;
        this.scene.time.delayedCall(1000, ()=>{
            let decidedPos = this.think();
            this.scene.tweens.add({
                targets: this.scene.discOnHand,
                duration: 150,
                x: decidedPos.x,
                onComplete: ()=>{
                    board.dropDisc(this.scene.discOnHand, ()=>{
                        this.scene.changeTurn('player');
                    });
                }
            });
        });
    }

    think(){
        let possibleMoves   = this.getPossibleColumns();
        let bestMove        = false;

        for(let move of possibleMoves){
            if(this.isWinningMove(move)){
                bestMove = move;
                break;
            }

            if(this.isBlockingMove(move)){
                bestMove = move;
                break;
            }
        }

        if(!bestMove){
            bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }

        let x = 150 + bestMove.col * 120;
        let y = 350 - 110;
        return {x: x, y: y};
    }

    getPossibleColumns(){
        let possibleMoves = [];
        for (let col = 0; col < 7; col++) {
            let row = this.board.getEmptyRow(col);
            if(row != -1){
                possibleMoves.push({col: col, row: row});
            }
        }
        return possibleMoves;
    }

    isWinningMove(move){
        // check vertical or horizontal win
        let count = 1;
        let row = move.row;
        let col = move.col;
        let player = this.scene.turn == 'player' ? 1 : 2;
    
        // check vertical
        for (let i = row + 1; i < 6; i++) {
            if(this.board.status[i][col] == player)count++;
            else break;
        }
        if(count >= 4)return true;
    
        // check horizontal
        count = 1;
        for (let i = col + 1; i < 7; i++) {
            if(this.board.status[row][i] == player)count++;
            else break;
        }
        for (let i = col - 1; i >= 0; i--) {
            if(this.board.status[row][i] == player)count++;
            else break;
        }
        if(count >= 4)return true;
    
        // check diagonal
        count = 1;
        let i = row + 1;
        let j = col + 1;
        while(i < 6 && j < 7){
            if(this.board.status[i][j] == player)count++;
            else break;
            i++;
            j++;
        }
        i = row - 1;
        j = col - 1;
        while(i >= 0 && j >= 0){
            if(this.board.status[i][j] == player)count++;
            else break;
            i--;
            j--;
        }
        if(count >= 4)return true;
    
        count = 1;
        i = row + 1;
        j = col - 1;
        while(i < 6 && j >= 0){
            if(this.board.status[i][j] == player)count++;
            else break;
            i++;
            j--;
        }
        i = row - 1;
        j = col + 1;
        while(i >= 0 && j < 7){
            if(this.board.status[i][j] == player)count++;
            else break;
            i--;
            j++;
        }
        if(count >= 4)return true;
    
        return false;
    }

    isBlockingMove(move){
        // check vertical or horizontal win
        let count = 1;
        let row = move.row;
        let col = move.col;
        let player = this.scene.turn == 'player' ? 2 : 1;
    
        // check vertical
        for (let i = row + 1; i < 6; i++) {
            if(this.board.status[i][col] == player)count++;
            else break;
        }
        if(count >= 4)return true;
    
        // check horizontal
        count = 1;
        for (let i = col + 1; i < 7; i++) {
            if(this.board.status[row][i] == player)count++;
            else break;
        }
        for (let i = col - 1; i >= 0; i--) {
            if(this.board.status[row][i] == player)count++;
            else break;
        }
        if(count >= 4)return true;
    
        // check diagonal
        count = 1;
        let i = row + 1;
        let j = col + 1;
        while(i < 6 && j < 7){
            if(this.board.status[i][j] == player)count++;
            else break;
            i++;
            j++;
        }
        i = row - 1;
        j = col - 1;
        while(i >= 0 && j >= 0){
            if(this.board.status[i][j] == player)count++;
            else break;
            i--;
            j--;
        }
        if(count >= 4)return true;
    
        count = 1;
        i = row + 1;
        j = col - 1;
        while(i < 6 && j >= 0){
            if(this.board.status[i][j] == player)count++;
            else break;
            i++;
            j--;
        }
        i = row - 1;
        j = col + 1;
        while(i >= 0 && j < 7){
            if(this.board.status[i][j] == player)count++;
            else break;
            i--;
            j++;
        }
        if(count >= 4)return true;
    
        return false;
    }
}