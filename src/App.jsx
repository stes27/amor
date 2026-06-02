import { useState } from 'react';
import './App.css';
import Gallery from './Gallery';
import Letter from './Letter';
import Reasons from './Reasons';
import Dreams from './Dreams';
import Navbar from './Navbar';

import videoSrc from './assets/pixverse_mp4_media_web_ori_55e13bf9-e999-48ee-b6fa-5421fcf3280e_seed1260081801.mp4';

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
          <div className="fixed inset-0 w-screen h-screen z-50 bg-black">
            <video
              src={videoSrc}
              autoPlay
              controls
              playsInline
              onEnded={() => setCurrentPage('gallery')}
              className="w-full h-full object-cover"
            />
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
