import { useState } from 'react';
import { Heart } from 'lucide-react';

export default function Letter() {
  const [envelopeState, setEnvelopeState] = useState('closed'); // 'closed' | 'opening' | 'opened'
  const [showParchment, setShowParchment] = useState(false);

  const handleOpenEnvelope = () => {
    if (envelopeState !== 'closed') return;
    
    setEnvelopeState('opening');
    
    // Step 1: Animate flap opening (starts in CSS via 'opening' state)
    // Step 2: Slide letter out after flap opens (after ~600ms)
    // Step 3: Transition to full parchment reading mode (after ~1500ms)
    setTimeout(() => {
      setShowParchment(true);
      setEnvelopeState('opened');
    }, 3200);
  };

  const handleCloseParchment = () => {
    setShowParchment(false);
    setEnvelopeState('closed');
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto p-4 md:p-8 transform transition-all duration-700 ease-out min-h-[85vh] flex flex-col items-center animate-in fade-in zoom-in-95">
      
      {/* Header */}
      <div className="w-full flex justify-center items-center mb-8 relative z-20">
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-rose-800 text-center drop-shadow-sm tracking-wide">
          Uma Mensagem para Você
        </h2>
      </div>

      {/* Main Container */}
      <div className="flex-1 w-full flex items-center justify-center relative min-h-[500px]">
        
        {/* ENVELOPE VIEW */}
        {!showParchment && (
          <div 
            className={`envelope-container ${envelopeState} flex flex-col items-center justify-center transition-all duration-500`}
          >
            <p className="text-rose-800 font-serif italic mb-6 animate-pulse text-center max-w-xs md:max-w-md text-lg">
              {envelopeState === 'closed' 
                ? 'Você recebeu uma carta de amor especial de Henrique. Clique no lacre para abrir.' 
                : 'Abrindo com muito carinho...'}
            </p>

            {/* 3D Envelope */}
            <div 
              className={`relative w-[320px] h-[220px] md:w-[400px] md:h-[260px] cursor-pointer select-none transition-transform duration-500 hover:scale-[1.03] ${
                envelopeState === 'closed' ? 'active:scale-95' : ''
              }`}
              onClick={handleOpenEnvelope}
            >
              {/* Back cover background */}
              <div className="absolute inset-0 bg-[#d8c3ae] rounded-lg shadow-2xl border border-[#c4af9a]"></div>

              {/* Tucked letter (slides up during opening) */}
              <div className="letter-preview absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-[#fcf9f2] rounded border border-amber-200/50 shadow-inner p-4 flex flex-col justify-between">
                <div className="h-2 w-3/4 bg-amber-100 rounded"></div>
                <div className="h-2 w-1/2 bg-amber-100 rounded"></div>
                <div className="h-2 w-2/3 bg-amber-100 rounded"></div>
                <div className="h-2 w-1/3 bg-amber-100 rounded"></div>
                <Heart className="w-6 h-6 text-rose-300 fill-rose-300 self-center" />
              </div>

              {/* Left Flap */}
              <div 
                className="absolute inset-0 z-20 bg-gradient-to-r from-[#e7d8c9] to-transparent"
                style={{
                  clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                }}
              ></div>

              {/* Right Flap */}
              <div 
                className="absolute inset-0 z-20 bg-gradient-to-l from-[#e7d8c9] to-transparent"
                style={{
                  clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                }}
              ></div>

              {/* Bottom Flap */}
              <div 
                className="absolute inset-0 z-20 bg-gradient-to-t from-[#dfcca9] via-[#e2d2b4] to-transparent border-b border-[#cca780]/30 rounded-b-lg"
                style={{
                  clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)',
                }}
              ></div>

              {/* Top Flap (animated) */}
              <div className="top-flap absolute inset-0 z-30 bg-[#e7d5bf] origin-top border-t border-[#cca780]/20 rounded-t-lg"></div>

              {/* Wax Seal Lacre */}
              <div className="wax-seal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[15%] z-40 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:rotate-12 active:scale-90">
                {/* Vintage seal texture */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-rose-700 to-red-900 opacity-95 shadow-inner border border-red-950/20"></div>
                <div className="absolute inset-1.5 rounded-full border border-dashed border-rose-300/30"></div>
                <Heart className="relative z-10 w-8 h-8 md:w-10 md:h-10 text-rose-100 fill-rose-200 animate-pulse drop-shadow-sm" />
              </div>
            </div>
          </div>
        )}

        {/* PARCHMENT LETTER VIEW */}
        {showParchment && (
          <div className="w-full max-w-2xl bg-[#f7eed6] border border-amber-900/10 rounded-2xl shadow-2xl relative p-6 md:p-12 overflow-hidden parchment-paper select-text flex flex-col justify-between min-h-[600px]"
            style={{ animation: 'parchmentFadeIn 1.4s cubic-bezier(0.33, 1, 0.68, 1) both' }}
          >
            {/* Vintage edge shadow effect */}
            <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent shadow-[inset_0_0_80px_rgba(139,94,26,0.2)] rounded-2xl"></div>
            
            {/* Letter Text */}
            <div className="relative z-10 font-romantic text-2xl md:text-3xl lg:text-4xl text-amber-950 leading-relaxed md:leading-loose selection:bg-rose-200">
              <p className="mb-6">
                Hoje é o Dia dos Namorados, mas a verdade é que você transforma os dias mais comuns da semana em momentos especiais.
              </p>
              
              <p className="mb-6">
                Sei que a rotina corre, o tempo voa e, às vezes, na correria do dia a dia, a gente esquece de dizer o óbvio: eu amo você e amo a nossa história. Amo o seu sorriso, o seu abraço que parece um porto seguro e até as nossas pequenas manias que só nós dois entendemos.
              </p>
              
              <p className="mb-6">
                Obrigado por estar sempre comigo, de planos e de vida. Estar ao seu lado é ter a certeza de que, não importa o tamanho do desafio, eu sempre terei um motivo para sorrir no final do dia.
              </p>
              
              <p className="mb-6">
                Que a gente continue juntos para sempre, descobrindo o mundo e crescendo juntos.
              </p>
              
              <p className="mb-6">
                Eu te amo não apenas pelo que você é, mas pelo que sou quando estou com você.
              </p>
              
              <p className="text-right mt-10 mr-4 font-serif italic text-lg md:text-xl text-amber-900/80 font-bold">
                Feliz Dia dos Namorados!
              </p>
            </div>

            {/* Reset Button (Guardar na Carta) */}
            <div className="mt-8 text-center relative z-20">
              <button 
                onClick={handleCloseParchment}
                className="px-6 py-2 bg-rose-800/10 hover:bg-rose-800/20 text-rose-900 border border-rose-900/20 rounded-full font-serif italic text-sm transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                Guardar na carta 💌
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
