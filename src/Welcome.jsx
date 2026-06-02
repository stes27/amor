import { useEffect, useState } from 'react';

function Welcome({ onStartJourney }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        size: 16 + Math.random() * 16,
      };
      setHearts((prev) => [...prev.slice(-30), newHeart]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative overflow-hidden">
      {/* Falling white hearts */}
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute text-white animate-fall-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}px`,
            opacity: 0.7,
          }}
        >
          ❤️
        </span>
      ))}

      <h1 className="font-romantic text-5xl md:text-7xl text-white mb-8 drop-shadow-lg z-10">
        Henrique <span className="beating-heart inline-block">❤️</span> Manuella
      </h1>

      <button
        onClick={onStartJourney}
        className="px-10 py-5 bg-white text-pink-600 text-xl font-semibold rounded-full hover:scale-105 transition-transform shadow-lg z-10"
      >
        Começar Jornada
      </button>
    </div>
  );
}

export default Welcome;