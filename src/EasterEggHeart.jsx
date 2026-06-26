import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function EasterEggHeart({ children, onNavigate }) {
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef(null);

  const startPress = () => {
    setShowModal(false);
    timerRef.current = setTimeout(() => setShowModal(true), 1000);
  };

  const endPress = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <>
      <div
        className="navbar-brand"
        onPointerDown={startPress}
        onPointerUp={endPress}
        onPointerLeave={endPress}
        onPointerCancel={endPress}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') startPress(); }}
        onKeyUp={(e) => { if (e.key === 'Enter' || e.key === ' ') endPress(); }}
      >
        {children}
      </div>

      {showModal && createPortal(
        <div className="easter-egg-overlay" onClick={() => setShowModal(false)}>
          <div className="easter-egg-modal" onClick={(e) => e.stopPropagation()}>
            <span className="easter-egg-modal-heart">💛</span>
            <button
              className="easter-egg-modal-btn"
              onClick={() => {
                setShowModal(false);
                onNavigate('riddle');
              }}
            >
              Entrar
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
