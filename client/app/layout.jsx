import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/providers"; // 👈 Yahan Providers import karo

export const metadata = {
  title: "CORE EEE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 👈 Dynamic Dark/Light background aur transition classes body par add kardi */}
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <Providers> {/* 👈 Auth + Theme Dono ka wrapper */}
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}