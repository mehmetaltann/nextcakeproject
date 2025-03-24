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
    const result = await MaterialModel.findByIdAndDelete(materialId);
    if (!result) {
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
        msg: "Bu Recipe'de material bulunduğu için silinemez.",
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
    const cake = await CakeModel.findById(cakeId)
      .populate("recipes.recipe")
      .populate("materials.material");
    if (!cake) {
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
    const filter = { _id: recipeId };
    const updateData = {
      materialId,
    };

    await RecipeModel.findByIdAndUpdate(filter, {
      $pull: { materials: updateData },
    });

    revalidatePath("/recipes");
    revalidatePath("/cakes");
    revalidatePath("/");
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
function findByIdAndUpdate(
  SemiProductSchema: any,
  filter: { _id: string },
  arg2: { $pull: { materials: { _id: string } } }
) {
  throw new Error("Function not implemented.");
}
