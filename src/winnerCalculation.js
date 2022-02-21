

export const isWinner = (board) => isHorizontalWinner('O', board) || isHorizontalWinner('X', board)
    || isVerticalWinner('O', board) || isVerticalWinner('X', board) || isDiagonalWinner('O', board) || isDiagonalWinner('X', board)



//Navigate the board horizontally
const isHorizontalWinner = (symbol, board) => {
    return board.some((moves) => moves.every((move) => move === symbol))
   }



const transposeBoard = (board) => {
    return board.map((_,index) => board.map((row) => row[index]))
  }

const isVerticalWinner = (symbol, board) => {
    return transposeBoard(board).some((moves) => moves.every((move) => move === symbol))
  }

  // Get diagonal moves from the board  This will be used to check if a particular user has won //diagonally
const getDiagonalMoves = (board) => {

    const diagonalMoves = [];
    const equalBasedDiagonal = []; // i === j
    const sumBasedDiagonal = [] // i + j == n -1 
  
    // Check for left to right diagonal moves
    for(let row = 0; row < board.length; row++){
      for (let col = 0; col < board.length; col++) {
        if (row === col) {
          equalBasedDiagonal.push(board[row][col])
        }
      }
    }
  
    // Check for right to left diagonal moves
    for(let row = 0; row < board.length; row++){
      for (let col = 0; col < board.length; col++) {
        if (row + col === board.length -1 ) {
          sumBasedDiagonal.push(board[row][col])
        }
      }
    }
  
    diagonalMoves.push(equalBasedDiagonal,sumBasedDiagonal);
    return diagonalMoves;
  }

  
  // Use the diagonal moves to check if the user is a winner
const isDiagonalWinner = (symbol,board) => {
    return getDiagonalMoves(board).some((moves) => moves.every((move) => move === symbol))
  }
