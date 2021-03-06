//This is the finished version of my Towers of Hanoi eval project.
let board;
let startingBoard = [
    ['3', '2', '1'],
    [],
    []
];
let playingBoard= [];

const mapping = function(boardArray) {
    //Copy startingBoard to playingBoard at start and reset. 
    //displayBoard serves as a mutating array to display each peg. 
    //playingBoard serves as the array holding all the moves throughout the game.
    //Empty string console.log's serve as spacing between moves.
    let displayBoard;
    
    if(boardArray === startingBoard) {
        console.log(`Let's play a game...`)
        startingBoard.forEach(element => {
            let copy = element.map(x => x)
            playingBoard.push(copy)
        })
    }
    
    for (let i = 0; i < boardArray.length; i++) {
        if(boardArray[i].length > 0){
            displayBoard = boardArray[i].reduce((accumulator, currentValue) => accumulator + '  ' + currentValue);
            console.log(`--- ${displayBoard}`);
        }else {
            console.log('---');
        }
    }
    console.log('        ');
}

const Board = function() {
    //moveDisc compares smallest numbers from arrays at startPeg and endPeg to determine legal moves.
        //Then, checks for winning condition and resets the game when true.
    //moveCheck detemines possible moves for peg passed as argument.
    //checkWinner compares length of peg at startingBoard[0] to pegs in playingBoard to determine a win. 
   
    let gameOver = false;
    let moves = 0;
    
    let moveDisc = function(startPeg, endPeg) {
        let startPegIndex = startPeg - 1;
        let endPegIndex = endPeg - 1;

        if(Math.min(...playingBoard[endPegIndex]) < Math.min(...playingBoard[startPegIndex])) {
            console.log('You cannot move a larger disc on top of a smaller one, board is still:')
            mapping(playingBoard)
        } else {
            let disc = playingBoard[startPegIndex].pop();
            playingBoard[endPegIndex].push(disc);
            moves++;
            console.log('That move was successful, board is now:')
            mapping(playingBoard);
            checkWinner();
        }

        if(gameOver) {
            console.log(`Congratulations! You win!`);
            console.log(`Number of moves: ${moves}`);
            console.log('           ');
            console.log('Play again below.');
            console.log('           ');
            mapping(startingBoard);         
        };
    };

    let moveCheck = function(peg) {
        let pegIndex = peg -1
        let pegMin = Math.min(...playingBoard[pegIndex]);
        
        if(playingBoard[pegIndex].length == 0) {
            console.log('There is no disc to move on this peg');
        } else {
            playingBoard.filter(element => {
                let currentPeg = playingBoard.indexOf(element) + 1;
                if (Math.min(...element) == Infinity || pegMin < Math.min(...element)) {
                    console.log(`You can move a disc from this peg to peg ${currentPeg}`)
                } else {
                    console.log(`You cannot move a disc from this peg to peg ${currentPeg}`)
                }
            })
        };
    };

    let checkWinner = function() {
        let winningPeg;
        playingBoard.forEach(element => {
            if (element.length > 0) {
                let reducer = (accumulator, currentValue) => accumulator + currentValue;
                winningPeg = element.reduce(reducer);
                if (winningPeg.length === startingBoard[0].length) {
                    gameOver = true;
                }
            }

        })
    };

    let addPegs = function(numOfPegs) {
        for (let i = 0; i < numOfPegs; i++) {
            startingBoard.push([]);
        }
    };

    let addDiscs = function(numOfDiscs) {
        for (let j = 0; j < numOfDiscs; j++) {
            startingBoard[0].unshift((Math.max(...startingBoard[0]) + 1).toString());
        }
    };

    return {
        moveDisc: moveDisc,
        moveCheck: moveCheck,
        addPegs: addPegs,
        addDiscs: addDiscs
    };
};
board = Board();
let startGame = () => mapping(startingBoard);

//Add discs or pegs with the provided methods before starting.
//Call 'startGame()' to start or reset game.
//Use 'board.moveDisc(x, y)' to move a disc from peg 'x' to peg 'y'.
//Use 'board.moveCheck(x)' to see available moves for peg 'x'. 

// board.addPegs();
// board.addDiscs();

startGame();

//board.moveDisc();
//board.moveCheck();

// board.moveDisc(1, 2);
// board.moveDisc(1, 3);
// board.moveDisc(2, 3);
// board.moveDisc(1, 2);
// board.moveDisc(3, 1);
// board.moveDisc(3, 2);
// board.moveDisc(1, 2);