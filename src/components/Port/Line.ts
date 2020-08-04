import * as vector from "../../lib/vector";

type Position = [number, number];
class Line {
  startPos: Position = [0, 0];
  endPos: Position = [0, 0];
  container: HTMLElement;
  lineDom: SVGSVGElement | null = null;
  width = 0;
  height = 0;
  bias = [0, 0]

  constructor(container: HTMLElement, startPos: Position, endPos: Position, bias: Position) {
    this.container = container;
    this.startPos = startPos;
    this.endPos = endPos;
    this.bias = bias
   
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
    this.endPos = endPos;
    let v = vector.sub([0, 0], this.startPos, this.endPos)
    v = vector.negate(v, v)
    
    this.width = Math.abs(v[0]);
    this.height = Math.abs(v[1]);
    this.lineDom?.setAttributeNS(
      null, 
      "transform", 
      `translate(${this.bias})`
    );
    this.lineDom?.setAttributeNS(null, "width", this.width.toString());
    this.lineDom?.setAttributeNS(null, "height", this.height.toString());
    
    // this.lineDom?.style.transform= `translate(25, 25)`

    this.lineDom?.children[0].setAttributeNS(
      null,
      "d",
      `M 0 0 L ${this.width} ${this.height}`
    );
    // console.log(v);
  }

  remove() {
    this.lineDom?.remove();
  }
}

export default Line;
