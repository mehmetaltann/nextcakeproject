"use server";
import dbConnect from "@/lib/db/dbConnect";
import MaterialModel from "@/lib/models/MaterialModel";
import { Material } from "@/lib/types/all";
import { revalidatePath } from "next/cache";

export const updateMaterial = async (
  updateData: Material
): Promise<{ msg: string; status: boolean; updatedMaterial?: any }> => {
  try {
    await dbConnect();

    const existingMaterial = await MaterialModel.findById(updateData._id);
    if (!existingMaterial) {
      return { msg: "Malzeme bulunamadı", status: false };
    }

    await MaterialModel.findByIdAndUpdate(
      updateData._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    revalidatePath("/recipes");
    revalidatePath("/cakes");
    revalidatePath("/materials");

    return {
      msg: "Malzeme başarıyla güncellendi",
      status: true,
    };
  } catch (error) {
    console.error("Malzeme güncellenirken bir hata oluştu:", error);
    return {
      msg: `Malzeme güncellenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};
