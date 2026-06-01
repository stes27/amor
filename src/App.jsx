import { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import './App.css';
import Gallery from './Gallery';
import Letter from './Letter';
import Reasons from './Reasons';
import Dreams from './Dreams';
import Navbar from './Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-200 via-rose-300 to-red-400 bg-pulse flex items-center justify-center p-4 selection:bg-pink-500 selection:text-white"
      style={{ backgroundSize: '200% 200%' }}
    >
      {/* ── Persistent Navigation Bar (hidden on home page) ── */}
      {currentPage !== 'home' && (
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      )}

      {/* Main Content — offset top only when navbar is visible */}
      <div className={`${currentPage !== 'home' ? 'pt-[60px]' : ''} w-full flex items-center justify-center`}>
        {currentPage === 'home' ? (
          <div className="relative z-10 max-w-2xl w-full text-center glass-card rounded-3xl p-8 md:p-12 transform transition-all duration-700 ease-out">
            {/* Heart Icon */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <Heart className="w-32 h-32 md:w-40 md:h-40 text-red-500 fill-red-500 beating-heart" />
                <div className="absolute inset-0 bg-red-400 blur-3xl opacity-20 rounded-full beating-heart"></div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-10">
              <button
                onClick={() => setCurrentPage('gallery')}
                className="button-glow group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-rose-600 rounded-full font-modern font-semibold text-lg overflow-hidden w-full md:w-auto"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative z-10 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                  Comece nossa jornada 💖
                  <ArrowRight className="w-5 h-5 text-rose-500" />
                </span>
              </button>
            </div>
          </div>
        ) : currentPage === 'gallery' ? (
          <Gallery />
        ) : currentPage === 'letter' ? (
          <Letter />
        ) : currentPage === 'reasons' ? (
          <Reasons />
        ) : (
          <Dreams />
        )}
      </div>
    </div>
  );
}

export default App;
