import "./globals.css";
import Providers from "@/providers";

export const metadata = {
  title: "EEE Student Hub",
  description: "Student Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}