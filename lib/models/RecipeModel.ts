import mongoose, { Model, Schema } from "mongoose";
import { Recipe } from "../types/all";
import { MaterialSchema } from "./MaterialModel";

export const RecipeSchema = new Schema<Recipe>({
  name: {
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
});

const RecipeModel: Model<Recipe> =
  mongoose.models?.recipe || mongoose.model<Recipe>("recipe", RecipeSchema);

export default RecipeModel;
