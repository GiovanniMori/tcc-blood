export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      {children}
    </div>
  );
}
