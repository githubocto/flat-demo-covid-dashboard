// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface MobilityDataType {
  date: string;
  groceryAndPharmacyPercentChangeFromBaseline: number;
  parksPercentChangeFromBaseline: number;
  residentialPercentChangeFromBaseline: number;
  retailAndRecreationPercentChangeFromBaseline: number;
  transitStationsPercentChangeFromBaseline: number;
  workplacesPercentChangeFromBaseline: number;
}

export interface StateDataType {
  name: string;
  mobility: MobilityDataType;
  covidStats: any[];
  restrictions: any[];
}
