import Line from "./Line"

class PortConnectable {
  container: HTMLElement= document.getElementById("js_container") as HTMLElement
  startDom: HTMLDivElement;
  endDom: HTMLDivElement;
  line: Line | null = null;
  width: number;
  height: number;
  constructor(startDom: HTMLDivElement, width: number = 50, height: number= 50) {
    this.startDom = startDom;
    this.width =width
    this.height = height
    this.endDom = document.createElement("div");
    this.init();
  }
  init() {
    this.startDom.addEventListener("mousedown", this.handleMousedown.bind(this));
    
    window.addEventListener("mouseup", this.handleMouseup.bind(this));
  }
  handleMousedown(event: MouseEvent) {
    this.createEndPort(event.pageX, event.pageY);
    this.line = new Line(
      this.startDom, 
      [event.pageX, event.pageY], 
      [event.pageX, event.pageY],
      [this.width/2, this.height/2]
    )
    window.addEventListener(
      "mousemove", 
      this.handleMousemove, 
    );
  }
  handleMousemove = (event: MouseEvent) => {
    const x = event.pageX
    const y = event.pageY
    this.update(x, y)
    this.line?.update([x, y])
  }
  
  handleMouseup(event: MouseEvent) {
    window.removeEventListener(
      "mousemove", 
      this.handleMousemove, 
    
    );
    this.endDom.remove();
    this.line?.remove();
  }
  update = (x:number, y:number) => {
    this.endDom.style.left = x - this.width/2 + "px"
    this.endDom.style.top = y- this.height/2 + "px"
  }
  createEndPort(left: number = 0, top: number = 0) {
    console.log(left, top);
    const dom = this.endDom;
    dom.style.width = this.width + "px";
    dom.style.height = this.height + "px";
    dom.style.backgroundColor = "red";
    dom.style.borderRadius = "50%";
    dom.style.borderRadius = "50%";
    dom.style.position = "absolute";
    dom.style.zIndex = "-2";

    this.update(left, top)

    this.container.append(dom);
  }

}

export default PortConnectable;
