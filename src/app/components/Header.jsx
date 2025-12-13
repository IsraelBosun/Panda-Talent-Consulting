'use client';

import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: sectionId === 'home' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">PANDA TALENT</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('our-solution')}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Our Solution
            </button>
            <button 
              onClick={() => scrollToSection('use-cases')}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              Use Cases
            </button>
            <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              Teams
            </a>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-gray-900 text-sm font-medium"
            >
              About
            </button>
          </nav>

          {/* Sign In Button - Desktop */}
          <div className="hidden md:flex items-center">
            <button className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              Sign In
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium px-2 py-2 hover:bg-gray-50 rounded-md text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('our-solution')}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium px-2 py-2 hover:bg-gray-50 rounded-md text-left"
              >
                Our Solution
              </button>
              <button 
                onClick={() => scrollToSection('use-cases')}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium px-2 py-2 hover:bg-gray-50 rounded-md text-left"
              >
                Use Cases
              </button>
              <a 
                href="#" 
                className="text-gray-700 hover:text-gray-900 text-sm font-medium px-2 py-2 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Teams
              </a>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium px-2 py-2 hover:bg-gray-50 rounded-md text-left"
              >
                About
              </button>
              <button 
                className="text-gray-700 hover:text-gray-900 text-sm font-medium px-2 py-2 hover:bg-gray-50 rounded-md text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}