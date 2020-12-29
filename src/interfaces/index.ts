export interface IImage {
  id: number;
  url: string;
}

export interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  telephone: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  pending: boolean;
  images: IImage[];
}

export interface IOrphanageParams {
  id: string;
}

export interface IExcludeOrphanageParams {
  id: number;
  name: string;
}