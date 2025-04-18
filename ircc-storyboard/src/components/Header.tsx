'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Our Team', href: '/knowtheteam' },
  ]

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Website Name (Home link) */}
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
            Immigration Guidance
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={`text-gray-700 hover:text-blue-600 transition-colors ${
                  pathname === item.href ? 'font-semibold text-blue-600' : ''
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
