import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MapService } from './services/map.service';

export type CtxType = CanvasRenderingContext2D | null;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('canvas', {static:true})
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CtxType;

  constructor(
    private mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.mapService.initCtx(this.ctx);
    this.drawMap()
  }

  drawMap(){
    this.mapService.drawMap()
  }
}
