import { Injectable } from '@angular/core';
import { CtxType } from '../map.component'
import { LayerGenerator } from './layer-generator';
import { LayerDataGetter } from './layer-data-getter';
import { LayerModifier } from './layer-modifier';
import { MapRenderer } from './map-renderer';
import { terrain, ITerrain, IUpdatedTerrain, terrainKeys } from './mapConstants';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private ctx: CtxType = null;
  private mapRenderer: MapRenderer | null = null;
  private terrain: number[][] = [];
  private forests: number[][] = [];
  public terrainConfig: ITerrain;

  constructor() {
    this.initMap()
    this.terrainConfig = terrain;
  }

  public initCtx(ctx: CtxType){
    this.ctx = ctx;
    this.mapRenderer = new MapRenderer(this.ctx, this.terrainConfig)
  }

  private initMap() {
    const layerGenerator = new LayerGenerator();
    const layerDataGetter = new LayerDataGetter();
    const layerModifier = new LayerModifier();

    this.terrain = layerGenerator.generateLayer();
    this.terrain = layerModifier.loweringTerrain(this.terrain);
    this.forests = layerGenerator.generateLayer()
    const layerData = layerDataGetter.getLayerData(this.forests)
    console.log(layerData)
  }

  public drawMap() {
    // if(this.mapRenderer) this.mapRenderer.drawRawLayer(this.forests)
    if(this.mapRenderer) this.mapRenderer.drawMap(this.terrain, this.terrainConfig, this.forests)
  }

  public changeConfigValue(newValue: IUpdatedTerrain){
      const key: terrainKeys = newValue.key;
      const value: number  = newValue.value;
      const updatedValue = this.terrainConfig[key].level + value
      this.terrainConfig[key].level = parseFloat(updatedValue.toFixed(2))
      this.drawMap()
  }
}
