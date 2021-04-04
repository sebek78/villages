import { LOWERING_TERRAIN } from './mapConstants'

export class LayerModifier {

  private loweringFactors(height: number, width:number) {
    const factors: number[][] = []

    for(let y=0; y<height; y++){
      factors.push([]);
      for(let x=0; x<width; x++){
        if(y<LOWERING_TERRAIN && x>=y && x<width-y) {
          factors[y][x] = y/LOWERING_TERRAIN
        } else if (x<LOWERING_TERRAIN && y>=x && y<height-x) {
          factors[y][x] = x/LOWERING_TERRAIN
        } else if (y > height -1 -LOWERING_TERRAIN && height-1-y <= x && y>=x) {
          factors[y][x] = (height-1-y)/LOWERING_TERRAIN
        } else if (x>width-1-LOWERING_TERRAIN && x>=width-1-y && y<x ) {
          factors[y][x] = (width-1-x)/LOWERING_TERRAIN
        } else {
          factors[y][x] = 1
        }
      }
    }
    return factors
  }

  public loweringTerrain(layer: number[][]){
    const height = layer.length;
    const width = layer[0].length;

    const factors = this.loweringFactors(height,width)
    const loweredTerrain: number[][] = []
    for(let y=0; y<height; y++){
      loweredTerrain.push([]);
      for(let x=0; x<width; x++){
        loweredTerrain[y][x] = layer[y][x] * factors[y][x]
      }
    }

    return loweredTerrain
  }
}
