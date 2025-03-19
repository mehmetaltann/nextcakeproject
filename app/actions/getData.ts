"use server";
import dbConnect from "@/lib/db/dbConnect";
import CakeModel from "@/lib/models/CakeModel";
import MaterialModel from "@/lib/models/MaterialModel";
import ParameterModel from "@/lib/models/ParameterModel";
import RecipeModel from "@/lib/models/RecipeModel";
import { Material } from "@/lib/types/all";

export const getMaterials = async () => {
  try {
    await dbConnect();
    const materials = await MaterialModel.find({});
    const filteredAllItems: Material[] = JSON.parse(JSON.stringify(materials));
    return filteredAllItems as Material[];
  } catch (error) {
    console.error("Materyaller alınırken bir hata oluştu:", error);
    return [];
  }
};

export const getRecipes = async () => {
  try {
    await dbConnect();
    const recipes = await RecipeModel.find({}).populate({
      path: "materials.material",
      model: "Material",
    });
    const filteredAllRecipes = JSON.parse(JSON.stringify(recipes));
    return filteredAllRecipes;
  } catch (error) {
    console.error("Tarifler ve malzemeler alınırken bir hata oluştu:", error);
    return [];
  }
};

export const getCakes = async () => {
  try {
    await dbConnect();
    const cakes = await CakeModel.find({})
      .populate({
        path: "materials.material",
        model: "Material",
      })
      .populate({
        path: "recipes.recipe",
        model: "Recipe",
      });
    const filteredAllCakes = JSON.parse(JSON.stringify(cakes));
    return filteredAllCakes;
  } catch (error) {
    console.error(
      "Kekler, tarifler ve malzemeler alınırken bir hata oluştu:",
      error
    );
    return [];
  }
};

export const getParameters = async () => {
  try {
    await dbConnect();
    const parameters = await ParameterModel.find({});
    const filteredAllParameters = JSON.parse(JSON.stringify(parameters));
    return filteredAllParameters;
  } catch (error) {
    console.error("Parametreler alınırken bir hata oluştu:", error);
    return [];
  }
};
