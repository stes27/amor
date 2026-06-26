import { useState } from 'react';
import { Heart, Menu, X, Images, Mail, Star, Sparkles } from 'lucide-react';
import EasterEggHeart from './EasterEggHeart';

const pages = [
  { id: 'gallery', label: 'Nossa Jornada', icon: Images },
  { id: 'letter',  label: 'Carta',         icon: Mail },
  { id: 'reasons', label: 'Motivos',       icon: Star },
  { id: 'dreams',  label: 'Nossos Sonhos', icon: Sparkles },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const showEasterEgg = currentPage !== 'riddle' && currentPage !== 'celebration';

  const handleNav = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <nav className="navbar-bar">
        {/* Logo / Brand */}
        {showEasterEgg ? (
          <EasterEggHeart onNavigate={onNavigate}>
            <Heart className="navbar-brand-icon" />
            <span className="navbar-brand-text">Para meu amor</span>
          </EasterEggHeart>
        ) : (
          <div className="navbar-brand">
            <Heart className="navbar-brand-icon" />
            <span className="navbar-brand-text">Para meu amor</span>
          </div>
        )}

        {/* Desktop links */}
        <ul className="navbar-desktop-links">
          {pages.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => handleNav(id)}
                className={`navbar-link ${currentPage === id ? 'navbar-link-active' : ''}`}
              >
                <Icon className="navbar-link-icon" />
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          className="navbar-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {open && (
        <div className="navbar-overlay" onClick={() => setOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={`navbar-drawer ${open ? 'navbar-drawer-open' : ''}`}>
        <div className="navbar-drawer-header">
          <button className="navbar-drawer-close" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <ul className="navbar-drawer-links">
          {pages.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => handleNav(id)}
                className={`navbar-drawer-link ${currentPage === id ? 'navbar-drawer-link-active' : ''}`}
              >
                <Icon className="navbar-link-icon" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
