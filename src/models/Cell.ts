import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";
import { type } from "os";
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
  RemoveFigure(cell: Cell) {
    cell.figure = null;
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
  canKill(target: Cell) {
    console.log(target);
    if (this.figure && this.figure?.canKill(target)) {
      let x1 = this.figure?.cell.x;
      let x2 = target.x;
      let e1 = this.figure.cell.y;
      let e2 = target.y;
      if (e1 > e2) e1 = e1 - 1;
      else e1 = e1 + 1;
      if (x1 > x2) x1 = x1 - 1;
      else x1 = x1 + 1;
      let y;
      y = this.board?.getCell(x1, e1);
      // console.log(x2);
      if (y?.figure != null) y.figure = null;
      console.log(y);
      // this.board?.Delete(y);
      target.setFigure(this.figure);
      this.figure = null;
    }
    // console.log(target.figure?.cell);
  }

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
