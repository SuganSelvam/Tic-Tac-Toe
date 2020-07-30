class Game {
    board: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    table: HTMLElement[];

    computerSymbol: number = -1;

    gameRunning: boolean = true;

    constructor(t: HTMLElement[]) {
        this.table = t;
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    Reset() {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameRunning = true;
        for (let i = 0; i < 9; i++) {
            this.table[i].style.color = "white";
            this.table[i].innerHTML = "&nbsp;";
        }
        document.getElementById("result").innerHTML="";
    }

    IsFull(): boolean {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == 0)
                return false;
            }
        return true;
    }

    ClickCell(x: number, y: number) {
        let p: number = 3 * (x - 1) + (y - 1);
        if (!this.gameRunning) {
            document.getElementById("result").innerHTML="Game Over !!!!";
        } else {
            if (this.board[p] == this.computerSymbol) {
                alert("Computer Has This Cell");
            }
            else {
                if (this.board[p] == -this.computerSymbol) {
                    alert("Already Played");
                }
                else {
                    this.table[p].style.color = "#25bfc4";
                    this.table[p].innerHTML = "X";
                    this.board[p] = 1;
                    if (this.win(this.board) == 1) {
                        this.gameRunning = false;
                        document.getElementById("result").innerHTML="You Have Won !!!!";
                    } else {
                        if (this.IsFull()) {
                            this.gameRunning = false;
                            document.getElementById("result").innerHTML="DRAW"
                        } else {
                            let v = this.minmax(-1, true);
                            this.board[v] = -1;
                            this.table[v].style.color = "#FF8C00";
                            this.table[v].innerHTML = "O";
                            if (this.win(this.board) == -1) {
                                this.gameRunning = false;
                                document.getElementById("result").innerHTML="UH OH You Have Lost";
                            } else {
                                if (this.IsFull()) {
                                    this.gameRunning = false;
                                    document.getElementById("result").innerHTML="DRAW"
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    win(board: number[]): number {
        var b = board[1];
        if (board[0] == b && b == board[2] && b != 0) return b;
        b = board[4];
        if (board[3] == b && b == board[5] && b != 0) return b;
        b = board[7];
        if (board[6] == b && b == board[8] && b != 0) return b;
        b = board[3];
        if (board[0] == b && b == board[6] && b != 0) return b;
        b = board[4];
        if (board[1] == b && b == board[7] && b != 0) return b;
        b = board[5];
        if (board[2] == b && b == board[8] && b != 0) return b;
        b = board[4];
        if (board[0] == b && b == board[8] && b != 0) return b;
        if (board[2] == b && b == board[6] && b != 0) return b;
        return 0;
    }

    minmax(currentPlayer: number, root: boolean): number {
        let winner = this.win(this.board);
        if (winner != 0)
            if (currentPlayer == -1)
                return winner;
            else
                return -winner;
        let possibleMoves: number[] = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] == 0)
                possibleMoves.push(i);
        }
        let n: number = possibleMoves.length;
        if (n == 0)
            return 0;
        let which: number = -1;
        let v: number = 100;
        for (let j = 0; j < n; j++) {
            let move = possibleMoves[j];
            this.board[move] = currentPlayer;
            var m = -this.minmax(-currentPlayer, false);
            this.board[move] = 0;
            if (m < v) {
                v = m;
                which = move;
            }
        }
        if (root) {
            return (which)
        }
        else
            return (v)
    }
}


window.onload = () => {
    let r1c1: HTMLElement = <HTMLElement>document.getElementById("r1c1");
    let r1c2: HTMLElement = <HTMLElement>document.getElementById("r1c2");
    let r1c3: HTMLElement = <HTMLElement>document.getElementById("r1c3");
    let r2c1: HTMLElement = <HTMLElement>document.getElementById("r2c1");
    let r2c2: HTMLElement = <HTMLElement>document.getElementById("r2c2");
    let r2c3: HTMLElement = <HTMLElement>document.getElementById("r2c3");
    let r3c1: HTMLElement = <HTMLElement>document.getElementById("r3c1");
    let r3c2: HTMLElement = <HTMLElement>document.getElementById("r3c2");
    let r3c3: HTMLElement = <HTMLElement>document.getElementById("r3c3");
    let reset: HTMLButtonElement = <HTMLButtonElement>document.getElementById("reset");

    let game: Game = new Game([r1c1, r1c2, r1c3, r2c1, r2c2, r2c3, r3c1, r3c2, r3c3]);
    r1c1.onclick = (e) => {game.ClickCell(1, 1); }
    r1c2.onclick = (e) => {game.ClickCell(1, 2); }
    r1c3.onclick = (e) => {game.ClickCell(1, 3); }
    r2c1.onclick = (e) => {game.ClickCell(2, 1); }
    r2c2.onclick = (e) => {game.ClickCell(2, 2); }
    r2c3.onclick = (e) => {game.ClickCell(2, 3); }
    r3c1.onclick = (e) => {game.ClickCell(3, 1); }
    r3c2.onclick = (e) => {game.ClickCell(3, 2); }
    r3c3.onclick = (e) => {game.ClickCell(3, 3); }
    reset.onclick = (e) => {game.Reset(); }
}