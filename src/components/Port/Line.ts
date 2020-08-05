// import * as vector from "../../lib/vector";
import Vector2D from "../../lib/Vector2D"

type LineType = "solid" | "dash"

type Position = [number, number];

class Line {
  startPos= new Vector2D([0, 0]);
  endPos= new Vector2D([0, 0]);
  container: HTMLElement;
  lineDom: SVGSVGElement | null = null;
  size = new Vector2D([0, 0])
  bias = new Vector2D([0, 0])
  dirction = new Vector2D([1, 1])
  color = "black"
  linetype: LineType = "solid"

  constructor(
    options: {
      container: HTMLElement, 
      startPos: Position, 
      endPos: Position, 
      bias: Position,
      color?: string,
      linetype?: LineType
    }
  ) {
    this.container = options.container;
    this.startPos = new Vector2D(options.startPos);
    this.endPos = new Vector2D(options.endPos);
    this.bias = new Vector2D(options.bias);
    if (options.color) {
      this.color = options.color
    }
    if (options.linetype) {
      this.linetype = options.linetype
    }
   
    this.init();
  }
  init() {
    this.createLine();
  }

  createLine() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "z-index", "100");
    svg.style.position = "absolute"
    svg.style.top = "0"
    svg.style.left = "0"

    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.setAttributeNS(null, "stroke", this.color);
    path.setAttributeNS(null, "fill", "transparent");

    if (this.linetype === "dash") {
      path.setAttributeNS(null, "stroke-dasharray", '5');
    }
    
    
    svg.appendChild(path);
   
    this.lineDom = svg;

    this.container.append(svg);
  }

  update(endPos: Position) {

    this.endPos = new Vector2D(endPos);

    const v = this.endPos.copy().sub(this.startPos)
    this.size = v.copy().abs()
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
    
    
    
    this.lineDom?.setAttributeNS(
      null, 
      "transform", 
      transformValue
    );
    this.lineDom?.setAttributeNS(null, "width", this.size[0] < 2 ? "2" : this.size[0].toString());
    this.lineDom?.setAttributeNS(null, "height", this.size[1] < 2 ? "2" : this.size[1].toString());
 

    
    this.lineDom?.children[0].setAttributeNS(
      null,
      "d",
      // `M 0 0 L ${this.size[0]} ${this.size[1]}`
      this.createBeizeCurvePath(this.size[0], this.size[1])
      // this.createSolidPath(this.size[0], this.size[1])
      // `M 0 0 Q 0 ${this.size[1]/3},  ${this.size[0]/2} ${this.size[1]/2}, T  ${this.size[0]} ${this.size[1]}`
    );
    // console.log(v);
  }

  createBeizeCurvePath(width: number, height: number) {
    console.log(width, height)
    if (height < 10 || width < 10) {
      return this.createSolidPath(width, height)
    }
    return `M 0 0 Q 0 ${height/3},  ${width/2} ${height/2}, T  ${width} ${height}`
  }

  createSolidPath(width: number, height:number) {
    return `M 0 0 L ${width} ${height}`
  }

  remove() {
    this.lineDom?.remove();
  }
}

export default Line;
