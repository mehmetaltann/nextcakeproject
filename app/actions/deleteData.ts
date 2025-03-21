"use server";
import dbConnect from "@/lib/db/dbConnect";
import CakeModel from "@/lib/models/CakeModel";
import MaterialModel from "@/lib/models/MaterialModel";
import ParameterModel from "@/lib/models/ParameterModel";
import RecipeModel from "@/lib/models/RecipeModel";
import { revalidatePath } from "next/cache";

export const deleteMaterial = async (materialId: string) => {
  try {
    await dbConnect();
    const result = await MaterialModel.findByIdAndDelete(materialId);
    if (!result) {
      console.error("Material bulunamadı veya silinemedi.");
      return { status: false, msg: "Material bulunamadı" };
    }
    revalidatePath("/materials");
    return { status: true, msg: "Material başarıyla silindi." };
  } catch (error) {
    console.error("Material silinirken bir hata oluştu:", error);
    return {
      status: false,
      msg: "Silme işlemi sırasında bir hata oluştu.",
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
      return { status: false, msg: "Recipe bulunamadı" };
    }
    if (recipe.materials && recipe.materials.length > 0) {
      console.error("Bu Recipe'de material bulunduğu için silinemez.");
      return {
        status: false,
        msg: "Bu Recipe'de material bulunduğu için silinemez.",
      };
    }
    const result = await RecipeModel.findByIdAndDelete(recipeId);
    if (!result) {
      console.error("Recipe silinirken bir hata oluştu.");
      return { status: false, msg: "Recipe silinirken bir hata oluştu." };
    }
    revalidatePath("/recipes");
    return { status: true, msg: "Recipe başarıyla silindi." };
  } catch (error) {
    console.error("Recipe silinirken bir hata oluştu:", error);
    return {
      status: false,
      msg: "Silme işlemi sırasında bir hata oluştu.",
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
      return { status: false, msg: "Cake bulunamadı" };
    }
    if (
      (cake.recipes && cake.recipes.length > 0) ||
      (cake.materials && cake.materials.length > 0)
    ) {
      console.error(
        "Bu Cake içinde recipe veya material bulunduğu için silinemez."
      );
      return {
        status: false,
        msg: "Bu Cake içinde recipe veya material bulunduğu için silinemez.",
      };
    }
    const result = await CakeModel.findByIdAndDelete(cakeId);

    if (!result) {
      console.error("Cake silinirken bir hata oluştu.");
      return { status: false, msg: "Cake silinirken bir hata oluştu." };
    }
    revalidatePath("/cakes");
    return { status: true, msg: "Cake başarıyla silindi." };
  } catch (error) {
    console.error("Cake silinirken bir hata oluştu:", error);
    return {
      status: false,
      msg: "Silme işlemi sırasında bir hata oluştu.",
    };
  }
};

export const deleteMaterialFromRecipe = async (
  recipeId: string,
  materialId: string
) => {
  try {
    await dbConnect();

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return { status: false, msg: "Recipe bulunamadı." };
    }

    if (!recipe.materials || recipe.materials.length === 0) {
      return {
        status: false,
        msg: "Recipe içerisinde material bulunmuyor.",
      };
    }

    const materialIndex = recipe.materials.findIndex(
      (material) => material.material.toString() === materialId
    );
    if (materialIndex === -1) {
      return {
        status: false,
        msg: "Bu material Recipe içinde bulunamadı.",
      };
    }

    recipe.materials.splice(materialIndex, 1);
    await recipe.save();
    revalidatePath("/recipes");
    return { status: true, msg: "Material başarıyla silindi." };
  } catch (error) {
    console.error("Material silinirken bir hata oluştu:", error);
    return { status: false, msg: "Material silinirken bir hata oluştu." };
  }
};

export const removeMaterialFromCake = async (
  cakeId: string,
  materialId: string
) => {
  try {
    const cake = await CakeModel.findById(cakeId);
    if (!cake) {
      return { status: false, msg: "Cake bulunamadı" };
    }

    if (!cake.materials || cake.materials.length === 0) {
      return {
        status: false,
        msg: "Bu Cake içerisinde herhangi bir Material bulunmamaktadır.",
      };
    }

    const updatedMaterials = cake.materials.filter(
      (mat: any) => mat.material.toString() !== materialId
    );

    if (updatedMaterials.length === cake.materials.length) {
      return {
        status: false,
        msg: "Material bulunamadı veya zaten silinmiş.",
      };
    }

    cake.materials = updatedMaterials;
    await cake.save();
    revalidatePath("/cakes");
    return { status: true, msg: "Material başarıyla silindi" };
  } catch (error) {
    console.error("Material silme hatası:", error);
    return { status: false, msg: "Material silinirken hata oluştu" };
  }
};

export const deleteRecipeFromCake = async (
  cakeId: string,
  recipeId: string
) => {
  try {
    await dbConnect();

    const cake = await CakeModel.findById(cakeId).populate("recipes.recipe");

    if (!cake) {
      return { status: false, msg: "Cake bulunamadı." };
    }

    if (!cake.recipes || cake.recipes.length === 0) {
      return { status: false, msg: "Bu Cake içinde Recipe bulunmuyor." };
    }

    const recipeIndex = cake.recipes.findIndex(
      (r) => r.recipe._id.toString() === recipeId
    );

    if (recipeIndex === -1) {
      return { status: false, msg: "Bu Recipe Cake içinde bulunamadı." };
    }

    cake.recipes.splice(recipeIndex, 1);
    await cake.save();
    revalidatePath("/cakes");
    return { status: true, msg: "Recipe başarıyla Cake içinden silindi." };
  } catch (error) {
    console.error("Recipe silinirken bir hata oluştu:", error);
    return { status: false, msg: "Recipe silinirken bir hata oluştu." };
  }
};

export const deleteParameter = async (
  parameterId: string
): Promise<{ msg: string; status: boolean }> => {
  try {
    await mongoose.connect("mongodb://localhost:27017/your-database-name");

    const deletedParameter = await ParameterModel.findByIdAndDelete(
      parameterId
    );

    if (!deletedParameter) {
      return {
        msg: "Silinecek parametre bulunamadı.",
        status: false,
      };
    }
    revalidatePath("/parameters");
    return {
      msg: "Parametre başarıyla silindi.",
      status: true,
    };
  } catch (error) {
    console.error("Parametre silinirken hata oluştu:", error);
    return {
      msg: `Parametre silinirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};
