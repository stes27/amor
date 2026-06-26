import { useState } from 'react';

const riddles = [
  'Não tenho corpo, mas posso ferir.',
  'Não tenho voz, mas faço gritar.',
  'Cegos me enxergam, sábios me fogem,',
  'mas nenhum sábio consegue escapar.',
  'Quanto mais dou, mais tenho.',
  'Quanto mais fujo, mais me perseguem.',
  'Construo castelos e derrubo muros,',
  'e os mais fortes por mim se rendem.',
];

export default function Riddle({ onNavigate }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'amor') {
      onNavigate('celebration');
    } else {
      setError('Resposta incorreta... tente novamente');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="riddle-container">
      <div className="riddle-card">
        <div className="riddle-icon">💛</div>
        <h2 className="riddle-title">Decifra-me</h2>

        <div className="riddle-lines">
          {riddles.map((line, i) => (
            <p key={i} className="riddle-line" style={{ animationDelay: `${i * 0.15}s` }}>
              {line}
            </p>
          ))}
        </div>

        <p className="riddle-question">O que sou eu?</p>

        <form onSubmit={handleSubmit} className={`riddle-form ${shake ? 'riddle-shake' : ''}`}>
          <input
            type="text"
            value={answer}
            onChange={(e) => { setAnswer(e.target.value); setError(''); }}
            placeholder="Digite sua resposta..."
            className="riddle-input"
            autoFocus
          />
          <button type="submit" className="riddle-btn">
            Responder
          </button>
        </form>

        {error && <p className="riddle-error">{error}</p>}
      </div>
    </div>
  );
}
