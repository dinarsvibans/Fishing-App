// pages/api/auth/[...nextauth].js

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/dashboard/equipment", "/dashboard/addfish"]
};
