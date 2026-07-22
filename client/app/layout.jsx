// import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

export const metadata = {
  title: "EEE Student Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}