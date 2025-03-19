export type Material = {
  _id: string;
  name: string;
  type: string;
  unit: string;
  amount: number;
  price: number;
  description?: string;
};

export type Recipe = {
  _id: string;
  name: string;
  description?: string;
  materials?: Material[];
};

export type Cake = {
  _id: string;
  name: string;
  size: string;
  description: string;
  materials?: Material[];
  recipes?: Recipe[];
};

export type Parameter = {
  _id: string;
  variant: string;
  content: Array<{
    title: string;
    value: string;
  }>;
};
