const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {
    this.textColor = 'magenta' // black  red    green    yellow    blue    cyan    white    magenta
    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', ConnectFour.testCommand);
    Screen.addCommand('up', 'command up', this.cursor.up);
    Screen.addCommand('down', 'command down', this.cursor.down);
    Screen.addCommand('left', 'command left', this.cursor.left);
    Screen.addCommand('right', 'command right', this.cursor.right);
    
    Screen.addCommand('x', 'command X', this.pressedX);    
    Screen.addCommand('o', 'command O', this.pressedO);



    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }  pressedX = () => {
    this.pressedXO('X')
  }
  pressedO = () => this.pressedXO('O')
  
  pressedXO = (char) => {    
    
    if (this.playerTurn === char) {
      console.log('not this char');
    } else if (this.grid[this.cursor.row][this.cursor.col] !== ' ') {
      console.log('position busy');
    } else {
      this.grid[this.cursor.row][this.cursor.col] = char;
      Screen.setGrid(this.cursor.row, this.cursor.col, char)
      this.setTextColor();
      this.playerTurn = char; 
      if (ConnectFour.checkWin(this.grid)) ConnectFour.endGame(char);
    }   
   
  }
  setTextColor = () => {
    Screen.setTextColor(this.cursor.row, this.cursor.col, this.textColor)
    Screen.render()
  }

  static checkWin(grid) {       
    // Return 'X' if player X wins
    if (this.horizontalIncludes4(grid, 'X')) return 'X';
    if (this.verticalIncludes4(grid, 'X')) return 'X';
    if (this.diagonalIncludes4(grid, 'X')) return 'X';
    // Return 'O' if player O wins
    if (this.horizontalIncludes4(grid, 'O')) return 'O';
    if (this.verticalIncludes4(grid,'O')) return 'O';
    if (this.diagonalIncludes4(grid,'O')) return 'O';
    // Return 'T' if the game is a tie
    if (this.gridFull(grid)) return 'T';

    // Return false if the game has not ended
    return false;
    
  }
  static horizontalIncludes4(grid, symbol) {    
    let arr4 =Array(4).fill(symbol)  

    if (grid.filter(row => row.join().includes(arr4.join())).length > 0) 
      return true;          
  }

  static verticalIncludes4(grid, symbol) {
    const maxCol = grid[0].length;
    const maxRow = grid.length;
    for (let col = 0; col < maxCol; col++) { // on every horisontal pos
      let numConsistent = 0; // checking column

      for (let row = 0; row < maxRow; row++) { 
        if (grid[row][col] === symbol) {
          numConsistent++; if (numConsistent === 4) return true;
        } else  numConsistent = 0;         
      }
    }  
  };

  static diagonalIncludes4(grid, symbol) {   
    const maxCol = grid[0].length;
    const maxRow = grid.length;
    for (let row = 0; row < maxRow - 3; row++) {      
      for (let col = 0; col < maxCol; col++) {
        let charOk = grid[row][col] === symbol;
        if (charOk && this.check3NextDiag(grid, row, col, symbol)) 
          return true;
      }
    }
  }
    
    
  static check3NextDiag(grid, row, col, symbol) {    
    const maxCol = grid[0].length;    
    let rightDiag = null
    let leftDiag = null   

    if (col < maxCol - 3) rightDiag = grid[row+1][col+1] + 
                          grid[row+2][col+2] + grid[row+3][col+3]
    if (col >= 0 + 3) leftDiag = grid[row+1][col-1] + 
                 grid[row+2][col-2] + grid[row+3][col-3]

    if (rightDiag === symbol.repeat(3) ||
        leftDiag  === symbol.repeat(3)) 
      return true;    
  };

  static gridFull(grid) {
    if (grid.filter((row) => row.includes(' ')).length === 0)
      return true;    
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }
  
}

module.exports = ConnectFour;
