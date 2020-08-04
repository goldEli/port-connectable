import * as vector from "../../lib/vector";
import { version } from "react";

type Position = [number, number];
class Line {
  startPos: Position = [0, 0];
  endPos: Position = [0, 0];
  container: HTMLElement;
  lineDom: SVGSVGElement | null = null;
  size = [0, 0] as vector.Vector
  bias = [0, 0] as vector.Vector
  dirction = [1, 1] as vector.Vector

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
    let v = vector.sub([0, 0], this.endPos, this.startPos)
    this.dirction = vector.getSign(v)
    

    const offset = vector.create(
      v[0] > 0 ? 0 : -1*v[0],
      v[1] > 0 ? 0 : -1*v[1]
    )

    console.log(this.dirction)
    console.log(vector.add([0,0], [0, 0], offset))

    const transformValue = `
    scale(${vector.getSign(v)}),
    translate(${
      vector.add(
        [0,0], 
        vector.mul([0,0], this.dirction, this.bias), 
        offset
      )
    })
    
    `
    
    
    this.size = vector.abs(v)
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
