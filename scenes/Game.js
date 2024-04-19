import Ui from "../lib/Ui";
import Board from "../lib/Board";
import Ai from "../lib/Ai";

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    create() {
        this.ui = new Ui(this);
        this.ui.addInfos();

        this.board  = new Board(this);
        this.board.create();

        this.allowInteraction = false;
        this.targetX = false;
        this.changeTurn('player');

        this.input.on("pointermove", (pointer)=>{
            if(!this.allowInteraction)return;

            if(this.turn == 'player'){
                let newX = this.limitX(pointer.x);
                this.targetX = newX;
            }
        });

        this.input.on("pointerup", (pointer) => {
            if(!this.allowInteraction)return;
        
            if(this.turn == 'player'){
                this.allowInteraction = false;
                this.discOnHand.x = this.limitX(pointer.x);
                this.board.dropDisc(this.discOnHand, ()=>{
                    this.changeTurn('ai');
                });
            }
        });

        this.ai = new Ai(this);
    }

    changeTurn(side){
        this.turn = side;
        if(side == 'player'){
            this.ui.helperText.setText("Your turn!");

            this.discOnHand = this.add.circle(510, 285, 50, 0xE06C75);
            this.discOnHand.setDepth(0);
            this.time.delayedCall(150, ()=>{
                this.allowInteraction = true;
            });
        } else {
            this.ui.helperText.setText("AI's turn!");

            this.discOnHand = this.add.circle(510, 285, 50, 0xE5C07B);
            this.discOnHand.setDepth(0);
            this.ai.makeMove(this.board);
        }
    }

    limitX(x){
        const positions = [150, 270, 390, 510, 630, 750, 870];
        let closest = positions.reduce((prev, curr) => {
            // return the closest value to x
            return (Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);
        });
        return closest;
    }

    update() {
        if(this.turn == 'player' && this.targetX !== false && this.allowInteraction){
            if(this.targetX > this.discOnHand.x){
                this.discOnHand.x += 15;
            } else if(this.targetX < this.discOnHand.x){
                this.discOnHand.x -= 15;
            }
        }
    }
}