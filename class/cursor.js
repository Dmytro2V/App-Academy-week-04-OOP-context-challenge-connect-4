const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor = () => {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);    
  }

  setBackgroundColor = () => {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    //console.log('sett bgr col', this.row, this.col, this.cursorColor);
    Screen.render()   
  }  
  
  up = () => {
     // Move cursor up    
    this.resetBackgroundColor()        
    if (this.row > 0) this.row --
    
    this.setBackgroundColor() 
  }
  down = () => {
    // Move cursor down
    this.resetBackgroundColor() 
    if (this.row < this.numRows -1) this.row ++
    this.setBackgroundColor() 
  }

  
  left = () => {     
    // Move cursor left
    this.resetBackgroundColor() 
    if (this.col > 0) this.col -- 
    
    this.setBackgroundColor() 
    
  }

  right = () => {
     // Move cursor right    
    this.resetBackgroundColor()
    if (this.col < this.numCols - 1) this.col ++

    this.setBackgroundColor() 
  }

}


module.exports = Cursor;
