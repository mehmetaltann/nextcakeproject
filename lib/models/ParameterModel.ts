import mongoose, { Model, Schema } from "mongoose";
import { Parameter } from "../types/all";

export const ParameterSchema = new Schema<Parameter>(
  {
    variant: {
      type: String,
      required: true,
    },
    content: [
      {
        title: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

const ParameterModel: Model<Parameter> =
  mongoose.models?.parameter ||
  mongoose.model<Parameter>("parameter", ParameterSchema);

export default ParameterModel;

