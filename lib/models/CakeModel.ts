import mongoose, { Model, Schema } from "mongoose";
import { Cake } from "../types/all";

const CakeSchema = new Schema<Cake>({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  materials: [
    {
      material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  recipes: [
    {
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const CakeModel: Model<Cake> =
  mongoose.models.cake || mongoose.model<Cake>("cake", CakeSchema);

export default CakeModel;
