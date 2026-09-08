import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <Link href="/" className="mb-8 text-xl font-bold text-primary">
        CareerPath AI
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
