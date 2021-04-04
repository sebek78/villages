import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITerrainType, IUpdatedTerrain, terrainKeys } from '../../services/mapConstants';

@Component({
  selector: 'app-terrain-range-input',
  templateUrl: './terrain-range-input.component.html',
  styleUrls: ['./terrain-range-input.component.scss']
})
export class TerrainRangeInputComponent implements OnInit {
  @Input() terrain: ITerrainType | undefined
  @Output() terrainValueChanged = new EventEmitter<IUpdatedTerrain>()

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(key: terrainKeys | undefined, value: number){
    if(key){
      this.terrainValueChanged.emit({key,value})
    }
  }
}
