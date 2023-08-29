import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";
export class Cell {
  x: number;
  y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board | undefined;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }
  isEmpty(): boolean {
    return this.figure === null;
  }

  setFigure(figure: Figure) {
    this.figure = figure;
    this.figure.cell = this;
  }
  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target);
      if (target.figure) {
        console.log(target.figure);
        // this.addLostFigure(target.figure);
      }
      target.setFigure(this.figure);
      this.figure = null;
    }
  }

  // moveFigure(target: Cell) {
  //   if (this.figure && this.figure?.canMove(target)) {
  //     this.figure.moveFigure(target);
  //     // console.log(target.y, target.x);
  //     const a1 = target.x;
  //     const a2 = target.y;
  //     // target.figure = this.figure;
  //     // target.x = a1;
  //     // target.y = a2;
  //     // target.figure = this.figure;
  //     this.figure = null;
  //     console.log(target);
  //   }
  // }

  isEmptyDiagonal(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board?.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }
  isEmptyDiagonal2(target: Cell): boolean {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absY !== absX) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    if (!this.board?.getCell(this.x + dx, this.y + dy).isEmpty()) return false;
    // for (let i = 1; i < absY; i++) {
    //   if (!this.board?.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
    //     return false;
    // }
    return true;
  }
}
