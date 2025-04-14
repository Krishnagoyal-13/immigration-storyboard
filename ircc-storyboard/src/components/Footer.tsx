import React from 'react'
export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white">
              Canadian Immigration Guidance System
            </h2>
            <p className="mt-2">Your AI-powered immigration assistant</p>
          </div>
          <div className="flex gap-8 mb-6 md:mb-0">
            <a href="/about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="/knowtheteam" className="hover:text-white transition-colors">
              Know the Team
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © 2025 Canadian Immigration Guidance System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
