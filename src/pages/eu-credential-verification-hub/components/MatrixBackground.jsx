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

    // Initialize matrix waves with EU credential theme colors
    const initializeWaves = () => {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        particlesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          size: Math.random() * 3 + 1,
          speedY: Math.random() * -1.5 - 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          phase: Math.random() * Math.PI * 2,
          color: '#0080FF' // EU blue theme
        });
      }
    };

    // Initialize shooting stars with credential validation colors
    const initializeStars = () => {
      starsRef.current = [];
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
      
      for (let i = 0; i < 10; i++) {
        starsRef?.current?.push({
          x: -50,
          y: Math.random() * canvas?.height,
          speedX: Math.random() * 2.5 + 1.5,
          speedY: Math.random() * 0.8 - 0.4,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.9 + 0.3,
          trail: [],
          trailLength: 18,
          color: colors?.[Math.floor(Math.random() * colors?.length)]
        });
      }
    };

    const animate = (timestamp) => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw enhanced matrix wave particles
      particlesRef?.current?.forEach((particle, index) => {
        // Update position with more complex movement
        particle.y += particle?.speedY;
        particle.x += Math.sin(timestamp * 0.0008 + particle?.phase) * 0.8;

        // Reset particle if it goes off screen
        if (particle?.y < -15) {
          particle.y = canvas?.height + 15;
          particle.x = Math.random() * canvas?.width;
        }

        // Update opacity with credential validation wave effect
        particle.opacity = 0.15 + Math.sin(timestamp * 0.0015 + particle?.phase) * 0.15;

        // Draw particle with EU credential glow
        ctx?.save();
        ctx.globalAlpha = particle?.opacity;
        ctx.fillStyle = particle?.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = particle?.color;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        
        // Add validation pulse effect
        if (Math.sin(timestamp * 0.003 + particle?.phase) > 0.7) {
          ctx.strokeStyle = particle?.color;
          ctx.lineWidth = 1;
          ctx?.beginPath();
          ctx?.arc(particle?.x, particle?.y, particle?.size * 2, 0, Math.PI * 2);
          ctx?.stroke();
        }
        
        ctx?.restore();
      });

      // Draw credential validation shooting stars
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

        // Draw enhanced trail with credential colors
        star?.trail?.forEach((point, trailIndex) => {
          const trailOpacity = (trailIndex / star?.trail?.length) * star?.opacity * 0.6;
          const trailSize = (trailIndex / star?.trail?.length) * star?.size;
          
          ctx?.save();
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = star?.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = star?.color;
          ctx?.beginPath();
          ctx?.arc(point?.x, point?.y, trailSize, 0, Math.PI * 2);
          ctx?.fill();
          ctx?.restore();
        });

        // Draw main star with enhanced credential validation effect
        ctx?.save();
        ctx.globalAlpha = star?.opacity;
        ctx.fillStyle = star?.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = star?.color;
        ctx?.beginPath();
        ctx?.arc(star?.x, star?.y, star?.size, 0, Math.PI * 2);
        ctx?.fill();
        
        // Add credential validation sparkle effect
        ctx.strokeStyle = star?.color;
        ctx.lineWidth = 1.5;
        ctx?.beginPath();
        ctx?.moveTo(star?.x - star?.size * 2.5, star?.y);
        ctx?.lineTo(star?.x + star?.size * 2.5, star?.y);
        ctx?.moveTo(star?.x, star?.y - star?.size * 2.5);
        ctx?.lineTo(star?.x, star?.y + star?.size * 2.5);
        ctx?.stroke();
        
        // Add rotating validation symbol
        const rotation = timestamp * 0.002;
        ctx?.rotate(rotation);
        ctx?.beginPath();
        ctx?.moveTo(star?.x - star?.size * 1.5, star?.y - star?.size * 1.5);
        ctx?.lineTo(star?.x + star?.size * 1.5, star?.y + star?.size * 1.5);
        ctx?.moveTo(star?.x + star?.size * 1.5, star?.y - star?.size * 1.5);
        ctx?.lineTo(star?.x - star?.size * 1.5, star?.y + star?.size * 1.5);
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