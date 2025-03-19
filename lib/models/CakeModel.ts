import mongoose, { Model, Schema } from "mongoose";
import { Cake } from "../types/all";
import { MaterialSchema } from "./MaterialModel";
import { RecipeSchema } from "./RecipeModel";

const CakeSchema = new Schema<Cake>({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  desription: String,
  materials: [
    {
      mtNumber: {
        type: Number,
        required: true,
      },
      MaterialSchema,
    },
  ],
  recipes: [
    {
      rpNumber: {
        type: Number,
        required: true,
      },
      RecipeSchema,
    },
  ],
});

const CakeModel: Model<Cake> =
  mongoose.models?.cake || mongoose.model<Cake>("cake", CakeSchema);

export default CakeModel;
