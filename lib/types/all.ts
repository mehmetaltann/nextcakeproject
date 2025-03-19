export type Material = {
  _id: string;
  name: string;
  type: string;
  unit: string;
  amount: number;
  price: number;
  desription?: string;
};

export type Recipe = {
  _id: string;
  name: string;
  desription?: string;
  materials?: Material[];
};

export type Cake = {
  _id: string;
  name: string;
  size: string;
  desription: string;
  materials?: Material[];
  recipes?: Recipe[];
};
