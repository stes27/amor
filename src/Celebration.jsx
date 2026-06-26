import { useRef, useEffect, useState } from 'react';

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFD93D', '#FF69B4', '#00C2FF', '#FF4500', '#7B68EE'];

function generateConfetti() {
  return Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2.5 + Math.random() * 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 10,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 100,
  }));
}

export default function Celebration({ onNavigate }) {
  const [confetti, setConfetti] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setConfetti(generateConfetti());
    }
  }, []);

  return (
    <div className="celebration-container">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
            backgroundColor: c.color,
            width: `${c.size}px`,
            height: `${c.size * 0.6}px`,
            '--drift': `${c.drift}px`,
            '--rotation': `${c.rotation}deg`,
          }}
        />
      ))}

      <div className="celebration-content">
        <div className="celebration-hearts">
          <span style={{ filter: 'brightness(0) invert(1)' }}>❤️</span>
          <span style={{ filter: 'brightness(0) invert(1)' }}>❤️</span>
          <span style={{ filter: 'brightness(0) invert(1)' }}>❤️</span>
        </div>
        <h1 className="celebration-title">
          Parabéns minha vida
        </h1>
        <p className="celebration-subtitle">
          você ganhou um vale
        </p>
        <p className="celebration-message">
          Você pode pedir <strong>qualquer coisa</strong> para mim
        </p>
        <button
          className="celebration-btn"
          onClick={() => onNavigate('gallery')}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
