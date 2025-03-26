"use server";
import dbConnect from "@/lib/db/dbConnect";
import CakeModel from "@/lib/models/CakeModel";
import MaterialModel from "@/lib/models/MaterialModel";
import ParameterModel from "@/lib/models/ParameterModel";
import RecipeModel from "@/lib/models/RecipeModel";
import { revalidatePath } from "next/cache";

export const deleteMaterial = async (
  materialId: string
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
    const isUsedInRecipe = await RecipeModel.exists({
      "materials.materialId": materialId,
    });

    const isUsedInCake = await CakeModel.exists({
      "materials.materialId": materialId,
    });
    if (isUsedInRecipe || isUsedInCake) {
      return {
        status: false,
        msg: "Bu malzeme bir tarifte veya pastada kullanıldığı için silinemez.",
      };
    }
    await MaterialModel.findByIdAndDelete(materialId);
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

export const deleteRecipe = async (
  recipeId: string
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return { status: false, msg: "Recipe bulunamadı" };
    }

    if ((recipe.materials ?? []).length > 0) {
      return {
        status: false,
        msg: "Bu tarifte malzeme bulunduğu için silinemez.",
      };
    }
    const isUsedInCake = await CakeModel.exists({
      "recipes.recipeId": recipeId,
    });

    if (isUsedInCake) {
      return {
        status: false,
        msg: "Bu tarif pastada kullanıldığı için silinemez.",
      };
    }
    const deletedRecipe = await RecipeModel.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      return { status: false, msg: "Recipe zaten silinmiş veya bulunamadı." };
    }
    revalidatePath("/recipes");
    return { status: true, msg: "Recipe başarıyla silindi." };
  } catch (error) {
    console.error("Recipe silme hatası:", error);
    return { status: false, msg: "Silme işlemi sırasında bir hata oluştu." };
  }
};

export const deleteCake = async (cakeId: string) => {
  try {
    await dbConnect();
    const cake = await CakeModel.findById(cakeId);

    if (!cake) {
      return { status: false, msg: "Pasta bulunamadı" };
    }

    if ((cake.recipes ?? []).length > 0 || (cake.materials ?? []).length > 0) {
      return {
        status: false,
        msg: "Bu Pasta içinde tarif veya malzeme bulunduğu için silinemez.",
      };
    }
    const result = await CakeModel.findByIdAndDelete(cakeId);

    if (!result) {
      console.error("Pasta silinirken bir hata oluştu.");
      return { status: false, msg: "Pasta silinirken bir hata oluştu." };
    }
    revalidatePath("/cakes");
    return { status: true, msg: "Pasta başarıyla silindi." };
  } catch (error) {
    console.error("Pasta silinirken bir hata oluştu:", error);
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
    const filter = { _id: recipeId };
    const updateData = {
      materialId,
    };

    await RecipeModel.findByIdAndUpdate(filter, {
      $pull: { materials: updateData },
    });

    revalidatePath("/recipes");
    revalidatePath("/cakes");
    return { status: true, msg: "Malzeme başarıyla silindi." };
  } catch (error) {
    console.error("Malzeme silinirken bir hata oluştu:", error);
    return { status: false, msg: "Malzeme silinirken bir hata oluştu." };
  }
};

export const deleteMaterialFromCake = async (
  cakeId: string,
  materialId: string
) => {
  try {
    await dbConnect();
    const filter = { _id: cakeId };
    const updateData = {
      materialId,
    };

    await CakeModel.findByIdAndUpdate(filter, {
      $pull: { materials: updateData },
    });

    revalidatePath("/cakes");
    return { status: true, msg: "Malzeme başarıyla silindi" };
  } catch (error) {
    console.error("Malzeme silme hatası:", error);
    return { status: false, msg: "Malzeme silinirken hata oluştu" };
  }
};

export const deleteRecipeFromCake = async (
  cakeId: string,
  recipeId: string
) => {
  try {
    await dbConnect();
    const filter = { _id: cakeId };
    const updateData = {
      recipeId,
    };
    await CakeModel.findByIdAndUpdate(filter, {
      $pull: { recipes: updateData },
    });
    revalidatePath("/cakes");
    return { status: true, msg: "Tarif başarıyla Pasta içinden silindi." };
  } catch (error) {
    console.error("Tarif silinirken bir hata oluştu:", error);
    return { status: false, msg: "Tarif silinirken bir hata oluştu." };
  }
};

export const deleteParameter = async (
  parameterId: string
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
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

export const deleteContentFromParameter = async (
  parameterId: string,
  contentId: string
) => {
  try {
    await dbConnect();
    const filter = { _id: parameterId };
    const updateData = {
      _id: contentId,
    };
    await ParameterModel.findByIdAndUpdate(filter, {
      $pull: { content: updateData },
    });
    revalidatePath("/parameters");
    return { status: true, msg: "Parametre başarıyla silindi." };
  } catch (error) {
    console.error("Parametre silinirken bir hata oluştu:", error);
    return { status: false, msg: "Parametre silinirken bir hata oluştu." };
  }
};
