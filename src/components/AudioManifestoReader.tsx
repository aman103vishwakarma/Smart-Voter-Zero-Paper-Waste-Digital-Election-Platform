"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Square, Globe, Sparkles } from "lucide-react";
import { Candidate, SupportedLanguage } from "@/types";

interface AudioManifestoReaderProps {
  candidate: Candidate;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const AudioManifestoReader: React.FC<AudioManifestoReaderProps> = ({
  candidate,
  selectedLanguage,
  onLanguageChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
      setSpeechSupported(false);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const languageLabels: Record<SupportedLanguage, string> = {
    en: "English",
    hi: "हिंदी (Hindi)",
    kn: "ಕನ್ನಡ (Kannada)",
    mr: "मराठी (Marathi)",
  };

  const getSpeechText = (): string => {
    const translations = candidate.manifesto?.translations;
    const currentTrans = translations ? translations[selectedLanguage] : null;

    if (selectedLanguage === "hi" && currentTrans) {
      return `उम्मीदवार ${candidate.fullName}, पार्टी ${candidate.party.name}। योग्यता: ${candidate.education}। मुख्य घोषणापत्र सारांश: ${currentTrans.aiSummary}। मुख्य वादे: ${currentTrans.keyPromises.join(". ")}`;
    }

    if (selectedLanguage === "kn" && currentTrans) {
      return `ಅಭ್ಯರ್ಥಿ ${candidate.fullName}, ಪಕ್ಷ ${candidate.party.name}। ಮುಖ್ಯ ಪ್ರಣಾಳಿಕೆ: ${currentTrans.aiSummary}। ಮುಖ್ಯ ಭರವಸೆಗಳು: ${currentTrans.keyPromises.join(". ")}`;
    }

    if (selectedLanguage === "mr" && currentTrans) {
      return `उमेदवार ${candidate.fullName}, पक्ष ${candidate.party.name}। मुख्य जाहीरनामा: ${currentTrans.aiSummary}। प्रमुख आश्वासने: ${currentTrans.keyPromises.join(". ")}`;
    }

    // Default English
    const summary = currentTrans?.aiSummary || candidate.manifesto?.aiSummary || candidate.bio;
    const promises = currentTrans?.keyPromises || candidate.manifesto?.keyPromises || [];
    return `Candidate ${candidate.fullName}, representing ${candidate.party.name}. Education: ${candidate.education}. Manifesto Summary: ${summary}. Key Campaign Promises: ${promises.join(". ")}`;
  };

  const handleToggleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending utterance
    const textToSpeak = getSpeechText();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Set voice language tags
    const langMap: Record<SupportedLanguage, string> = {
      en: "en-IN",
      hi: "hi-IN",
      kn: "kn-IN",
      mr: "mr-IN",
    };
    utterance.lang = langMap[selectedLanguage] || "en-US";
    utterance.rate = 0.95; // Slightly slower for crisp clarity

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  if (!speechSupported) return null;

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white shadow-md border border-emerald-700/40 my-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Title & Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 flex-shrink-0">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-emerald-400 h-3 animate-pulse" />
                <span className="w-1 bg-emerald-300 h-4 animate-bounce" />
                <span className="w-1 bg-emerald-400 h-2 animate-pulse" />
              </div>
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Audio Accessibility Reader
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Text-to-Speech
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Listen to the manifesto readout aloud in regional languages
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10">
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <select
              value={selectedLanguage}
              onChange={(e) => {
                if (isPlaying) {
                  window.speechSynthesis.cancel();
                  setIsPlaying(false);
                }
                onLanguageChange(e.target.value as SupportedLanguage);
              }}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              {(Object.keys(languageLabels) as SupportedLanguage[]).map((lang) => (
                <option key={lang} value={lang} className="text-gray-900">
                  {languageLabels[lang]}
                </option>
              ))}
            </select>
          </div>

          {/* Play / Stop Button */}
          <button
            type="button"
            onClick={handleToggleSpeak}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isPlaying
                ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                : "bg-emerald-500 hover:bg-emerald-600 text-slate-950"
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Reading</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Listen Audio</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
