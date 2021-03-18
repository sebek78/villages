import { Injectable } from '@angular/core';
import { CtxType } from '../map.component'
import { LayerGenerator } from './layer-generator';
import { LayerDataGetter } from './layer-data-getter';
import { LayerModifier } from './layer-modifier';

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
    const layerGenerator = new LayerGenerator(8,8);
    const layerDataGetter = new LayerDataGetter();
    // const layerModifier = new LayerModifier();

    this.layer = layerGenerator.generateLayer();
    const layerData = layerDataGetter.getLayerData(this.layer)
    console.log(layerData.distribution)
    // this.layer = layerModifier.loweringTerrain(this.layer);
  }

  public drawMap() {
    this.layer.forEach((row,y)=>{
      row.forEach((number,x)=>{
          this.drawField(y,x, number)
      })
   })
  }

  private drawField(y: number,x:number, number:number):void{
    const UNIT = 10;
    if(this.ctx){
      if (number<0.25) {
        this.ctx.fillStyle = 'lightskyblue'
      } else {
        const color = 255*number;
        this.ctx.fillStyle = `rgb(${color},${color},${color})`
      }
      this.ctx.fillRect(x*UNIT,y*UNIT,UNIT,UNIT)

      for (let i=0; i<8; i++){
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black'
        this.ctx.moveTo(i*UNIT*8, 0)
        this.ctx.lineTo(i*UNIT*8,640)
        this.ctx.stroke();
      }
      for (let i=0; i<8; i++){
        this.ctx.beginPath();
        this.ctx.moveTo(0, i*UNIT*8)
        this.ctx.lineTo(640, i*UNIT*8)
        this.ctx.stroke();
      }
    }
  }
}
