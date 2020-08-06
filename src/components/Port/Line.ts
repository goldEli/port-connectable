// import * as vector from "../../lib/vector";
import Vector2D from "../../lib/Vector2D"

type LineType = "solid" | "dash"

type Position = [number, number];

class Line {
  startPos= new Vector2D([0, 0]);
  container: HTMLElement;
  lineDom: SVGSVGElement | null = null;

  // 起始点偏移量
  biasForCenter = new Vector2D([0, 0])

  isBeizer: boolean = true
  
  color = "black"
  linetype: LineType = "solid"

  constructor(
    options: {
      container: HTMLElement, 
      startPos: Position, 
      // biasForCenter: Position,
      size: Position,
      color?: string,
      linetype?: LineType,
      isBeizer?: boolean
    }
  ) {
    this.container = options.container;
    this.startPos = new Vector2D(options.startPos);
    this.biasForCenter = new Vector2D(options.size).scale(0.5);

    this.color = options.color || this.color
    this.linetype = options.linetype || this.linetype

    if (options.isBeizer !== void 0) {
      this.isBeizer = options.isBeizer
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

    const [width, height] = this.createSize(endPos)

    const offset = this.createOffset(endPos)
    
    this.lineDom?.setAttributeNS(
      null, 
      "transform", 
      offset
    );
    this.lineDom?.setAttributeNS(null, "width", width < 2 ? "2" : width.toString());
    this.lineDom?.setAttributeNS(null, "height", height < 2 ? "2" : height.toString());
    
    this.lineDom?.children[0].setAttributeNS(
      null,
      "d",
      this.isBeizer 
      ? this.createBeizeCurvePath(width, height)
      : this.createStraightPath(width, height)
    );

  }

  createSize(endPos: Position) {
    const v = this.createEndPointeVector(endPos)
    const size = v.copy().abs()
    const [width, height] = size
    return [width, height]
  }

  createEndPointeVector(endPos: Position) {
    return new Vector2D(endPos).sub(this.startPos)
  }

  createOffset(endPos: Position) {
    const v = this.createEndPointeVector(endPos)
    /**
     * 线的方向
     * 右下为 [1, 1]
     * 右上为 [1, -1]
     */
    const dirction = v.copy().sign()

    // 基于第四象限的偏移 + 基于圆心的偏移
    const bais = new Vector2D([
      v[0] > 0 ? 0 : -1*v[0],
      v[1] > 0 ? 0 : -1*v[1]
    ]).add(
      this.biasForCenter.copy().mul(dirction)
    )
    const ret = `
    scale(${dirction}),
    translate(${
      bais
    })
    `
    return ret
  }

  createBeizeCurvePath(width: number, height: number) {
  
    if (height < 10 || width < 10) {
      return this.createStraightPath(width, height)
    }
    return `M 0 0 Q 0 ${height/3},  ${width/2} ${height/2}, T  ${width} ${height}`
  }

  createStraightPath(width: number, height:number) {
    return `M 0 0 L ${width} ${height}`
  }

  remove() {
    this.lineDom?.remove();
  }
}

export default Line;
