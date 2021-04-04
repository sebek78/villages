export const FIELD_UNIT = 5; // pixels
export const SQUARE_RESOLUTION = 16; // field_units
export const SQUARES = 8;
export const NODES = SQUARES + 1;
export const LOWERING_TERRAIN = 16; // fields from the border of the map, to makes the island

export type terrainKeys = 'ocean' | 'plains' | 'hills' | 'mountains'

export interface ITerrainType {
  level: number;
  color: string;
  label: string;
  key: terrainKeys;
}

export interface ITerrain {
  ocean: ITerrainType;
  plains: ITerrainType;
  hills: ITerrainType;
  mountains: ITerrainType;
}

export interface IUpdatedTerrain {
  key: terrainKeys;
  value: number;
}

export const terrain: ITerrain = {
  ocean: {
    level: 0.15,
    color: '#0066cc',
    label: 'ocean',
    key: 'ocean'
  },
  plains : {
    level: 0.8,
    color: '#99cc00',
    label: 'łąki',
    key: 'plains'
  },
  hills: {
    level:0.96,
    color: '#996633',
    label: 'wzgórza',
    key: 'hills'
  },
  mountains: {
    level:1,
    color: '#333300',
    label: 'góry',
    key: 'mountains'
  }
}
