import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Volume2, VolumeX } from 'lucide-react';

const TRACKS = [
  { id: 'chuva_calma', name: '🌧️ Chuva Calma', src: '/Chuva Calma.mp3' },
  { id: 'chuva_forte', name: '⛈️ Chuva Forte', src: '/Chuva Forte.mp3' },
  { id: 'tempestade', name: '🌩️ Tempestade', src: '/Tempestade.mp3' },
  { id: 'lareira', name: '🔥 Lareira Crepitante', src: '/Lareira Crepitante.mp3' },
  { id: 'ondas_mar', name: '🌊 Ondas do Mar', src: '/Ondas do Mar.mp3' },
  { id: 'passaros', name: '🐦 Pássaros', src: '/Pássaros.mp3' },
  { id: 'allemande', name: '🎻 Allemande', src: '/Allemande.mp3' },
  { id: 'allegro', name: '🎻 Allégro', src: '/Allégro.mp3' },
  { id: 'anton', name: '🎻 Anton', src: '/Anton.mp3' },
  { id: 'bach', name: '🎻 Bach Celo Suite', src: '/Bach Celo Suite No.1.mp3' },
];

export default function AmbientMixer() {
  const [isOpen, setIsOpen] = useState(false);
  const [volumes, setVolumes] = useState<Record<string, number>>({});
  const [playing, setPlaying] = useState<Record<string, boolean>>({});
  
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const gainNodes = useRef<Record<string, GainNode>>({});
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initialVols: Record<string, number> = {};
    TRACKS.forEach(t => {
      initialVols[t.id] = 0.5;
    });
    setVolumes(initialVols);
  }, []);

  const initAudioContext = () => {
    if (!audioContext.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContext.current = new AudioContextClass();
    }
    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }
  };

  const togglePlay = (id: string) => {
    initAudioContext();
    const isPlaying = playing[id];
    const audio = audioRefs.current[id];
    if (!audio) return;

    // Web Audio API para contornar o bloqueio de volume do iOS
    if (!gainNodes.current[id] && audioContext.current) {
      try {
        const source = audioContext.current.createMediaElementSource(audio);
        const gainNode = audioContext.current.createGain();
        gainNode.gain.value = volumes[id] ?? 0.5;
        source.connect(gainNode);
        gainNode.connect(audioContext.current.destination);
        gainNodes.current[id] = gainNode;
      } catch (e) {
        console.warn("Web Audio API routing failed for iOS, falling back to standard audio", e);
      }
    }

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
    
    // Altera no nó da Web Audio API (iOS)
    if (gainNodes.current[id]) {
      gainNodes.current[id].gain.value = value;
    }
    // Altera também no elemento nativo (Android/PC)
    const audio = audioRefs.current[id];
    if (audio) {
      audio.volume = value;
    }
  };

  return (
    <>
      {TRACKS.map(track => (
        <audio
          key={track.id}
          ref={el => { if (el) audioRefs.current[track.id] = el; }}
          src={track.src}
          loop
          crossOrigin="anonymous"
        />
      ))}

      <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
        {isOpen && (
          <div style={{ 
            position: 'absolute', bottom: 65, right: 0, 
            background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)',
            border: '1px solid #d4af37', borderRadius: '12px', padding: '15px',
            width: 'calc(100vw - 40px)', maxWidth: '320px', 
            boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
            color: '#f8fafc', fontFamily: 'sans-serif'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', paddingBottom: '10px' }}>
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

            <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '5px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {TRACKS.map(track => (
                <div key={track.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: playing[track.id] ? '#d4af37' : '#cbd5e1' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: playing[track.id] ? 'bold' : 'normal' }}>{track.name}</span>
                    </div>
                    <button 
                      onClick={() => togglePlay(track.id)}
                      style={{ 
                        background: playing[track.id] ? '#d4af37' : 'transparent',
                        border: '1px solid #d4af37',
                        color: playing[track.id] ? '#000' : '#d4af37',
                        padding: '4px 10px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold',
                        cursor: 'pointer', transition: 'all 0.2s'
                      }}
                    >
                      {playing[track.id] ? 'LIGADO' : 'LIGAR'}
                    </button>
                  </div>
                  
                  {playing[track.id] && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
            <p style={{ margin: '10px 0 0 0', fontSize: '0.65rem', color: '#64748b', textAlign: 'center', fontStyle: 'italic' }}>
              Mixe os ambientes para tocar junto com o conto.
            </p>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: Object.values(playing).some(v => v) ? '#d4af37' : '#1e293b',
            color: Object.values(playing).some(v => v) ? '#000' : '#d4af37',
            border: '2px solid #d4af37',
            borderRadius: '50%', width: '55px', height: '55px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            cursor: 'pointer', boxShadow: '0 5px 20px rgba(0,0,0,0.5)',
            transition: 'all 0.3s'
          }}
        >
          <Sliders size={24} />
          {Object.values(playing).some(v => v) && (
            <span style={{ position: 'absolute', top: -2, right: -2, background: '#ef4444', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #000' }} />
          )}
        </button>
      </div>
    </>
  );
}
