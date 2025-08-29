import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const wavesRef = useRef([]);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize waves with reduced intensity for data focus
    const initWaves = () => {
      wavesRef.current = [];
      for (let i = 0; i < 6; i++) { // Reduced from 8
        wavesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: canvas?.height + Math.random() * 200,
          size: Math.random() * 30 + 15, // Smaller waves
          speed: Math.random() * 1.5 + 0.8, // Slower movement
          opacity: Math.random() * 0.15 + 0.05, // Lower opacity
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize shooting stars with reduced frequency
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 3; i++) { // Reduced from 5
        starsRef?.current?.push({
          x: -50,
          y: Math.random() * canvas?.height * 0.6,
          speed: Math.random() * 2 + 1.5, // Slightly slower
          size: Math.random() * 1.5 + 0.8, // Smaller stars
          opacity: Math.random() * 0.6 + 0.2, // Lower opacity
          trail: []
        });
      }
    };

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw matrix waves with reduced intensity
      wavesRef?.current?.forEach((wave, index) => {
        ctx?.save();
        ctx.globalAlpha = wave?.opacity * 0.7; // Further reduced opacity
        
        // Create gradient for wave
        const gradient = ctx?.createRadialGradient(
          wave?.x, wave?.y, 0,
          wave?.x, wave?.y, wave?.size
        );
        gradient?.addColorStop(0, 'rgba(0, 255, 136, 0.2)'); // Reduced intensity
        gradient?.addColorStop(1, 'rgba(0, 255, 136, 0)');
        
        ctx.fillStyle = gradient;
        ctx?.beginPath();
        ctx?.arc(wave?.x, wave?.y, wave?.size, 0, Math.PI * 2);
        ctx?.fill();
        
        // Add subtle wave effect
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)'; // Very subtle
        ctx.lineWidth = 1;
        ctx?.beginPath();
        ctx?.arc(wave?.x, wave?.y, wave?.size + Math.sin(wave?.phase) * 8, 0, Math.PI * 2);
        ctx?.stroke();
        
        ctx?.restore();

        // Update wave position
        wave.y -= wave?.speed;
        wave.phase += 0.03; // Slower phase change
        wave.x += Math.sin(wave?.phase) * 0.3;

        // Reset wave when it goes off screen
        if (wave?.y < -wave?.size) {
          wave.y = canvas?.height + wave?.size;
          wave.x = Math.random() * canvas?.width;
        }
      });

      // Draw shooting stars with reduced intensity
      starsRef?.current?.forEach((star, index) => {
        ctx?.save();
        ctx.globalAlpha = star?.opacity * 0.8; // Reduced opacity

        // Add current position to trail
        star?.trail?.push({ x: star?.x, y: star?.y });
        if (star?.trail?.length > 10) { // Shorter trail
          star?.trail?.shift();
        }

        // Draw trail
        star?.trail?.forEach((point, i) => {
          const trailOpacity = (i / star?.trail?.length) * star?.opacity * 0.6;
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = 'rgba(255, 215, 0, 0.8)'; // Softer gold
          ctx?.beginPath();
          ctx?.arc(point?.x, point?.y, star?.size * (i / star?.trail?.length), 0, Math.PI * 2);
          ctx?.fill();
        });

        // Draw main star
        ctx.globalAlpha = star?.opacity * 0.8;
        const starGradient = ctx?.createRadialGradient(
          star?.x, star?.y, 0,
          star?.x, star?.y, star?.size * 2.5
        );
        starGradient?.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
        starGradient?.addColorStop(0.5, 'rgba(255, 215, 0, 0.4)');
        starGradient?.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.fillStyle = starGradient;
        ctx?.beginPath();
        ctx?.arc(star?.x, star?.y, star?.size * 2.5, 0, Math.PI * 2);
        ctx?.fill();

        ctx?.restore();

        // Update star position
        star.x += star?.speed;
        star.y += Math.sin(star?.x * 0.008) * 0.4;

        // Reset star when it goes off screen
        if (star?.x > canvas?.width + 50) {
          star.x = -50;
          star.y = Math.random() * canvas?.height * 0.6;
          star.trail = [];
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initWaves();
    initStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initWaves();
      initStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 30%, #0F0F1A 70%, #16213E 100%)'
      }}
    />
  );
};

export default MatrixBackground;