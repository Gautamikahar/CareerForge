function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Hero Section */}
      <section className="text-center py-24">
        <h1 className="text-6xl font-bold">
          CareerForge 🚀
        </h1>

        <p className="text-gray-400 mt-6 text-xl">
          AI Powered Career Development Platform
        </p>

        <button className="mt-8 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold">
            Resume Analyzer
          </h2>
          <p className="text-gray-400 mt-3">
            Upload your resume and get instant feedback.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold">
            ATS Score Checker
          </h2>
          <p className="text-gray-400 mt-3">
            Measure resume compatibility with ATS systems.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold">
            Skill Gap Analysis
          </h2>
          <p className="text-gray-400 mt-3">
            Discover missing skills for your dream role.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;