export interface ISSPosition {
  satlatitude: number;
  satlongitude: number;
  timestamp: number;
}

export interface ISSData {
  positions: ISSPosition[];
}
