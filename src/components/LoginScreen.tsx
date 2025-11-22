import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 10 + 5,
      left: Math.random() * 100,
      delay: Math.random() * 15,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-radial from-[rgba(10,29,55,0.8)] to-black overflow-hidden z-50">
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gold/60 animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Background Audit Icons */}
      <div className="absolute top-[10%] left-[10%] w-24 opacity-10 animate-spin" style={{ animationDuration: "20s" }}>
        <div className="text-white text-6xl">📋</div>
      </div>
      <div className="absolute bottom-[30%] right-[10%] w-20 opacity-10 animate-spin" style={{ animationDuration: "25s", animationDirection: "reverse" }}>
        <div className="text-white text-6xl">🔍</div>
      </div>

      {/* Login Content */}
      <div className="relative z-10 text-center max-w-2xl px-10 space-y-8 animate-in fade-in duration-1000">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-gold-light bg-clip-text text-transparent mb-6">
          INTERNAL AUDIT
        </h1>

        {/* BOC Logo */}
        <div className="w-44 h-44 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]">
          <img
            src="https://images.openai.com/thumbnails/url/cRMjYHicu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw6qCDV3DTdOyzaNLMly93FNNcuJKHU1Ny4Odi7OCTGIDIw3LShNM8o0qDKzqPAxTzfPtkwJiCyszPdTKwYAtxIo5Q"
            alt="Bank of Ceylon logo"
            className="w-4/5 h-4/5 object-contain drop-shadow-[0_0_5px_rgba(212,175,55,0.7)]"
          />
        </div>

        <p className="text-2xl text-gold-light font-semibold">Bankers to the Nation</p>
        <h2 className="text-3xl text-gold font-extrabold">Audit Management System</h2>

        <Button
          onClick={onLogin}
          size="lg"
          className="bg-gradient-to-r from-gold via-gold-rich to-gold-light text-black font-bold text-xl px-12 py-6 rounded-full shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:scale-110 hover:shadow-[0_12px_30px_rgba(212,175,55,0.6)] transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Start</span>
          <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400" />
        </Button>
      </div>
    </div>
  );
};
