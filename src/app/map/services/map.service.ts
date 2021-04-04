import { Injectable } from '@angular/core';
import { CtxType } from '../map.component'
import { LayerGenerator } from './layer-generator';
import { LayerDataGetter } from './layer-data-getter';
import { LayerModifier } from './layer-modifier';
import { FIELD_UNIT, SQUARE_RESOLUTION } from './mapConstants'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private ctx: CtxType = null;
  private layer: number[][] = [];

  constructor() {
    this.initMap()
  }

  public initCtx(ctx: CtxType){
    this.ctx = ctx;
  }

  private initMap() {
    const layerGenerator = new LayerGenerator();
    const layerDataGetter = new LayerDataGetter();
    const layerModifier = new LayerModifier();

    this.layer = layerGenerator.generateLayer();
    const layerData = layerDataGetter.getLayerData(this.layer)
    console.log(layerData)
    this.layer = layerModifier.loweringTerrain(this.layer);
  }

  public drawMap() {
    this.layer.forEach((row,y)=>{
      row.forEach((number,x)=>{
          this.drawField(y,x, number)
      })
   })
  }

  private drawField(y: number,x:number, number:number):void{

    const OCEAN_LEVEL = 0.10;
    const PLAINS_LEVEL = 0.80;
    const HILLS_LEVEL = 0.96;

    if(this.ctx){
      if (number<0.2) {
        this.ctx.fillStyle = 'lightskyblue'
      } else if (number>=OCEAN_LEVEL && number<=PLAINS_LEVEL){
        this.ctx.fillStyle = '#99cc00'
      } else if (number>PLAINS_LEVEL && number <=HILLS_LEVEL) {
        this.ctx.fillStyle = '#996633'
      }
      else if (number>HILLS_LEVEL) {
        this.ctx.fillStyle = '#333300'
      } else {
        const color = 255*number;
        this.ctx.fillStyle = `rgb(${color},${color},${color})`
      }
      this.ctx.fillRect(x*FIELD_UNIT,y*FIELD_UNIT,FIELD_UNIT,FIELD_UNIT)

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
      }
    }
  }
}
