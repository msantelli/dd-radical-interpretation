import React from 'react';
import { Icons } from '../constants';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors p-1 rounded hover:bg-slate-800"
        >
          <Icons.Check />
        </button>
        
        <h2 className="text-xl font-mono font-bold text-emerald-400 mb-6 flex items-center gap-3">
          <Icons.Info /> Credits
        </h2>

        <div className="space-y-5 text-sm text-slate-300 font-light leading-relaxed">
          
          <div>
            <p className="text-white font-bold font-mono text-lg">Mauro Santelli</p>
          </div>

          <div className="border-l-2 border-slate-700 pl-4 py-1">
            <p className="font-semibold text-emerald-500 mb-1">Cátedra: Filosofía del Lenguaje (Universidad de Buenos Aires - Facultad de Filosofía y Letras)</p>
            <p className="text-slate-400">Profesor adjunto a cargo: <span className="text-slate-200">Federico Penelas</span></p>
            <p className="text-slate-400">JTP: <span className="text-slate-200">Eduardo García Ramírez</span></p>
          </div>

          <div className="pt-2">
            <a 
              href="https://github.com/msantelli/dd-radical-interpretation" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 hover:underline transition-colors bg-slate-800/50 px-3 py-2 rounded border border-slate-700 hover:border-emerald-500/50"
            >
              <Icons.Github /> github.com/msantelli/dd-radical-interpretation
            </a>
          </div>

          <div className="text-xs text-slate-500 pt-6 border-t border-slate-800 italic mt-4">
            Made with the help of Gemini-3-PRO in AI Studio and ChatGPT 5.1 research.
          </div>
        </div>
      </div>
    </div>
  );
};