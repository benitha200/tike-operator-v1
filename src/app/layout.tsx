import { Inter } from "next/font/google";
import "../styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tike",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
