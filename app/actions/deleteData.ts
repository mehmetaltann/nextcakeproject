"use server";
import dbConnect from "@/lib/db/dbConnect";
import CakeModel from "@/lib/models/CakeModel";
import MaterialModel from "@/lib/models/MaterialModel";
import RecipeModel from "@/lib/models/RecipeModel";

export const deleteMaterial = async (materialId: string) => {
  try {
    await dbConnect();
    const result = await MaterialModel.findByIdAndDelete(materialId);
    if (!result) {
      console.error("Material bulunamadı veya silinemedi.");
      return { success: false, message: "Material bulunamadı" };
    }
    return { success: true, message: "Material başarıyla silindi." };
  } catch (error) {
    console.error("Material silinirken bir hata oluştu:", error);
    return {
      success: false,
      message: "Silme işlemi sırasında bir hata oluştu.",
    };
  }
};

export const deleteRecipe = async (recipeId: string) => {
  try {
    await dbConnect();

    const recipe = await RecipeModel.findById(recipeId).populate(
      "materials.material"
    );

    if (!recipe) {
      console.error("Recipe bulunamadı.");
      return { success: false, message: "Recipe bulunamadı" };
    }

    if (recipe.materials && recipe.materials.length > 0) {
      console.error("Bu Recipe'de material bulunduğu için silinemez.");
      return {
        success: false,
        message: "Bu Recipe'de material bulunduğu için silinemez.",
      };
    }
    const result = await RecipeModel.findByIdAndDelete(recipeId);

    if (!result) {
      console.error("Recipe silinirken bir hata oluştu.");
      return { success: false, message: "Recipe silinirken bir hata oluştu." };
    }

    return { success: true, message: "Recipe başarıyla silindi." };
  } catch (error) {
    console.error("Recipe silinirken bir hata oluştu:", error);
    return {
      success: false,
      message: "Silme işlemi sırasında bir hata oluştu.",
    };
  }
};

export const deleteCake = async (cakeId: string) => {
  try {
    await dbConnect();
    const cake = await CakeModel.findById(cakeId)
      .populate("recipes.recipe")
      .populate("materials.material");
    if (!cake) {
      console.error("Cake bulunamadı.");
      return { success: false, message: "Cake bulunamadı" };
    }
    if (
      (cake.recipes && cake.recipes.length > 0) ||
      (cake.materials && cake.materials.length > 0)
    ) {
      console.error(
        "Bu Cake içinde recipe veya material bulunduğu için silinemez."
      );
      return {
        success: false,
        message:
          "Bu Cake içinde recipe veya material bulunduğu için silinemez.",
      };
    }
    const result = await CakeModel.findByIdAndDelete(cakeId);

    if (!result) {
      console.error("Cake silinirken bir hata oluştu.");
      return { success: false, message: "Cake silinirken bir hata oluştu." };
    }

    return { success: true, message: "Cake başarıyla silindi." };
  } catch (error) {
    console.error("Cake silinirken bir hata oluştu:", error);
    return {
      success: false,
      message: "Silme işlemi sırasında bir hata oluştu.",
    };
  }
};

export const deleteMaterialFromRecipe = async (
  recipeId: string,
  materialId: string
) => {
  try {
    await dbConnect();
    const recipe = await RecipeModel.findById(recipeId).populate(
      "materials.material"
    );
    if (!recipe) {
      console.error("Recipe bulunamadı.");
      return { success: false, message: "Recipe bulunamadı" };
    }

    const materialIndex = recipe.materials.findIndex(
      (material) => material.material._id.toString() === materialId
    );

    if (materialIndex === -1) {
      console.error("Bu material Recipe içinde bulunamadı.");
      return {
        success: false,
        message: "Bu material Recipe içinde bulunamadı.",
      };
    }

    recipe.materials.splice(materialIndex, 1);

    await recipe.save();

    return { success: true, message: "Material başarıyla silindi." };
  } catch (error) {
    console.error("Material silinirken bir hata oluştu:", error);
    return { success: false, message: "Material silinirken bir hata oluştu." };
  }
};
