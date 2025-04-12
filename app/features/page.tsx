import Head from "next/head";

export default function Features() {
  return (
    <>
      <Head>
        <title>Features | EduManager</title>
        <meta
          name="description"
          content="Explore the powerful features of EduManager, the ultimate school management platform."
        />
      </Head>

      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8">
            Powerful Features for Schools
          </h1>
          <p className="text-lg text-gray-700 text-center mb-12">
            Streamline your school&apos;s operations with EduManager&apos;s all-in-one platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <div className="text-5xl text-blue-600 mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Digital Record-Keeping</h3>
              <p className="text-gray-600">
                Securely store all student and staff records in one place, accessible anytime.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <div className="text-5xl text-blue-600 mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Role-Based Access Control</h3>
              <p className="text-gray-600">
                Admins, teachers, and students get access only to the relevant sections of the platform.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <div className="text-5xl text-blue-600 mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Automated Attendance Tracking</h3>
              <p className="text-gray-600">
                Mark attendance digitally, generate reports, and track trends effortlessly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <div className="text-5xl text-blue-600 mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fee Management</h3>
              <p className="text-gray-600">
                Accept online payments, generate invoices, and track fee statuses seamlessly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <div className="text-5xl text-blue-600 mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable Reports</h3>
              <p className="text-gray-600">
                Generate student progress, attendance, and financial reports with ease.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <div className="text-5xl text-blue-600 mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Notifications</h3>
              <p className="text-gray-600">
                Keep teachers, students, and parents informed with automated alerts.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-6">Sign up today and experience the future of school management.</p>
            <div className="flex justify-center space-x-4">
              <a
                href="/register"
                className="bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition-all"
              >
                Get Started
              </a>
              <a
                href="/book-demo"
                className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800 transition-all"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
