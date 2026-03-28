import Sidebar from "./Sidebar";

export default function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-[#0D2418] mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
}
