"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { CalendarDays, Compass, Globe2, Mail, Rocket } from "lucide-react"

const NAV_LINKS = [
  { label: "Home", href: "#hero", icon: Globe2 },
  { label: "How It Works", href: "#process", icon: Compass },
  { label: "Pricing", href: "#pricing", icon: CalendarDays },
  { label: "Contact", href: "#consultation", icon: Mail },
] as const satisfies ReadonlyArray<{
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}>

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen((open) => !open)
  const closeMenu = () => setIsMenuOpen(false)
  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    options?: { closeMenu?: boolean }
  ) => {
    event.preventDefault()

    if (options?.closeMenu) {
      closeMenu()
    }

    const targetId = href.replace("#", "")

    if (pathname === "/") {
      const targetSection = document.getElementById(targetId)
      targetSection?.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${targetId}`)
    }
  }
  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleNavClick(event, "#hero", { closeMenu: true })
  }

  return (
    <nav className="sticky top-4 z-50 border-b border-rose-100 backdrop-blur bg-white/80 supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300 sm:px-8 lg:px-12">
        <Link
          href="#hero"
          className="flex items-center gap-3 text-xl font-semibold text-zinc-900 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
          onClick={handleBrandClick}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 text-white shadow-lg shadow-rose-100">
            <Globe2 className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-tight">
            <span>MuslimWeb</span>
            <span className="text-sm font-normal text-zinc-500">
              Your fully built digital HQ
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8 text-sm font-medium text-zinc-600">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center gap-2 transition-all duration-300 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  <item.icon className="h-4 w-4 text-rose-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 origin-center scale-x-0 rounded-full bg-rose-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 text-zinc-700 transition-transform duration-300 hover:-translate-y-0.5 hover:border-rose-200 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 md:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        >
          <HamburgerIcon isOpen={isMenuOpen} />
        </button>
      </div>

      <div
        className={`md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden border-t border-rose-100 bg-white/95 shadow-sm shadow-rose-100 transition-all duration-300 ease-out`}
      >
        <ul className="flex flex-col gap-3 px-6 pb-4 pt-4 text-sm font-medium text-zinc-700">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors duration-300 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                onClick={(event) => handleNavClick(event, item.href, { closeMenu: true })}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-rose-400" />
                  {item.label}
                </span>
                <span className="text-xs text-rose-400">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-6">
          <Link
            href="#pricing"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
          >
            <Rocket className="h-4 w-4" />
            Book a quota
          </Link>
        </div>
      </div>
    </nav>
  )
}

type HamburgerIconProps = {
  isOpen: boolean
}

function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  return (
    <span className="relative flex h-5 w-6 items-center justify-center">
      <span
        className={`absolute h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0 rotate-45" : "-translate-y-2"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0 -rotate-45" : "translate-y-2"
        }`}
      />
    </span>
  )
}