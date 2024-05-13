import type { Metadata } from "next"
import "./globals.css"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "TTBYTE | ShortUrl",
  description: "Project ที่เอาไว้ย่อลิ้งค์จากลิ้งค์ที่ยาวๆจำยากให้สั่นและจำง่ายมากขึ้น",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div className="container mx-auto px-0 md:px-16 lg:px-20">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
