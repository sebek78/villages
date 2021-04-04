import { SQUARES, NODES, SQUARE_RESOLUTION } from './mapConstants'

interface Vector {
  x: number;
  y: number;
}

export class LayerGenerator {

  private grid: Vector[][] = []

  // linear
  private interpolate(a0: number, a1: number, w: number){
    return (a1-a0)*w + a0;
  }

  // random vector insidethe square
  private randomGradient(): Vector{
    let theta = Math.random()*2*Math.PI
    return {
      x: Math.cos(theta),
      y: Math.sin(theta)
    }
  }

  private fillGrid() {
    for(let y=0; y<NODES; y++){
      let row = []
      for (let x=0; x< NODES; x++){
        row.push(this.randomGradient())
      }
      this.grid.push(row)
    }
  }

  // the sum of the two vectors
  private dotGridGradient(ix: number, iy:number, x:number, y:number){
    let gradient = this.grid[iy][ix];

    // distance vector
    const dx = x - ix
    const dy = y - iy;

    return dx * gradient.x + dy * gradient.y;
  }

  private smoothstep(value: number){
    if (value < 0) return 0;
    if (value >= 1) return 1;
    return 3*Math.pow(value,2)-2*Math.pow(value, 3)
  }

  private perlin(x: number,y: number){
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const y0 = Math.floor(y);
    const y1 = y0 + 1;

    // float - integer
    const sx = x - x0;
    const sy = y - y0;

    let n0, n1;
    n0 = this.dotGridGradient(x0, y0, x, y); // top left
    n1 = this.dotGridGradient(x1, y0, x, y); // top right
    const ix0 = this.interpolate(n0, n1, sx); // top value

    n0 = this.dotGridGradient(x0, y1, x, y); // bottom left
    n1 = this.dotGridGradient(x1, y1, x, y); // botom right
    const ix1 = this.interpolate(n0, n1, sx); // bottom value

    const value = this.interpolate(ix0, ix1, sy); // center value
    // values are from a range of -0.5 to 0.5
    return this.smoothstep(value + 0.5);
  }

  public generateLayer(){
    this.fillGrid()
    let layer = []
    for(let y=0; y<SQUARES; y += 1/SQUARE_RESOLUTION){
      let row = []
      for (let x=0; x<SQUARES; x+= 1/SQUARE_RESOLUTION){
        row.push(this.perlin(x,y))
      }
      layer.push(row)
    }
    return layer
  }
}
