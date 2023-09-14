import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blacklogo from "../../assets/checker_black.png";
import whitelogo from "../../assets/checker_white.png";
import testlogo from "../../assets/checker_2.png";
import testlogo2 from "../../assets/checker_1.png";
export class Checker extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? testlogo2 : testlogo;
    this.name = FigureNames.CHECKER;
    // console.log(color);
  }
  canKill(target: Cell): boolean {
    const y1 = this.cell.figure?.color === Colors.WHITE ? -1 : 1;
    const dy = this.cell.y < target.y ? 1 : -1;
    const dx = this.cell.x < target.x ? 1 : -1;
    if (
      (y1 === -1 &&
        dy === -1 &&
        dx === 1 &&
        this.cell.board?.getCell(target.x, target.y).isEmpty() &&
        target.x - 1 >= 0 &&
        target.y + 1 <= 7 &&
        !this.cell.board?.getCell(target.x - 1, target.y + 1).isEmpty() &&
        this.cell.x - target.x === -2 &&
        this.cell.y - target.y === 2 &&
        this.cell.board.getCell(target.x - 1, target.y + 1).figure?.color !=
          "white") ||
      (y1 === -1 &&
        dy === -1 &&
        dx === -1 &&
        this.cell.board?.getCell(target.x, target.y).isEmpty() &&
        target.x + 1 <= 7 &&
        target.y + 1 <= 7 &&
        !this.cell.board?.getCell(target.x + 1, target.y + 1).isEmpty() &&
        this.cell.x - target.x === 2 &&
        this.cell.y - target.y === 2 &&
        this.cell.board.getCell(target.x + 1, target.y + 1).figure?.color !=
          "white") ||
      (y1 === 1 &&
        dy === 1 &&
        dx === 1 &&
        this.cell.board?.getCell(target.x, target.y).isEmpty() &&
        // target.x - 1 >= 0 &&
        // target.y + 1 >= 7 &&
        !this.cell.board?.getCell(target.x - 1, target.y - 1).isEmpty() &&
        this.cell.x - target.x === -2 &&
        this.cell.y - target.y === -2 &&
        this.cell.board.getCell(target.x - 1, target.y - 1).figure?.color !=
          "black") ||
      (y1 === 1 &&
        dy === 1 &&
        dx === -1 &&
        this.cell.board?.getCell(target.x, target.y).isEmpty() &&
        // target.x - 1 >= 0 &&
        // target.y + 1 >= 7 &&
        !this.cell.board?.getCell(target.x + 1, target.y - 1).isEmpty() &&
        this.cell.x - target.x === 2 &&
        this.cell.y - target.y === -2 &&
        this.cell.board.getCell(target.x + 1, target.y - 1).figure?.color !=
          "black")
    )
      return true;

    return false;
  }
  canMove(target: Cell): boolean {
    // console.log(this.cell.x, this.cell.y);
    console.log(this.cell.figure?.color);
    const y1 = this.cell.figure?.color === Colors.WHITE ? -1 : 1;
    const dy = this.cell.y < target.y ? 1 : -1;
    const dx = this.cell.x < target.x ? 1 : -1;
    if (!super.canMove(target)) return false;
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

    return false;
  }

  moveFigure(target: Cell) {
    if (this.cell.figure && this.cell.figure?.canKill(target)) {
      this.cell.figure.moveFigure(target);
      if (target.figure) {
        console.log(target.figure);
        // this.addLostFigure(target.figure);
      }
      target.setFigure(this.cell.figure);
      this.cell.figure = null;
    }
  }
}
