var Game = /** @class */ (function () {
    function Game(t) {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.computerSymbol = -1;
        this.gameRunning = true;
        this.table = t;
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    Game.prototype.Reset = function () {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameRunning = true;
        for (var i = 0; i < 9; i++) {
            this.table[i].style.color = "white";
            this.table[i].innerHTML = "&nbsp;";
        }
        document.getElementById("result").innerHTML = "";
    };
    Game.prototype.IsFull = function () {
        for (var i = 0; i < 9; i++) {
            if (this.board[i] == 0)
                return false;
        }
        return true;
    };
    Game.prototype.ClickCell = function (x, y) {
        var p = 3 * (x - 1) + (y - 1);
        if (!this.gameRunning) {
            document.getElementById("result").innerHTML = "Game Over !!!!";
        }
        else {
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
                        document.getElementById("result").innerHTML = "You Have Won !!!!";
                    }
                    else {
                        if (this.IsFull()) {
                            this.gameRunning = false;
                            document.getElementById("result").innerHTML = "DRAW";
                        }
                        else {
                            var v = this.minmax(-1, true);
                            this.board[v] = -1;
                            this.table[v].style.color = "#FF8C00";
                            this.table[v].innerHTML = "O";
                            if (this.win(this.board) == -1) {
                                this.gameRunning = false;
                                document.getElementById("result").innerHTML = "UH OH You Have Lost";
                            }
                            else {
                                if (this.IsFull()) {
                                    this.gameRunning = false;
                                    document.getElementById("result").innerHTML = "DRAW";
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Game.prototype.win = function (board) {
        var b = board[1];
        if (board[0] == b && b == board[2] && b != 0)
            return b;
        b = board[4];
        if (board[3] == b && b == board[5] && b != 0)
            return b;
        b = board[7];
        if (board[6] == b && b == board[8] && b != 0)
            return b;
        b = board[3];
        if (board[0] == b && b == board[6] && b != 0)
            return b;
        b = board[4];
        if (board[1] == b && b == board[7] && b != 0)
            return b;
        b = board[5];
        if (board[2] == b && b == board[8] && b != 0)
            return b;
        b = board[4];
        if (board[0] == b && b == board[8] && b != 0)
            return b;
        if (board[2] == b && b == board[6] && b != 0)
            return b;
        return 0;
    };
    Game.prototype.minmax = function (currentPlayer, root) {
        var winner = this.win(this.board);
        if (winner != 0)
            if (currentPlayer == -1)
                return winner;
            else
                return -winner;
        var possibleMoves = [];
        for (var i = 0; i < 9; i++) {
            if (this.board[i] == 0)
                possibleMoves.push(i);
        }
        var n = possibleMoves.length;
        if (n == 0)
            return 0;
        var which = -1;
        var v = 100;
        for (var j = 0; j < n; j++) {
            var move = possibleMoves[j];
            this.board[move] = currentPlayer;
            var m = -this.minmax(-currentPlayer, false);
            this.board[move] = 0;
            if (m < v) {
                v = m;
                which = move;
            }
        }
        if (root) {
            return (which);
        }
        else
            return (v);
    };
    return Game;
}());
window.onload = function () {
    var r1c1 = document.getElementById("r1c1");
    var r1c2 = document.getElementById("r1c2");
    var r1c3 = document.getElementById("r1c3");
    var r2c1 = document.getElementById("r2c1");
    var r2c2 = document.getElementById("r2c2");
    var r2c3 = document.getElementById("r2c3");
    var r3c1 = document.getElementById("r3c1");
    var r3c2 = document.getElementById("r3c2");
    var r3c3 = document.getElementById("r3c3");
    var reset = document.getElementById("reset");
    var game = new Game([r1c1, r1c2, r1c3, r2c1, r2c2, r2c3, r3c1, r3c2, r3c3]);
    r1c1.onclick = function (e) { game.ClickCell(1, 1); };
    r1c2.onclick = function (e) { game.ClickCell(1, 2); };
    r1c3.onclick = function (e) { game.ClickCell(1, 3); };
    r2c1.onclick = function (e) { game.ClickCell(2, 1); };
    r2c2.onclick = function (e) { game.ClickCell(2, 2); };
    r2c3.onclick = function (e) { game.ClickCell(2, 3); };
    r3c1.onclick = function (e) { game.ClickCell(3, 1); };
    r3c2.onclick = function (e) { game.ClickCell(3, 2); };
    r3c3.onclick = function (e) { game.ClickCell(3, 3); };
    reset.onclick = function (e) { game.Reset(); };
};
