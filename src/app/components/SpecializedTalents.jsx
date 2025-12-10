'use client'
import { useState, useRef, useEffect } from 'react';

export default function SpecializedTalents() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  const talents = [
    {
      title: "Finance & Accounting",
      description: "From accountants to finance officers, we source top candidates with in-demand skills and experience—and manage the entire hiring process for you.",
      image: "https://dummyimage.com/400x250/f3f4f6/374151&text=Finance"
    },
    {
      title: "Tech",
      description: "From software developers to AI engineers, we source top candidates with in-demand skills and experience—and manage the entire hiring process for you.",
      image: "https://dummyimage.com/400x250/1f2937/ffffff&text=Tech"
    },
    {
      title: "Creatives and Marketing",
      description: "From digital marketers to social media managers and designers, we source top candidates with in-demand skills and experience—and manage the entire hiring process for you.",
      image: "https://dummyimage.com/400x250/f59e0b/ffffff&text=Creative"
    },
    {
      title: "Admin and Customer Support",
      description: "From virtual assistants to customer support representatives, we source top candidates with in-demand skills and experience—and manage the entire hiring process for you.",
      image: "https://dummyimage.com/400x250/3b82f6/ffffff&text=Support"
    }
  ];

  const maxSlides = Math.max(0, talents.length - 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Sync scroll position with currentSlide
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth / 3;
      sliderRef.current.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 max-w-4xl">
            Add specialized ready-to-hire talents across every field to your organization
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Cards Grid */}
          <div 
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {talents.map((talent, index) => (
                <div key={index} className="w-[280px] sm:w-[320px] flex-shrink-0">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-full hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {talent.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        {talent.description}
                      </p>
                      <div className="mb-6">
                        <img
                          src={talent.image}
                          alt={talent.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md text-sm font-medium transition-colors w-full">
                        Learn more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Bottom Right */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxSlides}
              className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}