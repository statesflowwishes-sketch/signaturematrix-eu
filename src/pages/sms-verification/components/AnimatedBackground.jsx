import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
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

    // Initialize matrix wave particles
    const initMatrixWaves = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: canvas?.height + Math.random() * 200,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    // Initialize shooting stars
    const initShootingStars = () => {
      starsRef.current = [];
      for (let i = 0; i < 8; i++) {
        starsRef?.current?.push({
          x: -50,
          y: Math.random() * canvas?.height * 0.6,
          speed: Math.random() * 3 + 2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          trail: [],
          delay: Math.random() * 5000
        });
      }
    };

    const animate = (timestamp) => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Animate matrix wave particles (bottom to top)
      particlesRef?.current?.forEach((particle, index) => {
        // Update position
        particle.y -= particle?.speed;
        particle.x += Math.sin(particle?.phase + timestamp * 0.001) * 0.5;
        particle.phase += 0.02;

        // Reset particle when it goes off screen
        if (particle?.y < -50) {
          particle.y = canvas?.height + 50;
          particle.x = Math.random() * canvas?.width;
        }

        // Draw particle with matrix green glow
        ctx?.save();
        ctx.globalAlpha = particle?.opacity;
        ctx.fillStyle = '#00FF88';
        ctx.shadowColor = '#00FF88';
        ctx.shadowBlur = 10;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();
      });

      // Animate shooting stars (left to right)
      starsRef?.current?.forEach((star, index) => {
        if (timestamp < star?.delay) return;

        // Update position
        star.x += star?.speed;

        // Add to trail
        star?.trail?.push({ x: star?.x, y: star?.y, opacity: star?.opacity });
        if (star?.trail?.length > 15) {
          star?.trail?.shift();
        }

        // Reset star when it goes off screen
        if (star?.x > canvas?.width + 100) {
          star.x = -50;
          star.y = Math.random() * canvas?.height * 0.6;
          star.trail = [];
          star.delay = timestamp + Math.random() * 3000 + 1000;
        }

        // Draw trail
        star?.trail?.forEach((point, trailIndex) => {
          const trailOpacity = (trailIndex / star?.trail?.length) * point?.opacity * 0.6;
          const trailSize = star?.size * (trailIndex / star?.trail?.length);
          
          ctx?.save();
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = '#FFD700';
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 8;
          ctx?.beginPath();
          ctx?.arc(point?.x, point?.y, trailSize, 0, Math.PI * 2);
          ctx?.fill();
          ctx?.restore();
        });

        // Draw main star
        ctx?.save();
        ctx.globalAlpha = star?.opacity;
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
        ctx?.beginPath();
        ctx?.arc(star?.x, star?.y, star?.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    initMatrixWaves();
    initShootingStars();
    animate(0);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initMatrixWaves();
      initShootingStars();
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

export default AnimatedBackground;