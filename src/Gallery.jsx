import { useState } from 'react';
import { Heart, X } from 'lucide-react';

// Import images from datas especiais
import datasEspeciais1 from './assets/datas especiais/WhatsApp Image 2026-06-01 at 13.58.28.jpeg';
import datasEspeciais2 from './assets/datas especiais/WhatsApp Image 2026-06-01 at 14.03.35.jpeg';
import datasEspeciais3 from './assets/datas especiais/WhatsApp Image 2026-06-07.jpeg';
import datasEspeciais4 from './assets/datas especiais/WhatsApp Image 2026-06-08.jpeg';

// Import images from momentos bobos
import momentosBobos1 from './assets/momentos bobos/WhatsApp Image 2026-06-01 at 13.55.44.jpeg';
import momentosBobos2 from './assets/momentos bobos/WhatsApp Image 2026-06-02.jpeg';
import momentosBobos3 from './assets/momentos bobos/WhatsApp Image 2026-06-03.jpeg';
import momentosBobos4 from './assets/momentos bobos/WhatsApp Image 2026-06-05.jpeg';

const memories = [
  { id: 1, category: 'Viagens', caption: 'Em breve', rotation: '-rotate-3', isComingSoon: true },
  { id: 2, category: 'Datas especiais', image: datasEspeciais1, caption: 'O dia da nossa dança na escola.', rotation: 'rotate-2' },
  { id: 3, category: 'Momentos bobos', image: momentosBobos1, caption: '', rotation: '-rotate-1' },
  { id: 5, category: 'Datas especiais', image: datasEspeciais2, caption: 'Sua festinha de 15 anos.', rotation: '-rotate-2' },
  { id: 6, category: 'Momentos bobos', image: momentosBobos2, caption: '', rotation: 'rotate-1' },
  { id: 7, category: 'Datas especiais', image: datasEspeciais3, caption: 'Nosso primeiro beijo juntos.', rotation: 'rotate-3' },
  { id: 8, category: 'Momentos bobos', image: momentosBobos3, caption: '', rotation: '-rotate-2' },
  { id: 9, category: 'Datas especiais', image: datasEspeciais4, caption: 'primeira vez kkkk.', rotation: '-rotate-1' },
  { id: 10, category: 'Momentos bobos', image: momentosBobos4, caption: '', rotation: 'rotate-2' },
];

const categories = ['Todas', 'Viagens', 'Datas especiais', 'Momentos bobos'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [selectedMemory, setSelectedMemory] = useState(null);

  const filteredMemories = activeCategory === 'Todas' 
    ? memories 
    : memories.filter(m => m.category === activeCategory);

  return (
    <div className="relative z-10 w-full max-w-5xl mx-auto p-4 md:p-8 transform transition-all duration-700 ease-out min-h-[80vh] flex flex-col items-center animate-in fade-in zoom-in-95">
      
      {/* Global Romantic Filter overlay */}
      <div className="absolute inset-0 pointer-events-none bg-rose-500/5 mix-blend-multiply rounded-3xl"></div>

      {/* Header */}
      <div className="w-full flex justify-center items-center mb-10 relative z-20">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-rose-800 text-center drop-shadow-sm tracking-wide">
          Nossa Jornada <Heart className="inline w-8 h-8 md:w-10 md:h-10 text-rose-500 fill-rose-500 animate-pulse ml-2 -mt-2" />
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-20">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-sm border border-transparent ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white scale-105 shadow-rose-200 border-rose-300' 
                : 'bg-white/60 backdrop-blur-sm text-rose-700 hover:bg-white hover:scale-105 border-white/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full relative z-20 pb-20">
        {filteredMemories.map(memory => (
          <div 
            key={memory.id}
            onClick={() => {
              if (!memory.isComingSoon) {
                setSelectedMemory(memory);
              }
            }}
            className={`group relative bg-[#fdfbf7] p-4 pb-14 rounded-sm shadow-xl hover:shadow-2xl hover:z-30 transition-all duration-500 cursor-pointer ${memory.rotation} hover:rotate-0 hover:scale-[1.03] border border-gray-100`}
          >
            {/* Blank Image Area */}
            <div className="w-full aspect-square bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 relative overflow-hidden flex items-center justify-center shadow-inner filter sepia-[0.1]">
               {memory.isComingSoon ? (
                 <span className="font-serif text-2xl md:text-3xl text-rose-700/80 font-bold tracking-wider select-none animate-pulse">
                   Em breve
                 </span>
               ) : (
                 <img 
                   src={memory.image} 
                   alt={memory.caption || memory.category} 
                   className="w-full h-full object-cover object-center absolute inset-0"
                 />
               )}
               
               {/* Decorative border inside image */}
               <div className="absolute inset-2 border border-white/40 mix-blend-overlay"></div>
               
               {/* Hover overlay with caption */}
               {!memory.isComingSoon && memory.category !== 'Momentos bobos' && memory.caption && (
                 <div className="absolute inset-0 bg-gradient-to-t from-rose-900/80 via-rose-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 text-center">
                   <p className="text-white font-serif text-lg md:text-xl drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 mb-2">
                     "{memory.caption}"
                   </p>
                 </div>
               )}
            </div>
            
            {/* Polaroid Bottom Text */}
            <div className="absolute bottom-5 left-0 w-full text-center px-4">
              <span className="font-serif italic text-rose-800/80 text-lg md:text-xl">{memory.category}</span>
            </div>

            {/* Decorative tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/60 backdrop-blur-md -rotate-3 shadow-sm rounded-sm"></div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedMemory && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedMemory(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setSelectedMemory(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full cursor-pointer z-50 shadow-lg"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div 
            className="relative flex flex-col items-center max-w-4xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content box
          >
            <img 
              src={selectedMemory.image} 
              alt={selectedMemory.caption || selectedMemory.category} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300"
            />
            
            {selectedMemory.caption ? (
              <p className="mt-6 text-white font-serif text-xl md:text-2xl text-center max-w-2xl px-4 drop-shadow-md italic">
                "{selectedMemory.caption}"
              </p>
            ) : (
              <p className="mt-6 text-white/70 font-serif text-lg md:text-xl text-center max-w-2xl px-4 drop-shadow-md">
                {selectedMemory.category}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
