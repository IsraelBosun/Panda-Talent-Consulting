import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '../context/AuthProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap", // Recommended for better performance
  variable: "--font-poppins", // Recommended to use a CSS variable
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // 3. Specify all weights you need
});

export const metadata = {
  title: "Panda Talent Consulting",
  description: "Global talent solutions for a dynamic world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
