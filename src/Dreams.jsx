import { useState, useEffect } from 'react';
import {
  RotateCcw, Heart, Sparkles, Plus, Trash2, Edit3, Check,
  Plane, Compass, Home, BookOpen, Star, Trash
} from 'lucide-react';

const defaultDreams = [
  {
    id: 1,
    title: 'Visitar Italia juntos',
    category: 'Viagens',
    notes: 'Visitar as diversas cidades da Italia, comer muita pizza e gelato e ir na ilha de star wars.',
    completed: false,
  },
  {
    id: 2,
    title: 'Comprar uma casa para morarmos juntos',
    category: 'Lar',
    notes: 'Ver o nascer do sol no inicio do dia acordando juntos na nossa casa.',
    completed: false,
  },
  {
    id: 3,
    title: 'Adotar um golden ou um salsichinha',
    category: 'Lar',
    notes: 'Adotar um salsichinha ou um golden para chamar de nosso.',
    completed: false,
  },
  {
    id: 4,
    title: 'Nos casarmos',
    category: 'Realizações',
    notes: 'Fazer uma cerimônia linda e celebrar o nosso amor para sempre.',
    completed: false,
  },

];

const categoryConfig = {
  'Viagens': { icon: Plane, color: 'from-sky-50 to-blue-100/60 border-blue-200 text-blue-700 shadow-blue-100/30 font-semibold' },
  'Aventuras': { icon: Compass, color: 'from-purple-50 to-indigo-100/60 border-purple-200 text-indigo-700 shadow-indigo-100/30 font-semibold' },
  'Lar': { icon: Home, color: 'from-rose-50 to-pink-100/60 border-rose-200 text-rose-700 shadow-rose-100/30 font-semibold' },
  'Aprendizado': { icon: BookOpen, color: 'from-amber-50 to-yellow-100/60 border-amber-200 text-amber-700 shadow-amber-100/30 font-semibold' },
  'Realizações': { icon: Star, color: 'from-emerald-50 to-teal-100/60 border-emerald-200 text-emerald-700 shadow-emerald-100/30 font-semibold' },
  'Outros': { icon: Sparkles, color: 'from-orange-50 to-peach-100/60 border-orange-200 text-orange-700 shadow-orange-100/30 font-semibold' }
};

