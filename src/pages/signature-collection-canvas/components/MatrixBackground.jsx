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

    // Initialize waves
    const initWaves = () => {
      wavesRef.current = [];
      for (let i = 0; i < 8; i++) {
        wavesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: canvas?.height + Math.random() * 200,
          size: Math.random() * 40 + 20,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize shooting stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 5; i++) {
        starsRef?.current?.push({
          x: -50,
          y: Math.random() * canvas?.height * 0.6,
          speed: Math.random() * 3 + 2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          trail: []
        });
      }
    };

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw matrix waves
      wavesRef?.current?.forEach((wave, index) => {
        ctx?.save();
        ctx.globalAlpha = wave?.opacity;
        
        // Create gradient for wave
        const gradient = ctx?.createRadialGradient(
          wave?.x, wave?.y, 0,
          wave?.x, wave?.y, wave?.size
        );
        gradient?.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
        gradient?.addColorStop(1, 'rgba(0, 255, 136, 0)');
        
        ctx.fillStyle = gradient;
        ctx?.beginPath();
        ctx?.arc(wave?.x, wave?.y, wave?.size, 0, Math.PI * 2);
        ctx?.fill();
        
        // Add wave effect
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.lineWidth = 2;
        ctx?.beginPath();
        ctx?.arc(wave?.x, wave?.y, wave?.size + Math.sin(wave?.phase) * 10, 0, Math.PI * 2);
        ctx?.stroke();
        
        ctx?.restore();

        // Update wave position
        wave.y -= wave?.speed;
        wave.phase += 0.05;
        wave.x += Math.sin(wave?.phase) * 0.5;

        // Reset wave when it goes off screen
        if (wave?.y < -wave?.size) {
          wave.y = canvas?.height + wave?.size;
          wave.x = Math.random() * canvas?.width;
        }
      });

      // Draw shooting stars
      starsRef?.current?.forEach((star, index) => {
        ctx?.save();
        ctx.globalAlpha = star?.opacity;

        // Add current position to trail
        star?.trail?.push({ x: star?.x, y: star?.y });
        if (star?.trail?.length > 15) {
          star?.trail?.shift();
        }

        // Draw trail
        star?.trail?.forEach((point, i) => {
          const trailOpacity = (i / star?.trail?.length) * star?.opacity;
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = '#FFD700';
          ctx?.beginPath();
          ctx?.arc(point?.x, point?.y, star?.size * (i / star?.trail?.length), 0, Math.PI * 2);
          ctx?.fill();
        });

        // Draw main star
        ctx.globalAlpha = star?.opacity;
        const starGradient = ctx?.createRadialGradient(
          star?.x, star?.y, 0,
          star?.x, star?.y, star?.size * 3
        );
        starGradient?.addColorStop(0, '#FFD700');
        starGradient?.addColorStop(0.5, 'rgba(255, 215, 0, 0.5)');
        starGradient?.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.fillStyle = starGradient;
        ctx?.beginPath();
        ctx?.arc(star?.x, star?.y, star?.size * 3, 0, Math.PI * 2);
        ctx?.fill();

        ctx?.restore();

        // Update star position
        star.x += star?.speed;
        star.y += Math.sin(star?.x * 0.01) * 0.5;

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
      style={{ background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #0F0F1A 100%)' }}
    />
  );
};

export default MatrixBackground;