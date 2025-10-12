import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('common.welcomeMessage', { name: 'Sistem Pembelajaran Universitas' })}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Platform pembelajaran dan penilaian berbasis web untuk mahasiswa dan dosen
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              href="/id/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {t('auth.login')}
            </Link>
            <Link
              href="/id/courses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition"
            >
              {t('nav.courses')}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Materi Lengkap</h3>
            <p className="text-gray-600">
              Akses video, PDF, dan teks pembelajaran dengan dukungan offline
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Kuis & Tugas</h3>
            <p className="text-gray-600">
              Kerjakan kuis interaktif dan unggah tugas dengan mudah
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Laporan Nilai</h3>
            <p className="text-gray-600">
              Pantau progres belajar dan nilai Anda secara real-time
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Fitur Utama</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Login dengan SSO (Single Sign-On) kampus</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Dashboard mahasiswa & dosen yang intuitif</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Manajemen kursus dan materi pembelajaran</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Quiz dengan berbagai tipe soal (MCQ, isian, drag-drop)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Upload tugas dan penilaian otomatis/manual</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Laporan nilai dan progres pembelajaran</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Responsif di desktop, tablet, dan smartphone</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Bahasa Indonesia & English</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
