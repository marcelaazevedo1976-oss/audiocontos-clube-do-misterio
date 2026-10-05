import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Volume2, VolumeX, CloudRain, Flame, Waves, Music } from 'lucide-react';

const TRACKS = [
  { id: 'chuva_suave', name: 'Chuva Suave', icon: <CloudRain size={16} />, src: '/chuva_suave.mp3' },
  { id: 'chuva_forte', name: 'Chuva Forte', icon: <CloudRain size={16} />, src: '/chuva_forte.mp3' },
  { id: 'lareira', name: 'Lareira', icon: <Flame size={16} />, src: '/lareira.mp3' },
  { id: 'mar', name: 'Barulho do Mar', icon: <Waves size={16} />, src: '/mar.mp3' },
  { id: 'musica_1', name: 'Tensão 1', icon: <Music size={16} />, src: '/musica_1.mp3' },
  { id: 'musica_2', name: 'Tensão 2', icon: <Music size={16} />, src: '/musica_2.mp3' },
  { id: 'musica_3', name: 'Investigação', icon: <Music size={16} />, src: '/musica_3.mp3' },
  { id: 'musica_4', name: 'Mistério', icon: <Music size={16} />, src: '/musica_4.mp3' },
];

export default function AmbientMixer() {
  const [isOpen, setIsOpen] = useState(false);
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Initialize defaults
    const initialVols: Record<string, number> = {};
    TRACKS.forEach(t => {
      initialVols[t.id] = 0.5; // default 50% volume
    });
    setVolumes(initialVols);
  }, []);

  const togglePlay = (id: string) => {
    const isPlaying = playing[id];
    const audio = audioRefs.current[id];
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setPlaying(prev => ({ ...prev, [id]: false }));
    } else {
      audio.play().catch(e => console.error("Audio play failed", e));
      setPlaying(prev => ({ ...prev, [id]: true }));
    }
  };

  const handleVolumeChange = (id: string, value: number) => {
    setVolumes(prev => ({ ...prev, [id]: value }));
    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = value;
    }
  };

  return (
    <>
      {/* Elementos de áudio ocultos */}
      {TRACKS.map(track => (
        <audio
          key={track.id}
          ref={el => { if (el) audioRefs.current[track.id] = el; }}
          src={track.src}
          loop
        />
      ))}

      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
        {/* Painel do Mixer */}
        {isOpen && (
          <div style={{ 
            position: 'absolute', bottom: 60, right: 0, 
            background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)',
            border: '1px solid #d4af37', borderRadius: '12px', padding: '20px',
            width: '320px', boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
            color: '#f8fafc', fontFamily: 'sans-serif'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '10px' }}>
              <h3 style={{ margin: 0, color: '#d4af37', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={20} /> Mesa de Som
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem', padding: 0, lineHeight: 1 }}
              >
                &times;
              </button>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {TRACKS.map(track => (
                <div key={track.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: playing[track.id] ? '#d4af37' : '#cbd5e1' }}>
                      {track.icon}
                      <span style={{ fontSize: '0.9rem', fontWeight: playing[track.id] ? 'bold' : 'normal' }}>{track.name}</span>
                    </div>
                    <button 
                      onClick={() => togglePlay(track.id)}
                      style={{ 
                        background: playing[track.id] ? '#d4af37' : 'transparent',
                        border: '1px solid #d4af37',
                        color: playing[track.id] ? '#000' : '#d4af37',
                        padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      {playing[track.id] ? 'LIGADO' : 'LIGAR'}
                    </button>
                  </div>
                  
                  {playing[track.id] && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <VolumeX size={14} color="#64748b" />
                      <input 
                        type="range" 
                        min="0" max="1" step="0.01" 
                        value={volumes[track.id] ?? 0.5}
                        onChange={(e) => handleVolumeChange(track.id, parseFloat(e.target.value))}
                        style={{ flex: 1, accentColor: '#d4af37' }}
                      />
                      <Volume2 size={14} color="#d4af37" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p style={{ margin: '15px 0 0 0', fontSize: '0.75rem', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
              Misture os sons ambientes como preferir durante a narração.
            </p>
          </div>
        )}

        {/* Botão Flutuante */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: Object.values(playing).some(v => v) ? '#d4af37' : '#1e293b',
            color: Object.values(playing).some(v => v) ? '#000' : '#d4af37',
            border: '2px solid #d4af37',
            borderRadius: '50%', width: '60px', height: '60px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'pointer', boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
            transition: 'all 0.3s'
          }}
          title="Mesa de Som Ambiente"
        >
          <Sliders size={28} />
          {Object.values(playing).some(v => v) && (
            <span style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #000' }} />
          )}
        </button>
      </div>
    </>
  );
}
