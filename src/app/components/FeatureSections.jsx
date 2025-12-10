export default function FeatureSections() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Our Solution Section */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-500 mb-2">Our Solution</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            <span className="text-blue-600">Global</span> developers. Local reliability
          </h2>
        </div>

        {/* Feature 1 - End to End Hiring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              End-to-end hiring with compliance & payroll handled
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We manage onboarding, global contracts, legal compliance, and payroll so you can focus purely on results.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://dummyimage.com/500x350/e5e7eb/374151&text=Handshake"
              alt="Business handshake"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Feature 2 - Quality Assured */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">
          <div className="order-1">
            <img
              src="https://dummyimage.com/500x350/1f2937/ffffff&text=Developer+Working"
              alt="Developer working"
              className="w-full h-auto rounded-2xl"
            />
          </div>
          <div className="order-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Quality-assured talent. Skill-tested and trusted
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every talent goes through technical assessments, live interviews, and background checks to guarantee world-class quality.
            </p>
          </div>
        </div>

        {/* Feature 3 - AI + Human Matching */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              AI + human matching. Faster, smarter matches
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our AI platform instantly matches you with the right candidates, while expert recruiters verify fit—delivering top talent in days.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src="https://dummyimage.com/500x350/e5e7eb/374141&text=AI+Matching"
              alt="AI matching process"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Process Steps Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mt-24">
          {/* Left Side - Images */}
          <div className="flex gap-4">
            <div className="flex-1">
              <img
                src="https://dummyimage.com/300x400/f3f4f6/374151&text=Team+Meeting"
                alt="Team meeting"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
            <div className="flex-1">
              <img
                src="https://dummyimage.com/300x400/1f2937/ffffff&text=Collaboration"
                alt="Collaboration"
                className="w-full h-auto rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Right Side - Process Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Source & Vet</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We source talent from global networks and run coding assessments and live interviews
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Match & Shortlist</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our AI ranks candidates and our talent team hand-selects your shortlist
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Hire & Onboard</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We handle contract, payroll (if needed) and offer a 90-day placement guarantee
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}