export default function Dreams() {
  const [dreams, setDreams] = useState(() => {
    const saved = localStorage.getItem('sitemanu_dreams');
    return saved ? JSON.parse(saved) : defaultDreams;
  });

  const [particles, setParticles] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Viagens');
  const [newNotes, setNewNotes] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  // Persist dreams in localStorage
  useEffect(() => {
    localStorage.setItem('sitemanu_dreams', JSON.stringify(dreams));
  }, [dreams]);

  const toggleDream = (id, e) => {
    const isNowCompleted = !dreams.find(d => d.id === id)?.completed;
    
    setDreams(prev => prev.map(dream => {
      if (dream.id === id) {
        return { ...dream, completed: !dream.completed };
      }
      return dream;
    }));

    // If dream was marked as completed, trigger particle burst!
    if (isNowCompleted && e) {
      const rect = e.currentTarget.getBoundingClientRect();
      // Estimate relative coordinates for the button in the view
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      
      const emojis = ['💖', '⭐', '☁️', '✨', '💕', '💫'];
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        char: emojis[i % emojis.length],
        x: x + (Math.random() * 80 - 40) - window.scrollX,
        y: y + (Math.random() * 80 - 40) - window.scrollY,
        delay: Math.random() * 0.15,
        scale: Math.random() * 0.5 + 0.8
      }));

      setParticles(prev => [...prev, ...newParticles]);

      // Cleanup particles
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 1200);
    }
  };

  const handleAddDream = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDream = {
      id: Date.now() + Math.random(),
      title: newTitle.trim(),
      category: newCategory,
      notes: newNotes.trim() || 'Sem observações adicionais.',
      completed: false
    };

    setDreams(prev => [...prev, newDream]);
    setNewTitle('');
    setNewNotes('');
  };

  const handleDeleteDream = (id) => {
    setDreams(prev => prev.filter(dream => dream.id !== id));
    if (editingNoteId === id) {
      setEditingNoteId(null);
    }
  };

  const startEditingNote = (dream) => {
    setEditingNoteId(dream.id);
    setEditingNoteText(dream.notes);
  };

  const saveEditingNote = (id) => {
    setDreams(prev => prev.map(dream => {
      if (dream.id === id) {
        return { ...dream, notes: editingNoteText.trim() || 'Sem observações adicionais.' };
      }
      return dream;
    }));
    setEditingNoteId(null);
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto p-4 md:p-8 transform transition-all duration-700 ease-out min-h-[85vh] flex flex-col items-center animate-in fade-in zoom-in-95 select-none">
      
      {/* Sparkles / Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute heart-particle text-2xl pointer-events-none select-none"
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

      {/* Global overlay for aesthetic matching */}
      <div className="absolute inset-0 pointer-events-none bg-rose-500/5 mix-blend-multiply rounded-3xl"></div>

      {/* Header */}
      <div className="w-full flex justify-center items-center mb-8 relative z-20">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-rose-800 text-center drop-shadow-sm tracking-wide flex items-center justify-center gap-2">
          Nossos Sonhos
          <Sparkles className="w-8 h-8 text-rose-500 fill-rose-300 animate-pulse inline" />
        </h2>
      </div>


      {/* Content Layout */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-20 pb-20 items-start">
        
        {/* Left Side: Wishlist Board (2 columns wide on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-rose-200/50 pb-3">
            <h3 className="font-serif text-2xl font-bold text-rose-800 flex items-center gap-2">
              Nossa Lista de Desejos 
              <span className="text-base px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-sans font-bold">
                {dreams.filter(d => d.completed).length}/{dreams.length}
              </span>
            </h3>
            {dreams.length === 0 && (
              <span className="text-xs text-rose-600/80 font-medium">Nenhum sonho adicionado ainda.</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dreams.map(dream => {
              const config = categoryConfig[dream.category] || categoryConfig['Outros'];
              const IconComp = config.icon;

              return (
                <div
                  key={dream.id}
                  className={`relative flex flex-col justify-between p-5 rounded-2xl border bg-gradient-to-br ${config.color} transition-all duration-500 shadow-md ${
                    dream.completed ? 'opacity-70 scale-[0.98]' : 'hover:scale-[1.02] hover:shadow-lg'
                  }`}
                >
                  {/* Top line: Category and Delete */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="flex items-center gap-1.5 text-xs font-sans tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/70 shadow-sm">
                      <IconComp className="w-3.5 h-3.5" />
                      {dream.category}
                    </span>
                    <button
                      onClick={() => handleDeleteDream(dream.id)}
                      className="p-1.5 rounded-full hover:bg-red-100/50 text-rose-400 hover:text-rose-600 transition-colors duration-200 cursor-pointer"
                      title="Excluir Sonho"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex gap-4 items-start flex-1 mb-4">
                    {/* Custom Cute Checkbox */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <button
                        onClick={(e) => toggleDream(dream.id, e)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative border-2 cursor-pointer ${
                          dream.completed
                            ? 'bg-rose-400 border-rose-400 text-white scale-110 shadow-md shadow-rose-200'
                            : 'bg-white/90 border-rose-200 text-rose-300 hover:border-rose-400 hover:scale-105'
                        }`}
                      >
                        <Heart className={`w-5 h-5 transition-transform duration-300 ${dream.completed ? 'fill-white scale-110' : 'fill-none'}`} />
                      </button>

                      {/* Decors popping around when completed */}
                      {dream.completed && (
                        <>
                          <span className="absolute -top-1.5 -left-1.5 text-[9px] animate-bounce pointer-events-none">⭐</span>
                          <span className="absolute -bottom-1.5 -right-1.5 text-[9px] animate-bounce pointer-events-none" style={{ animationDelay: '0.2s' }}>☁️</span>
                          <span className="absolute -top-1.5 -right-1.5 text-[9px] animate-bounce pointer-events-none" style={{ animationDelay: '0.4s' }}>💖</span>
                        </>
                      )}
                    </div>

                    {/* Dream Title & Notes */}
                    <div className="flex-1 min-w-0 select-text">
                      <h4 className={`font-serif text-lg font-bold leading-snug break-words ${
                        dream.completed ? 'line-through text-rose-900/50 font-normal decoration-rose-400 decoration-2' : 'text-rose-950'
                      }`}>
                        {dream.title}
                      </h4>
                      
                      {/* Comments / notes section */}
                      <div className="mt-2 bg-white/40 backdrop-blur-sm rounded-lg p-2.5 border border-white/50 relative group/note">
                        {editingNoteId === dream.id ? (
                          <div className="flex flex-col gap-1.5">
                            <textarea
                              value={editingNoteText}
                              onChange={(e) => setEditingNoteText(e.target.value)}
                              className="w-full text-xs font-modern p-1.5 bg-white border border-rose-200 rounded focus:outline-none focus:ring-1 focus:ring-rose-300 resize-y"
                              rows={2}
                              maxLength={200}
                              placeholder="Adicionar detalhes..."
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditingNoteId(null)}
                                className="px-2 py-0.5 text-[10px] rounded bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={() => saveEditingNote(dream.id)}
                                className="px-2 py-0.5 text-[10px] rounded bg-rose-500 hover:bg-rose-600 text-white font-medium cursor-pointer"
                              >
                                Salvar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="font-modern text-[11px] leading-relaxed text-rose-900/80 italic font-medium break-words">
                              "{dream.notes}"
                            </p>
                            <button
                              onClick={() => startEditingNote(dream)}
                              className="absolute top-1.5 right-1.5 opacity-0 group-hover/note:opacity-100 p-1 bg-white/80 rounded hover:bg-white text-rose-500 transition-opacity duration-200 cursor-pointer"
                              title="Editar Anotação"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Add New Dream Form Card */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-3xl p-6 border border-white/40 shadow-xl relative overflow-hidden bg-white/20">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-300/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-300/10 rounded-full blur-2xl pointer-events-none"></div>

            <h3 className="font-serif text-2xl font-bold text-rose-800 mb-5 pb-2 border-b border-rose-200/40 flex items-center gap-2">
              Planejar Futuro ✍️
            </h3>

            <form onSubmit={handleAddDream} className="flex flex-col gap-4">
              {/* Dream Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-rose-800 uppercase tracking-wider font-modern">
                  O que queremos realizar?
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Viajar para a Itália, Comprar um apê..."
                  maxLength={50}
                  required
                  className="w-full px-4 py-2.5 rounded-full bg-white/70 border border-rose-200 text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/50 transition-shadow duration-200"
                />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-rose-800 uppercase tracking-wider font-modern">
                  Categoria
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-white/70 border border-rose-200 text-rose-950 focus:outline-none focus:ring-2 focus:ring-rose-300/50 transition-shadow duration-200 cursor-pointer"
                >
                  <option value="Viagens">✈️ Viagens</option>
                  <option value="Aventuras">🧭 Aventuras</option>
                  <option value="Lar">🏠 Lar & Família</option>
                  <option value="Aprendizado">📚 Aprendizado</option>
                  <option value="Realizações">⭐ Realizações</option>
                  <option value="Outros">✨ Outros</option>
                </select>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-rose-800 uppercase tracking-wider font-modern">
                  Anotações / Detalhes (Opcional)
                </label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Ex: Planejar para as férias de inverno, economizar..."
                  maxLength={150}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-rose-200 text-rose-950 placeholder-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/50 transition-shadow duration-200 resize-none font-modern text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-2 button-glow flex items-center justify-center gap-2 w-full py-3 bg-white text-rose-600 hover:text-white hover:bg-gradient-to-r hover:from-rose-400 hover:to-pink-500 rounded-full font-modern font-semibold text-base transition-all duration-300 shadow-md cursor-pointer border border-rose-200"
              >
                <Plus className="w-5 h-5" /> Adicionar Sonho
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
