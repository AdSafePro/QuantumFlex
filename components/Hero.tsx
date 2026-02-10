
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe, Cpu, Bitcoin, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { APP_VERSION } from '../constants';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ m: 14, s: 59 });
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Urgency timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s === 0) {
          if (prev.m === 0) return prev;
          return { m: prev.m - 1, s: 59 };
        }
        return { ...prev, s: prev.s - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Neural Network Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = width < 768 ? 40 : 80; // Fewer particles on mobile

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
      }

      update(mouse: {x: number, y: number}) {
        // Basic movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction (Dispersal)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * 5;
          const directionY = forceDirectionY * force * 5;

          this.x -= directionX;
          this.y -= directionY;
        } 
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections first
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${1 - distance / 120})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(p => {
        p.update(mousePos);
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mousePos]);

  // Track mouse for canvas interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-20"
      onMouseMove={handleMouseMove}
    >
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      />
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-quantum-900/90 via-quantum-900/80 to-black pointer-events-none"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-center md:text-left pt-6 md:pt-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-accent/10 border border-quantum-accent/30 text-quantum-accent text-sm font-bold mb-8 animate-fade-in-up backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-quantum-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-quantum-accent"></span>
            </span>
            Sistema V{APP_VERSION} Ahora Activo
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 tracking-tight leading-tight animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            Arbitraje Cripto <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-quantum-accent via-white to-purple-500 neon-text">
              Sin Riesgo Humano
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light animate-fade-in-up drop-shadow-md" style={{ animationDelay: '0.3s' }}>
            Nuestros bots analizan 50+ exchanges por milisegundo para encontrar ineficiencias de precio y ejecutar ganancias instantáneas.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => navigate('/register')}
              className="group relative px-8 py-4 bg-quantum-accent text-quantum-900 text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.4)] cursor-pointer z-20"
            >
              <div className="absolute inset-0 w-full h-full bg-white/30 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 origin-left"></div>
              <span className="relative flex items-center gap-2">
                INVERTIR AHORA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <div className="flex flex-col items-start bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
              <span className="text-sm text-gray-400">Oferta termina en:</span>
              <div className="font-mono text-2xl font-bold text-quantum-danger">
                00:{timeLeft.m.toString().padStart(2, '0')}:{timeLeft.s.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Visuals */}
        <div className="flex-1 w-full max-w-md md:max-w-full relative h-[400px] md:h-[500px] flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {/* Central AI Brain */}
          <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 bg-black/50 backdrop-blur-md rounded-full border-2 border-quantum-accent shadow-[0_0_50px_rgba(6,182,212,0.5)] flex items-center justify-center animate-pulse-fast">
            <Cpu size={64} className="text-quantum-accent" />
            <div className="absolute inset-0 border border-quantum-accent/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '10s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 bg-black/80 p-3 rounded-full border border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)] z-20">
               <Bitcoin className="text-orange-500" size={32} />
            </div>
          </div>

          <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
             <div className="absolute bottom-10 left-10 bg-black/80 p-3 rounded-full border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] transform rotate-45 z-20">
               <Coins className="text-purple-500" size={28} />
               <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-purple-400">ETH</span>
            </div>
          </div>

          <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '8s' }}>
             <div className="absolute top-1/2 right-0 transform translate-x-8 bg-black/80 p-3 rounded-full border border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] z-20">
               <span className="font-bold text-green-500">USDT</span>
            </div>
          </div>

          {/* Connection Lines (Visual CSS) */}
          <div className="absolute inset-0 rounded-full border border-white/5 w-[80%] h-[80%] top-[10%] left-[10%] animate-spin" style={{ animationDuration: '20s', borderStyle: 'dashed' }}></div>
          <div className="absolute inset-0 rounded-full border border-quantum-accent/10 w-[120%] h-[120%] -top-[10%] -left-[10%] animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse', borderStyle: 'dotted' }}></div>
        </div>
      </div>

      {/* Bottom Features Overlay */}
      <div className="absolute bottom-0 w-full glass-panel border-t border-white/10 z-30">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-quantum-gold/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-quantum-gold" />
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-quantum-gold transition-colors">Velocidad Cuántica</h3>
                <p className="text-xs text-gray-400">Ejecución en nanosegundos</p>
              </div>
           </div>
           <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-quantum-success/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 text-quantum-success" />
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-quantum-success transition-colors">Capital Asegurado</h3>
                <p className="text-xs text-gray-400">Fondo de garantía SAFU</p>
              </div>
           </div>
           <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-purple-500/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">Cobertura Global</h3>
                <p className="text-xs text-gray-400">Arbitraje multi-regional</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
