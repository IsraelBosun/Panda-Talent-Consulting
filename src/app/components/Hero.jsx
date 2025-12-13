import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://dummyimage.com/1920x1080/4a5568/ffffff&text=Team+Meeting"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
        {/* <Image
          src="/images/hero.png"
          alt="Business handshake"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        /> */}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Hire vetted tech talent worldwide — fast without the HR headache.
          </h1>
          <p className="text-white text-base sm:text-lg mb-4 leading-relaxed">
            AI-powered matching + human vetting.
          </p>
          <p className="text-white text-base sm:text-lg mb-8 leading-relaxed">
            Trial hires, payroll support, and a 90-day guarantee
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
              Find a Job
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition-colors">
              Find a Talent
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}