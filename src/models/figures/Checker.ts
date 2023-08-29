import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from "../../assets/checker_black.png";
import whitelogo from "../../assets/checker_white.png";
export class Checker extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
    this.name = FigureNames.CHECKER;
    // console.log(color);
  }

  canMove(target: Cell): boolean {
    // console.log(this.cell.x, this.cell.y);
    const y1 = this.cell.figure?.color === Colors.WHITE ? -1 : 1;
    const dy = this.cell.y < target.y ? 1 : -1;
    const dx = this.cell.x < target.x ? 1 : -1;
    // console.log(dy, dx);
    // console.log((this.cell.x,this.cell.y))
    // console.log(this.cell.x, this.cell.y, this.cell, this.cell.color);
    if (!super.canMove(target) && !(this.cell.y - target.y > 1)) return false;
    if (
      (y1 === -1 &&
        this.cell.y - target.y === 1 &&
        Math.abs(target.x - this.cell.x) === 1 &&
        this.cell.board?.getCell(target.x, target.y).isEmpty()) ||
      (y1 === 1 &&
        this.cell.y - target.y === -1 &&
        Math.abs(target.x - this.cell.x) === 1 &&
        this.cell.board?.getCell(target.x, target.y).isEmpty())
    )
      return true;
    // else if (
    //   y1 === -1 &&
    //   this.cell.y - target.y === 2 &&
    //   this.cell.board?.getCell(target.x, target.y).isEmpty() &&
    //   !this.cell.board?.getCell(target.x + 1, target.y + 1).isEmpty()
    // ) {
    //   return true;
    // }

    // else if (
    //   y1 === -1 &&
    //   this.cell.y - target.y === 1 &&
    //   Math.abs(target.x - this.cell.x) === 1 &&
    //   !this.cell.board?.getCell(target.x, target.y).isEmpty()
    // ) {
    // }

    return false;
  }
}
