import CssBaseline from "@mui/material/CssBaseline";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalTheme } from "@/lib/styles/GlobalTheme";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { AuthProvider } from "./provider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const myFont = localFont({
  src: "../lib/fonts/Noto-Sans.ttf",
  variable: "--font-notosans",
});

export const metadata: Metadata = {
  title: "Altan Cake App",
  description: "Generated by Altan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <AuthProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={GlobalTheme}>
              <CssBaseline />
              <>
                <ToastContainer
                  closeOnClick
                  autoClose={1500}
                  position="top-right"
                  theme="light"
                  pauseOnHover
                />
                {children}
              </>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
