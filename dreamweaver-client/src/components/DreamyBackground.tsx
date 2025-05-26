import React, { useEffect, useRef } from 'react';

const DreamyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    let gradientOffset = 0;
    
    const drawBackground = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(
        0, 0, 
        canvas.width, canvas.height
      );
      
      // Deep space colors with animation
      const t = (Date.now() / 20000) + gradientOffset;
      gradient.addColorStop(0, `rgba(74, 29, 150, ${0.8 + Math.sin(t) * 0.2})`); // Deep purple
      gradient.addColorStop(0.3, `rgba(30, 58, 138, ${0.8 + Math.cos(t) * 0.2})`); // Nebula blue
      gradient.addColorStop(0.6, `rgba(219, 39, 119, ${0.7 + Math.sin(t + 1) * 0.2})`); // Starlight pink
      gradient.addColorStop(1, `rgba(74, 29, 150, ${0.8 + Math.cos(t + 2) * 0.2})`); // Back to purple
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some stars/particles
      const numStars = 100;
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random() * 0.8 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      gradientOffset += 0.001;
      requestAnimationFrame(drawBackground);
    };
    
    drawBackground();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default DreamyBackground;