import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { TerrainRangeInputComponent } from './components/terrain-range-input/terrain-range-input.component';



@NgModule({
  declarations: [MapComponent, TerrainRangeInputComponent],
  imports: [
    CommonModule
  ]
})
export class MapModule { }
