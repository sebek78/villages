import { CtxType } from '../map.component'
import { FIELD_UNIT, SQUARE_RESOLUTION } from './mapConstants'
import { terrain, ITerrain } from './mapConstants'

export class MapRenderer {
  constructor(
    private ctx: CtxType,
    private terrainConfig: ITerrain
  ) { }

  public drawMap(terrain: number[][], terrainConfig: ITerrain, forests:number[][]) {
    this.terrainConfig = terrainConfig
    terrain.forEach((row,y)=>{
      row.forEach((number,x)=>{
          this.drawField(y,x, number)
      })
    })
    forests.forEach((row,y)=>{
      row.forEach((number,x)=>{
          if(terrain[y][x] > terrainConfig.ocean.level && terrain[y][x]<terrainConfig.plains.level) {
            if(number <= terrainConfig.forest.level) {
              this.drawForestField(y,x)
            }
          }
      })
    })
  }

  public drawRawLayer(layer: number[][]) {
    layer.forEach((row,y)=>{
      row.forEach((number,x)=>{
          this.drawRawField(y,x, number)
      })
    })
  }

  private drawRawField(y: number,x:number, number:number):void{
    if(this.ctx){
      const color = 255*number;
      this.ctx.fillStyle = `rgb(${color},${color},${color})`
      this.ctx.fillRect(x*FIELD_UNIT,y*FIELD_UNIT,FIELD_UNIT,FIELD_UNIT)
    }
  }

  private drawField(y: number,x:number, number:number):void{
    const { ocean, plains, hills, mountains } = this.terrainConfig;

    if(this.ctx){
      if (number<ocean.level) {
        this.ctx.fillStyle = ocean.color
      } else if (number>=ocean.level && number<=plains.level){
        this.ctx.fillStyle = plains.color
      } else if (number>plains.level && number <=hills.level) {
        this.ctx.fillStyle = hills.color
      }
      else if (number>hills.level) {
        this.ctx.fillStyle = mountains.color
      } else {
        const color = 255*number;
        this.ctx.fillStyle = `rgb(${color},${color},${color})`
      }
      this.ctx.fillRect(x*FIELD_UNIT,y*FIELD_UNIT,FIELD_UNIT,FIELD_UNIT)

      /*
      for (let i=0; i<8; i++){
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black'
        this.ctx.moveTo(i*FIELD_UNIT*SQUARE_RESOLUTION, 0)
        this.ctx.lineTo(i*FIELD_UNIT*SQUARE_RESOLUTION,640)
        this.ctx.stroke();
      }
      for (let i=0; i<8; i++){
        this.ctx.beginPath();
        this.ctx.moveTo(0, i*FIELD_UNIT*SQUARE_RESOLUTION)
        this.ctx.lineTo(640, i*FIELD_UNIT*SQUARE_RESOLUTION)
        this.ctx.stroke();
      }*/
    }
  }

  private drawForestField(y: number,x:number):void{
    if(this.ctx){
      this.ctx.fillStyle = this.terrainConfig.forest.color;
      // this.ctx.fillRect(x*FIELD_UNIT,y*FIELD_UNIT,FIELD_UNIT,FIELD_UNIT)
      this.ctx.beginPath()
      this.ctx.arc(x*FIELD_UNIT+FIELD_UNIT/2,y*FIELD_UNIT+FIELD_UNIT/2,FIELD_UNIT-2,0,2*Math.PI)
      this.ctx.stroke()
    }
  }
}
