export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/cakes",
    "/parameters",
    "/materials",
    "/register",
    "/recipes",
  ],
};
