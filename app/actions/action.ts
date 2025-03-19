"use server";
import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/lib/models/UserModel";
import bcrypt from "bcryptjs";

export const addUser = async (
  prevState: any,
  formData: any
): Promise<Response> => {
  try {
    const isim = formData.get("isim")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    if (!isim || !email || !password) {
      return { msg: "Tüm alanları doldurun", status: false };
    }
    await dbConnect();
    const existingUser = await UserModel.findOne({ email }).select("_id");
    if (existingUser) {
      return { msg: "Bu kullanıcı zaten kayıtlıdır", status: false };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { isim, email, password: hashedPassword };
    await UserModel.create(userData);
    return { msg: "Kullanıcı başarıyla kaydedildi", status: true };
  } catch (error) {
    console.error(`Kullanıcı eklenemedi: ${error}`);
    return {
      msg: `Kullanıcı eklenemedi: ${
        error instanceof Error ? error.message : "Bilinmeyen hata"
      }`,
      status: false,
    };
  }
};
