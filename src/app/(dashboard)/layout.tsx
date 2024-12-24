"use client";

import { useState } from "react";
import Menu from "@/components/layouts/menu";
import Topbar from "@/components/layouts/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <Topbar onMenuToggle={handleMenuToggle} />
      <div className="flex overflow-hidden bg-white pt-16">
        <Menu isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(false)} />
        <div className="h-full w-full relative overflow-y-auto lg:ml-64 bg-gray-100 dark:bg-gray-700">
          <main className="p-4 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}