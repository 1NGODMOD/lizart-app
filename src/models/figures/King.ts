import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure } from "./Figure";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
  }
}
