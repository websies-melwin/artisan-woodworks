export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login page should not use the admin layout
  return children
}
