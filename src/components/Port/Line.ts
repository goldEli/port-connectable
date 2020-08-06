// import * as vector from "../../lib/vector";
import Vector2D from "../../lib/Vector2D"

type LineType = "solid" | "dash"

type Position = [number, number];

class Line {
  startPos= new Vector2D([0, 0]);
  endPos= new Vector2D([0, 0]);
  container: HTMLElement;
  lineDom: SVGSVGElement | null = null;

  // 线所占的大小 [width, height]
  size = new Vector2D([0, 0])

  // 起始点偏移量
  biasForCenter = new Vector2D([0, 0])

  /**
     * 线的方向
     * 右下为 [1, 1]
     * 右上为 [1, -1]
     */
  dirction = new Vector2D([1, 1])

  isBeizer: boolean = true
  
  color = "black"
  linetype: LineType = "solid"

  constructor(
    options: {
      container: HTMLElement, 
      startPos: Position, 
      endPos: Position, 
      // biasForCenter: Position,
      size: Position,
      color?: string,
      linetype?: LineType,
      isBeizer?: boolean
    }
  ) {
    this.container = options.container;
    this.startPos = new Vector2D(options.startPos);
    this.endPos = new Vector2D(options.endPos);
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

    this.endPos = new Vector2D(endPos);

    const v = this.endPos.copy().sub(this.startPos)
    // 线所占的大小 [width, height]
    this.size = v.copy().abs()
    
    /**
     * 线的方向
     * 右下为 [1, 1]
     * 右上为 [1, -1]
     */
    this.dirction = v.copy().sign()

    

    const offset = this.createOffset(v, this.dirction)

    const transformValue = `
    scale(${this.dirction}),
    translate(${
      offset
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
      this.isBeizer 
      ? this.createBeizeCurvePath(this.size[0], this.size[1])
      : this.createStraightPath(this.size[0], this.size[1])
    );
    // console.log(v);
  }

  createOffset(v: Vector2D, dirction: Vector2D) {
    // 基于第四象限的偏移 + 基于圆心的偏移
    const ret = new Vector2D([
      v[0] > 0 ? 0 : -1*v[0],
      v[1] > 0 ? 0 : -1*v[1]
    ]).add(
      this.biasForCenter.copy().mul(dirction)
    )
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
