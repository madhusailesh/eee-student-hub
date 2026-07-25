// app/layout.jsx

import "./globals.css";
import Providers from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "EEE Student Hub",
  description: "Student Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}
