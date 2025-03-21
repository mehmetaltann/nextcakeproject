"use server";
import dbConnect from "@/lib/db/dbConnect";
import MaterialModel from "@/lib/models/MaterialModel";
import { Material } from "@/lib/types/all";

export const updateMaterial = async (
  updateData: Material
): Promise<{ msg: string; status: boolean; updatedMaterial?: any }> => {
  try {
    await dbConnect();

    const existingMaterial = await MaterialModel.findById(updateData._id);
    if (!existingMaterial) {
      return { msg: "Material bulunamadı", status: false };
    }

    const updatedMaterial = await MaterialModel.findByIdAndUpdate(
      updateData._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    return {
      msg: "Material başarıyla güncellendi",
      status: true,
    };
  } catch (error) {
    console.error("Material güncellenirken bir hata oluştu:", error);
    return {
      msg: `Material güncellenirken hata oluştu: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};
