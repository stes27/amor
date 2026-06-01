import { useState } from 'react';
import {
  Heart, Smile, Sparkles, Infinity as InfinityIcon,
  Sun, Star, MessageCircle, Camera, Gift, Coffee, Compass, RotateCcw
} from 'lucide-react';

const reasonsList = [
  {
    id: 1,
    title: 'Por seu sorriso',
    description: 'Aquele sorriso iluminado que desarma qualquer dia ruim, traz paz instantânea e faz o meu mundo inteiro fazer sentido.',
    icon: Smile,
    color: 'from-rose-50 to-pink-100 border-rose-200 text-rose-700 shadow-rose-100/30',
    emoji: '💖'
  },
  {
    id: 2,
    title: 'Por seu abraço',
    description: 'O melhor lugar do mundo, meu porto seguro onde todo o cansaço e preocupações simplesmente desaparecem.',
    icon: Heart,
    color: 'from-pink-50 to-rose-100 border-pink-200 text-pink-700 shadow-pink-100/30',
    emoji: '💕'
  },
  {
    id: 3,
    title: 'Por sua alegria',
    description: 'A energia contagiante que você traz para a minha vida, transformando momentos comuns em pura felicidade.',
    icon: Sparkles,
    color: 'from-purple-50 to-pink-100 border-purple-200 text-purple-700 shadow-purple-100/30',
    emoji: '✨'
  },
  {
    id: 4,
    title: 'Por seu companheirismo',
    description: 'Por ser minha parceira ideal em todas as loucuras, planos bobos e decisões importantes da vida. Estamos sempre juntos!',
    icon: InfinityIcon,
    color: 'from-blue-50 to-indigo-100 border-blue-200 text-blue-700 shadow-blue-100/30',
    emoji: '💫'
  },

  {
    id: 5,
    title: 'Por apoiar meus sonhos',
    description: 'Por acreditar em mim quando mais preciso, celebrar cada pequena conquista e me dar forças para voar mais alto.',
    icon: Star,
    color: 'from-cyan-50 to-sky-100 border-cyan-200 text-cyan-700 shadow-cyan-100/30',
    emoji: '⭐️'
  },
  {
    id: 6,
    title: 'Por nossas conversas',
    description: 'Nossos papos intermináveis sobre tudo e nada, de madrugada ou no almoço, onde o tempo simplesmente parece parar.',
    icon: MessageCircle,
    color: 'from-teal-50 to-emerald-100 border-teal-200 text-teal-700 shadow-teal-100/30',
    emoji: '💬'
  },
  {
    id: 7,
    title: 'Por nossas memórias',
    description: 'Cada momento incrível que já vivemos juntos e a ansiedade boa por todos os que ainda vamos construir de mãos dadas.',
    icon: Camera,
    color: 'from-fuchsia-50 to-purple-100 border-fuchsia-200 text-fuchsia-700 shadow-fuchsia-100/30',
    emoji: '📸'
  },
  {
    id: 8,
    title: 'Por seu carinho',
    description: 'Os pequenos gestos do dia a dia: um cafuné, um abraço inesperado ou uma mensagem fofa no meio de um dia corrido.',
    icon: Gift,
    color: 'from-violet-50 to-purple-100 border-violet-200 text-violet-700 shadow-violet-100/30',
    emoji: '🎁'
  },

  {
    id: 9,
    title: 'Por sua inspiração',
    description: 'Por ser essa pessoa de coração gigante, generosa e forte, que me inspira a ser um ser humano melhor a cada novo dia.',
    icon: Compass,
    color: 'from-emerald-50 to-green-100 border-emerald-200 text-emerald-700 shadow-emerald-100/30',
    emoji: '🧭'
  },
  {
    id: 10,
    title: 'Por seu beijo',
    description: 'Aquele encaixe perfeito, doce e cheio de sentimento que renova minhas energias e me deixa nas nuvens toda vez.',
    icon: Heart,
    color: 'from-rose-100 to-pink-100 border-rose-200 text-rose-700 shadow-rose-100/30',
    emoji: '🌹'
  }
];

