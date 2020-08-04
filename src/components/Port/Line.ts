// import * as vector from "../../lib/vector";
import Vector2D from "../../lib/Vector2D"

type Position = [number, number];
class Line {
  startPos= new Vector2D([0, 0]);
  endPos= new Vector2D([0, 0]);
  container: HTMLElement;
  lineDom: SVGSVGElement | null = null;
  size = new Vector2D([0, 0])
  bias = new Vector2D([0, 0])
  dirction = new Vector2D([1, 1])

  constructor(container: HTMLElement, startPos: Position, endPos: Position, bias: Position) {
    this.container = container;
    this.startPos = new Vector2D(startPos);
    this.endPos = new Vector2D(endPos);
    this.bias = new Vector2D(bias)
   
    this.init();
  }
  init() {
    this.createLine();
  }

  createLine() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "z-index", "100");

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttributeNS(null, "stroke", "black");
    path.setAttributeNS(null, "fill", "transparent");
    svg.appendChild(path);
    this.lineDom = svg;

    this.container.append(svg);
  }

  update(endPos: Position) {

    this.endPos = new Vector2D(endPos);

    const v = this.endPos.copy().sub(this.startPos)
    this.dirction = v.copy().sign()

    const offset = new Vector2D([
      v[0] > 0 ? 0 : -1*v[0],
      v[1] > 0 ? 0 : -1*v[1]
    ])

    const transformValue = `
    scale(${this.dirction}),
    translate(${
      this.bias.copy().mul(this.dirction).add(offset)
    })
    `
    
    
    this.size = v.copy().abs()
    this.lineDom?.setAttributeNS(
      null, 
      "transform", 
      transformValue
    );
    this.lineDom?.setAttributeNS(null, "width", this.size[0].toString());
    this.lineDom?.setAttributeNS(null, "height", this.size[1].toString());
    
    // this.lineDom?.style.transform= `translate(25, 25)`

    this.lineDom?.children[0].setAttributeNS(
      null,
      "d",
      `M 0 0 L ${this.size[0]} ${this.size[1]}`
    );
    // console.log(v);
  }

  remove() {
    this.lineDom?.remove();
  }
}

export default Line;
