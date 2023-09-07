import Menu from "@/components/layouts/menu";
import Topbar from "@/components/layouts/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <div className="flex overflow-hidden bg-white pt-16">
        <Menu />
        <div className="h-full w-full relative overflow-y-auto lg:ml-64 bg-gray-100 dark:bg-gray-700">
          <main id="content">{children}</main>
        </div>
      </div>
    </>
  );
}
