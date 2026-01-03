import React, { useRef, useEffect, useState } from 'react';

interface Props {
  meltingPoint: number;
  boilingPoint: number;
  color: string;
}

const PhaseSimulator: React.FC<Props> = ({ meltingPoint, boilingPoint, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(298); // Standard temp Kelvin
  const [phase, setPhase] = useState("Solid");

  // Determine current phase label
  useEffect(() => {
    if (temperature < meltingPoint) setPhase("Solid");
    else if (temperature < boilingPoint) setPhase("Liquid");
    else setPhase("Gas");
  }, [temperature, meltingPoint, boilingPoint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simulation Config
    const particleCount = 100;
    const particles: { x: number; y: number; vx: number; vy: number; homeX: number; homeY: number }[] = [];
    
    // Init Grid for Solid State
    const cols = 10;
    const spacing = canvas.width / cols;
    
    for (let i = 0; i < particleCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      particles.push({
        x: col * spacing + spacing/2,
        y: row * spacing + spacing/2,
        vx: 0,
        vy: 0,
        homeX: col * spacing + spacing/2,
        homeY: row * spacing + spacing/2
      });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      
      // Physics factors based on Temp vs Phase Points
      const isSolid = temperature < meltingPoint;
      const isGas = temperature > boilingPoint;
      
      // Calculate energy factor (0 to 1 scale roughly within phases)
      const energy = temperature / 4000; 

      particles.forEach(p => {
        if (isSolid) {
          // Solid: Tether to grid, vibrate based on temp
          const vibration = (temperature / meltingPoint) * 2;
          p.x = p.homeX + (Math.random() - 0.5) * vibration;
          p.y = p.homeY + (Math.random() - 0.5) * vibration;
        } else if (isGas) {
          // Gas: High velocity, bounce off walls
          const speed = (temperature - boilingPoint) / 100 + 2;
          p.x += p.vx || (Math.random() - 0.5) * speed;
          p.y += p.vy || (Math.random() - 0.5) * speed;
          
          if (!p.vx) p.vx = (Math.random() - 0.5) * speed;
          if (!p.vy) p.vy = (Math.random() - 0.5) * speed;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        } else {
          // Liquid: Flow, gravity, loose cohesion
          const flow = ((temperature - meltingPoint) / (boilingPoint - meltingPoint)) * 2;
          p.y += 1; // Gravity
          p.x += (Math.random() - 0.5) * flow;
          
          if (p.y > canvas.height) p.y = 0; // Wrap around for flow effect
        }

        // Draw Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, isGas ? 2 : 6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [temperature, meltingPoint, boilingPoint, color]);

  return (
    <div className="bg-gray-900/50 rounded-3xl p-6 border border-white/10 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
           <h3 className="text-white font-bold text-lg flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/> Phase Simulator
           </h3>
           <p className="text-gray-400 text-sm">State: <span className="text-white font-bold">{phase}</span></p>
        </div>
        <div className="text-right">
           <p className="text-2xl font-mono font-bold text-orange-400">{temperature} K</p>
        </div>
      </div>

      <div className="relative w-full h-48 bg-black/40 rounded-xl overflow-hidden mb-6 border border-white/5 shadow-inner">
        <canvas ref={canvasRef} width={300} height={192} className="w-full h-full opacity-80" />
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 font-mono">
            MP: {meltingPoint}K | BP: {boilingPoint}K
        </div>
      </div>

      <div className="relative pt-6 pb-2">
        <input
          type="range"
          min="0"
          max="4000"
          step="10"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-lg appearance-none cursor-pointer"
        />
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            margin-top: -6px;
          }
        `}</style>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">Slide to change Temperature</p>
    </div>
  );
};

export default PhaseSimulator;
