export interface CategoryNoId {
  name: string;
}

export interface Category extends CategoryNoId {
  id: string;
}