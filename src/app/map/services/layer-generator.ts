const MMU = 8;

export class LayerGenerator {
  private layer0:  number[][]= [];
  private sample: number[][] = []
  private stretchedSample: number[][] = [];
  private layer1: number[][] = [];
  private layer2: number[][] = [];
  private layer3: number[][] = [];
  private layer4: number[][] = [];

  public width: number;
  public height: number;
  public finalLayer: number[][] = [];

  constructor(x: number, y:number){
      this.width = MMU * x;
      this.height = MMU * y;
  }

  private createFirstLayer() : number[][] {
      const layer: number[][] = [];
      for (let y = 0; y<this.height; y++){
          const row = [];
          for (let x = 0; x<this.width; x++) {
              row[x] = Math.round(Math.random())
          }
          layer.push(row)
      }
      return layer;
  }

  private getLayerSample (layer: number[][]):number[][]{
      const sample:number[][] = [];
      for (let y = 0; y<this.height/2+1; y++){
          const row = []
          for (let x = 0; x<this.width/2+1; x++) {
              row[x] = layer[y][x]
          }
          sample.push(row)
      }
      return sample;
  }

  private static stretchLayer (layer:number[][]):number[][]{
      const stretchedLayer: number[][] = [];
      for (let y = 0; y < layer.length; y++){
          const row = [];
          const nextRow = [];
          for (let x = 0; x < layer[y].length; x++) {
              if(x<layer[y].length -1) {
                  row[x * 2] = layer[y][x]
                  row[x * 2 + 1] = -1
                  nextRow[x * 2] = -1
                  nextRow[x * 2 + 1] = -1
              } else { // last column
                  row[x * 2] = layer[y][x]
                  nextRow[x * 2] = -1
              }
          }
          stretchedLayer.push(row)
          if (y<layer.length-2) {
              stretchedLayer.push(nextRow)
          }
          if(y === layer.length -1) {
              const lastRow = []
              for(let x=0; x<layer[y].length; x++) {
                  lastRow[x * 2] = layer[y][x]
                  lastRow[x * 2 + 1] = -1
              }
              stretchedLayer.push(lastRow)
          }
      }
      return stretchedLayer
  }

  private static interpolateLayer(layer:number[][]){
      const nextLayer: number[][] = [];
      for (let y = 0; y < layer.length-1; y++){
          const row = []
          if(y%2==0) {
              for(let x=0; x < layer[y].length-1; x++) {
                  if(x%2==1){
                      const interpolatedValue = layer[y][x-1]*0.5 + layer[y][x+1]*0.5
                      row.push(interpolatedValue)
                  } else {
                      row.push(layer[y][x])
                  }
              }
          }
          else {
              for(let x=0; x < layer[y].length-1; x++) {
                  if(x%2==0) {
                      const interpolatedValue = layer[y-1][x]*0.5 + layer[y+1][x]*0.5
                      row.push(interpolatedValue)
                  } else {
                       const interpolatedValue = layer[y-1][x-1]*0.25 + layer[y-1][x+1]*0.25
                          + layer[y+1][x-1]*0.25 + layer[y+1][x+1]*0.25
                      row.push(interpolatedValue)
                  }
              }
          }
          nextLayer.push(row)
      }
      return nextLayer
  }

  private createNextLayer(prevLayer: number[][]):number[][]{
      this.sample = this.getLayerSample(prevLayer);
      this.stretchedSample = LayerGenerator.stretchLayer(this.sample);
      return LayerGenerator.interpolateLayer(this.stretchedSample)
  }

  private mergeLayers(): number[][]{
      const map: number[][]=[]
      for(let y=0; y<this.height; y++){
          const row = []
          for(let x = 0; x< this.width; x++){
             row[x]= this.layer4[y][x] * 0.5 + this.layer3[y][x] * 0.25 +
              this.layer2[y][x] * 0.125 + this.layer1[y][x] * 0.0625
              + this.layer0[y][x] * 0.03125
          }
          map.push(row)
      }
      return map
  }

  public generateLayer():number[][]{
      this.layer0 = this.createFirstLayer();
      this.layer1 = this.createNextLayer(this.layer0);
      this.layer2 = this.createNextLayer(this.layer1);
      this.layer3 = this.createNextLayer(this.layer2);
      this.layer4 = this.createNextLayer(this.layer3);
      this.finalLayer = this.mergeLayers();
      return this.finalLayer;
  }
}
