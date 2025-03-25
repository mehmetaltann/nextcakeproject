"use server";
import dbConnect from "@/lib/db/dbConnect";
import CakeModel from "@/lib/models/CakeModel";
import MaterialModel from "@/lib/models/MaterialModel";
import ParameterModel from "@/lib/models/ParameterModel";
import RecipeModel from "@/lib/models/RecipeModel";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import {
  CakeWithoutId,
  MaterialWithoutId,
  ParameterWithoutId,
  RecipeWithoutId,
} from "@/lib/types/all";

export const addMaterial = async (
  materialData: MaterialWithoutId
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
    const newMaterial = new MaterialModel(materialData);
    await newMaterial.save();
    revalidatePath("/");
    revalidatePath("/materials");
    return {
      msg: "Yeni Malzeme başarıyla eklendi",
      status: true,
    };
  } catch (error) {
    console.error("Malzeme eklenirken hata oluştu:", error);
    return {
      msg: `Malzeme eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addRecipe = async (
  recipeData: RecipeWithoutId
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
    const newRecipe = new RecipeModel(recipeData);
    await newRecipe.save();
    revalidatePath("/recipes");
    return {
      msg: "Yeni Reçete başarıyla eklendi",
      status: true,
    };
  } catch (error) {
    console.error("Reçete eklenirken hata oluştu:", error);
    return {
      msg: `Reçete eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addCake = async (
  cakeData: CakeWithoutId
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
    const newCake = new CakeModel(cakeData);

    await newCake.save();
    revalidatePath("/cakes");
    return {
      msg: "Yeni Pasta başarıyla eklendi",
      status: true,
    };
  } catch (error) {
    console.error("Pasta eklenirken hata oluştu:", error);
    return {
      msg: `Pasta eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addMaterialToRecipe = async (
  recipeId: string,
  materialId: string,
  materialNumber: number
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();

    const filter = { _id: recipeId };
    const updateData = {
      materialId,
      quantity: materialNumber,
    };

    await RecipeModel.findByIdAndUpdate(filter, {
      $push: { materials: updateData },
    });

    revalidatePath("/recipes");
    return { msg: "Material başarıyla tarife eklendi", status: true };
  } catch (error) {
    console.error("Recipe içerisine material eklenirken hata oluştu:", error);
    return {
      msg: `Material eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addMaterialToCake = async (
  cakeId: string,
  materialId: string,
  materialQuantity: number
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();

    const filter = { _id: cakeId };
    const updateData = {
      materialId,
      quantity: materialQuantity,
    };

    await CakeModel.findByIdAndUpdate(filter, {
      $push: { materials: updateData },
    });

    revalidatePath("/cakes");
    return {
      msg: "Malzeme başarıyla Pasta içerisine eklendi",
      status: true,
    };
  } catch (error) {
    console.error("Pasta içerisine malzeme eklenirken hata oluştu:", error);
    return {
      msg: `Malzeme eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addRecipeToCake = async (
  cakeId: string,
  recipeId: string,
  quantity: number
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
    const filter = { _id: cakeId };
    const updateData = {
      recipeId,
      quantity,
    };

    await CakeModel.findByIdAndUpdate(filter, {
      $push: { recipes: updateData },
    });

    revalidatePath("/cakes");
    return {
      msg: "Tarif başarıyla cake içerisine eklendi",
      status: true,
    };
  } catch (error) {
    console.error("Pasta içerisine tarif eklenirken hata oluştu:", error);
    return {
      msg: `Tarif eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addParameter = async (
  parameterData: ParameterWithoutId
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
    const newParameter = new ParameterModel(parameterData);
    await newParameter.save();
    revalidatePath("/parameters");
    return {
      msg: "Yeni parametre başarıyla eklendi",
      status: true,
    };
  } catch (error) {
    console.error("Parametre eklenirken hata oluştu:", error);
    return {
      msg: `Parametre eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addContentToParameter = async (
  parameterId: string,
  title: string,
  value: string
): Promise<{ msg: string; status: boolean }> => {
  try {
    await dbConnect();
    const filter = { _id: parameterId };
    const updateData = {
      title,
      value,
    };

    await ParameterModel.findByIdAndUpdate(filter, {
      $push: { content: updateData },
    });

    revalidatePath("/parameters");
    return {
      msg: "Parametre başarıyla eklendi",
      status: true,
    };
  } catch (error) {
    console.error("Parametre eklenirken hata oluştu:", error);
    return {
      msg: `Parametre eklenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};

export const addUser = async (
  prevState: any,
  formData: FormData
): Promise<{ msg: string; status: boolean }> => {
  try {
    const isim = formData.get("isim")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!isim || !email || !password) {
      return { msg: "Tüm alanları doldurun", status: false };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { msg: "Geçerli bir e-posta adresi girin", status: false };
    }

    if (password.length < 6) {
      return { msg: "Şifre en az 6 karakter olmalıdır", status: false };
    }

    if (isim.length < 2) {
      return { msg: "İsim en az 2 karakter içermelidir", status: false };
    }

    await dbConnect();

    const existingUser = await UserModel.findOne({ email }).select("_id");
    if (existingUser) {
      return {
        msg: "Bu e-posta ile zaten bir kullanıcı kayıtlı",
        status: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({ isim, email, password: hashedPassword });

    return { msg: "Kullanıcı başarıyla kaydedildi", status: true };
  } catch (error) {
    console.error("Kullanıcı eklenemedi:", error);
    return {
      msg: `Kullanıcı eklenemedi: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};
