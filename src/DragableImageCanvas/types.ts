export interface Image {
  borderColor: string;
  src: string;
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface UserAction {
  imageIndex: number;
  imageX: number;
  imageY: number;
}
