import Navbar from './components/Navbar'

export default function WebsiteLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-xl">{children}</div>
    </>
  )
}
