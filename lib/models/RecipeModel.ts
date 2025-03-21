import mongoose, { Model, Schema } from "mongoose";
import { Recipe } from "../types/all";

export const RecipeSchema = new Schema<Recipe>({
  name: {
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
      quantity: {
        type: Number,
        required: true, 
      },
    },
  ],
});

const RecipeModel: Model<Recipe> =
  mongoose.models.recipe || mongoose.model<Recipe>("recipe", RecipeSchema);

export default RecipeModel;
