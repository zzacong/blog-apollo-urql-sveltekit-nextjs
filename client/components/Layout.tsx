import Link from 'next/link'
import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className="bg-sky-900 px-8 py-8 flex justify-between">
        <Link href="/" passHref>
          <a className="text-white text-2xl font-bold hover:opacity-90">Home</a>
        </Link>
        <Link href="/articles/new" passHref>
          <a className="text-white text-2xl font-bold hover:opacity-90">
            New article
          </a>
        </Link>
      </header>
      <main className="max-w-6xl mx-auto px-6">
        <div className="mt-10">{children}</div>
      </main>
    </>
  )
}
