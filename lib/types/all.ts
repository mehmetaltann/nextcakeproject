export type Material = {
  _id: string;
  name: string;
  type: string;
  unit: string;
  amount: number;
  price: number;
  description?: string;
};

export type MaterialWithoutId = {
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
  materials?: { material: string; quantity: number }[];
};

export type RecipeWithoutId = {
  name: string;
  description?: string;
  materials?: { material: string; quantity: number }[];
};

export type RecipeExtented = {
  _id: string;
  name: string;
  description?: string;
  totalCost: number;
  materials?: {
    amount: number;
    cost: number;
    id: string;
    name: string;
    unit: string;
  }[];
};

export type Cake = {
  _id: string;
  name: string;
  size: string;
  description: string;
  materials?: { material: Material; quantity: number }[];
  recipes?: { recipe: Recipe; quantity: number }[];
};

export type CakeWithoutId = {
  name: string;
  size: string;
  description: string;
  materials?: { material: Material; quantity: number }[];
  recipes?: { recipe: Recipe; quantity: number }[];
};

export type Parameter = {
  _id: string;
  variant: string;
  content: Array<{
    title: string;
    value: string;
  }>;
};
