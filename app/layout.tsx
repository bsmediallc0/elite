import type { Metadata } from "next";
// Fontu buradan çekiyoruz
import { Plus_Jakarta_Sans } from "next/font/google"; 
import "./globals.css";

// Font ayarlarını yapıyoruz
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // İhtiyacımız olan tüm kalınlıklar
  variable: "--font-jakarta", // CSS tarafında kullanmak için değişken adı
});

export const metadata: Metadata = {
  title: "B&S Roof System | Elite Roofing Mastery",
  description: "Texas' unmatched roofing craftsmanship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* className içine fontu ekledik */}
      <body className={`${jakarta.className} antialiased bg-[#0a0a0a]`}>
        {children}
      </body>
    </html>
  );
}