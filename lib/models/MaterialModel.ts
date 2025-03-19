import mongoose, { Model, Schema } from "mongoose";
import { Material } from "../types/all";

export const MaterialSchema = new Schema<Material>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  desription: String,
});

const MaterialModel: Model<Material> =
  mongoose.models?.material ||
  mongoose.model<Material>("material", MaterialSchema);

export default MaterialModel;
