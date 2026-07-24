// app/layout.jsx
import "./globals.css";
import Providers from "@/providers";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const metadata = {
  title: "EEE Student Hub",
  description: "Student Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}