export default function Reasons() {
  const [flipped, setFlipped] = useState({});
  const [particles, setParticles] = useState([]);

  const handleCardClick = (id, e) => {
    // Toggle flip state
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));

    // Spawn floating emoji particles near click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cardEmoji = reasonsList.find(r => r.id === id)?.emoji || '❤️';
    const newParticles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      char: i % 2 === 0 ? cardEmoji : '❤️',
      x: x + (Math.random() * 60 - 30),
      y: y + (Math.random() * 60 - 30),
      delay: Math.random() * 0.15,
      scale: Math.random() * 0.4 + 0.8
    }));

    setParticles(prev => [...prev, ...newParticles]);

    // Clear particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1200);
  };

  const handleRevealAll = () => {
    const all = {};
    reasonsList.forEach(r => {
      all[r.id] = true;
    });
    setFlipped(all);
  };

  const handleHideAll = () => {
    setFlipped({});
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto p-4 md:p-8 transform transition-all duration-700 ease-out min-h-[85vh] flex flex-col items-center animate-in fade-in zoom-in-95 select-none">

      {/* Global overlay for romantic styling */}
      <div className="absolute inset-0 pointer-events-none bg-rose-500/5 mix-blend-multiply rounded-3xl"></div>

      {/* Header */}
      <div className="w-full flex justify-center items-center mb-8 relative z-20">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-rose-800 text-center drop-shadow-sm tracking-wide flex items-center justify-center gap-2">
          Motivos Para Te Amar
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 animate-pulse inline" />
        </h2>
      </div>

      {/* Quick Controls */}
      <div className="flex gap-4 mb-10 relative z-20">
        <button
          onClick={handleRevealAll}
          className="px-5 py-2 bg-white/60 hover:bg-white/90 text-rose-700 rounded-full font-medium text-sm transition-all border border-rose-200/50 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
        >
          Revelar Todos ✨
        </button>
        <button
          onClick={handleHideAll}
          className="px-5 py-2 bg-white/60 hover:bg-white/90 text-rose-700 rounded-full font-medium text-sm transition-all border border-rose-200/50 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
        >
          Esconder Todos 🔒
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full relative z-20 pb-16">
        {reasonsList.map((reason) => {
          const IconComp = reason.icon;
          const isCardFlipped = !!flipped[reason.id];

          return (
            <div
              key={reason.id}
              className="card-flip-container relative"
              onClick={(e) => handleCardClick(reason.id, e)}
            >
              {/* Particle overlay per card */}
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden rounded-3xl">
                {particles.map(p => (
                  <div
                    key={p.id}
                    className="absolute heart-particle text-xl pointer-events-none select-none"
                    style={{
                      left: p.x,
                      top: p.y,
                      animationDelay: `${p.delay}s`,
                      transform: `scale(${p.scale})`
                    }}
                  >
                    {p.char}
                  </div>
                ))}
              </div>

              <div className={`card-flip-inner ${isCardFlipped ? 'is-flipped' : ''}`}>
                {/* CARD FRONT */}
                <div className={`card-front flex flex-col justify-between p-6 bg-gradient-to-br from-white/80 to-pink-50/50 border-2 border-dashed border-rose-100 hover:border-rose-300 transition-colors duration-300 shadow-md`}>
                  {/* Decorative element top-right */}
                  <div className="absolute top-3 right-3 w-5 h-5 card-petal-decor opacity-40"></div>

                  {/* Card ID */}
                  <span className="font-serif italic text-rose-400 text-sm self-start">
                    Motivo #{reason.id}
                  </span>

                  {/* Icon section */}
                  <div className="flex items-center justify-center my-2">
                    <div className={`p-5 rounded-full bg-gradient-to-br ${reason.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
                      <IconComp className="w-10 h-10 animate-bounce" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>

                  {/* Discover prompt */}
                  <div className="flex flex-col items-center">
                    <span className="text-rose-700/80 font-medium text-sm border-t border-rose-100 pt-3 w-full text-center flex items-center justify-center gap-1.5 animate-pulse">
                      Clique para descobrir <Sparkles className="w-4 h-4 text-amber-500" />
                    </span>
                  </div>
                </div>

                {/* CARD BACK */}
                <div className={`card-back flex flex-col justify-between p-6 bg-gradient-to-br ${reason.color} border-2 border-rose-200/40 text-rose-900 shadow-lg`}>
                  {/* Decorative hearts top and bottom */}
                  <div className="absolute top-3 right-3 text-xs opacity-50">♥</div>
                  <div className="absolute bottom-3 left-3 text-xs opacity-50">♥</div>

                  <div className="flex items-center justify-between border-b border-rose-200/40 pb-2">
                    <span className="font-serif italic text-rose-700 font-bold text-xs uppercase tracking-wider">
                      Motivo #{reason.id}
                    </span>
                    <IconComp className="w-5 h-5 text-rose-500 fill-rose-100" />
                  </div>

                  {/* Description */}
                  <div className="flex-1 flex flex-col items-center justify-center py-4">
                    <h3 className="font-elegant font-bold text-base md:text-lg mb-2 text-rose-800">
                      {reason.title}
                    </h3>
                    <p className="font-modern text-xs md:text-sm leading-relaxed text-rose-950 font-medium select-text">
                      "{reason.description}"
                    </p>
                  </div>

                  <div className="text-center pt-2 border-t border-rose-200/40">
                    <span className="text-[10px] font-sans font-semibold tracking-wider text-rose-600/80 uppercase">
                      Clique para fechar ♡
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
