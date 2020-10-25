interface IImage {
  id: number;
  url: string;
}

export interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: IImage[];
}

export interface IOrphanageParams {
  id: string;
}