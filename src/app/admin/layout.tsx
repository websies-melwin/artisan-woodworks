export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout is now just a wrapper
  // Auth is handled by middleware
  // Login page has its own layout
  return children
}
