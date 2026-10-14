import Link from 'next/link';
import { Download, Layers, Sliders, Zap, Volume2, Music } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm bg-slate-950/80 border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            Splice
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-400 hover:text-white transition">Features</a>
            <a href="#download" className="text-slate-400 hover:text-white transition">Download</a>
            <a href="/privacy" className="text-slate-400 hover:text-white transition">Privacy</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Professional Audio Editing in Your Pocket
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8">
            Cut, layer, mix, and export high-quality audio. All on your Android device.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.hexhad.splice"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition"
            >
              <Download size={20} />
              Get on Google Play
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 border border-slate-700 text-white font-semibold py-4 px-8 rounded-lg hover:border-slate-600 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Powerful Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-orange-500/50 transition">
              <Layers className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Multi-Track Layering</h3>
              <p className="text-slate-400">
                Stack unlimited audio tracks. Drag to reorder, mix together seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-orange-500/50 transition">
              <Sliders className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">4-Band EQ & Mixer</h3>
              <p className="text-slate-400">
                Professional equalization with visual response curve. Per-track volume, mute, solo.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-orange-500/50 transition">
              <Zap className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Speed Control</h3>
              <p className="text-slate-400">
                Adjust playback speed 0.5x to 2x. Keep pitch toggle for natural sound.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-orange-500/50 transition">
              <Volume2 className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Precision Trim</h3>
              <p className="text-slate-400">
                Frame-accurate editing with ±0.1s steppers. Press and hold for fast repeat.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-orange-500/50 transition">
              <Music className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Export Options</h3>
              <p className="text-slate-400">
                Export as M4A or WAV. Direct to your library for sharing.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-orange-500/50 transition">
              <Download className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Local Storage</h3>
              <p className="text-slate-400">
                All audio stays on your device. Full privacy, zero cloud uploads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">See It in Action</h2>
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg p-8 border border-slate-700 aspect-video flex items-center justify-center">
            <div className="text-center">
              <Layers className="w-16 h-16 text-orange-500/50 mx-auto mb-4" />
              <p className="text-slate-400">Screenshots coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-4 bg-gradient-to-r from-orange-600/10 to-orange-500/10 border-y border-orange-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Edit?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Download Splice now and start creating professional audio on your Android device.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.hexhad.splice"
            className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-lg transition text-lg"
          >
            <Download size={24} />
            Download from Google Play
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Splice</h3>
              <p className="text-slate-400 text-sm">Professional audio editing for Android.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="https://play.google.com/store/apps/details?id=com.hexhad.splice" className="hover:text-white transition">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="mailto:support@hexhad.lk" className="hover:text-white transition">support@hexhad.lk</a></li>
                <li><a href="https://github.com/hexhad/splice" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2026 HEXHAD Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
