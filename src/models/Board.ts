import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Checker } from "./figures/Checker";
import { Figure, FigureNames } from "./figures/Figure";
export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 == 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); //Чёрные
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); //Белые
        }
      }
      this.cells.push(row);
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public addFigures() {
    this.addCheckers();
  }
  private addCheckers() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0))
          new Checker(Colors.BLACK, this.getCell(j, i));
      }
    }
    for (let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if ((i % 2 == 0 && j % 2 != 0) || (i % 2 != 0 && j % 2 == 0))
          new Checker(Colors.WHITE, this.getCell(j, i));
      }
    }
  }
  public Delete(cell: Cell) {
    cell.figure = null;
  }
  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;

    // newBoard.lostWhiteFigures = this.lostWhiteFigures
    // newBoard.lostBlackFigures = this.lostBlackFigures
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    let kill = false;
    let canKill = 0;
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        // target.available = !!selectedCell?.figure?.canMove(target);
        target.available = !!selectedCell?.figure?.canKill(target);
        if (!!selectedCell?.figure?.canKill(target)) canKill++;
      }
    }
    if (canKill === 0) {
      for (let i = 0; i < this.cells.length; i++) {
        const row = this.cells[i];
        for (let j = 0; j < row.length; j++) {
          const target = row[j];
          target.available = !!selectedCell?.figure?.canMove(target);
          // target.available = !!selectedCell?.figure?.canKill(target);
        }
      }
    }
  }
}
