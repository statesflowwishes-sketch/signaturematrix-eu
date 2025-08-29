import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
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

    // Initialize matrix waves
    const initializeWaves = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          size: Math.random() * 3 + 1,
          speedY: Math.random() * -2 - 1,
          opacity: Math.random() * 0.3 + 0.1,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize shooting stars
    const initializeStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 8; i++) {
        starsRef?.current?.push({
          x: -50,
          y: Math.random() * canvas?.height,
          speedX: Math.random() * 3 + 2,
          speedY: Math.random() * 1 - 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          trail: [],
          trailLength: 15
        });
      }
    };

    const animate = (timestamp) => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw matrix wave particles
      particlesRef?.current?.forEach((particle, index) => {
        // Update position
        particle.y += particle?.speedY;
        particle.x += Math.sin(timestamp * 0.001 + particle?.phase) * 0.5;

        // Reset particle if it goes off screen
        if (particle?.y < -10) {
          particle.y = canvas?.height + 10;
          particle.x = Math.random() * canvas?.width;
        }

        // Update opacity with wave effect
        particle.opacity = 0.1 + Math.sin(timestamp * 0.002 + particle?.phase) * 0.1;

        // Draw particle
        ctx?.save();
        ctx.globalAlpha = particle?.opacity;
        ctx.fillStyle = '#00FF88';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00FF88';
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();
      });

      // Draw shooting stars
      starsRef?.current?.forEach((star, index) => {
        // Update position
        star.x += star?.speedX;
        star.y += star?.speedY;

        // Add current position to trail
        star?.trail?.push({ x: star?.x, y: star?.y });
        if (star?.trail?.length > star?.trailLength) {
          star?.trail?.shift();
        }

        // Reset star if it goes off screen
        if (star?.x > canvas?.width + 50) {
          star.x = -50;
          star.y = Math.random() * canvas?.height;
          star.trail = [];
        }

        // Draw trail
        star?.trail?.forEach((point, trailIndex) => {
          const trailOpacity = (trailIndex / star?.trail?.length) * star?.opacity * 0.5;
          const trailSize = (trailIndex / star?.trail?.length) * star?.size;
          
          ctx?.save();
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = '#FFD700';
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#FFD700';
          ctx?.beginPath();
          ctx?.arc(point?.x, point?.y, trailSize, 0, Math.PI * 2);
          ctx?.fill();
          ctx?.restore();
        });

        // Draw main star
        ctx?.save();
        ctx.globalAlpha = star?.opacity;
        ctx.fillStyle = '#FFD700';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFD700';
        ctx?.beginPath();
        ctx?.arc(star?.x, star?.y, star?.size, 0, Math.PI * 2);
        ctx?.fill();
        
        // Add sparkle effect
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 1;
        ctx?.beginPath();
        ctx?.moveTo(star?.x - star?.size * 2, star?.y);
        ctx?.lineTo(star?.x + star?.size * 2, star?.y);
        ctx?.moveTo(star?.x, star?.y - star?.size * 2);
        ctx?.lineTo(star?.x, star?.y + star?.size * 2);
        ctx?.stroke();
        ctx?.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initializeWaves();
    initializeStars();
    animate(0);

    const handleResize = () => {
      resizeCanvas();
      initializeWaves();
      initializeStars();
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default MatrixBackground;