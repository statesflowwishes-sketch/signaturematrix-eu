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

    // Initialize matrix waves with document generation theme
    const initializeWaves = () => {
      particlesRef.current = [];
      for (let i = 0; i < 70; i++) {
        particlesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          size: Math.random() * 3 + 1,
          speedY: Math.random() * -1.8 - 0.8,
          opacity: Math.random() * 0.5 + 0.1,
          phase: Math.random() * Math.PI * 2,
          color: '#00D2FF' // Document blue theme
        });
      }
    };

    // Initialize shooting stars with document processing colors
    const initializeStars = () => {
      starsRef.current = [];
      const colors = ['#FFD700', '#FF8A80', '#80CBC4', '#81C784', '#FFAB91', '#CE93D8'];
      
      for (let i = 0; i < 12; i++) {
        starsRef?.current?.push({
          x: -50,
          y: Math.random() * canvas?.height,
          speedX: Math.random() * 3 + 2,
          speedY: Math.random() * 1 - 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.9 + 0.4,
          trail: [],
          trailLength: 20,
          color: colors?.[Math.floor(Math.random() * colors?.length)]
        });
      }
    };

    const animate = (timestamp) => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Draw document generation matrix particles
      particlesRef?.current?.forEach((particle, index) => {
        // Update position with document flow pattern
        particle.y += particle?.speedY;
        particle.x += Math.sin(timestamp * 0.0007 + particle?.phase) * 1.2;

        // Reset particle if it goes off screen
        if (particle?.y < -20) {
          particle.y = canvas?.height + 20;
          particle.x = Math.random() * canvas?.width;
        }

        // Update opacity with document processing wave effect
        particle.opacity = 0.2 + Math.sin(timestamp * 0.0012 + particle?.phase) * 0.2;

        // Draw particle with enhanced document glow
        ctx?.save();
        ctx.globalAlpha = particle?.opacity;
        ctx.fillStyle = particle?.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle?.color;
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        
        // Add document processing pulse effect
        if (Math.sin(timestamp * 0.004 + particle?.phase) > 0.6) {
          ctx.strokeStyle = particle?.color;
          ctx.lineWidth = 1.5;
          ctx?.beginPath();
          ctx?.arc(particle?.x, particle?.y, particle?.size * 2.5, 0, Math.PI * 2);
          ctx?.stroke();
        }
        
        ctx?.restore();
      });

      // Draw document generation shooting stars
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

        // Draw enhanced trail with document colors
        star?.trail?.forEach((point, trailIndex) => {
          const trailOpacity = (trailIndex / star?.trail?.length) * star?.opacity * 0.7;
          const trailSize = (trailIndex / star?.trail?.length) * star?.size;
          
          ctx?.save();
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = star?.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = star?.color;
          ctx?.beginPath();
          ctx?.arc(point?.x, point?.y, trailSize, 0, Math.PI * 2);
          ctx?.fill();
          ctx?.restore();
        });

        // Draw main star with document generation effects
        ctx?.save();
        ctx.globalAlpha = star?.opacity;
        ctx.fillStyle = star?.color;
        ctx.shadowBlur = 25;
        ctx.shadowColor = star?.color;
        ctx?.beginPath();
        ctx?.arc(star?.x, star?.y, star?.size, 0, Math.PI * 2);
        ctx?.fill();
        
        // Add document sparkle effect
        ctx.strokeStyle = star?.color;
        ctx.lineWidth = 2;
        ctx?.beginPath();
        ctx?.moveTo(star?.x - star?.size * 3, star?.y);
        ctx?.lineTo(star?.x + star?.size * 3, star?.y);
        ctx?.moveTo(star?.x, star?.y - star?.size * 3);
        ctx?.lineTo(star?.x, star?.y + star?.size * 3);
        ctx?.stroke();
        
        // Add document processing animation
        const docRotation = timestamp * 0.003;
        ctx?.save();
        ctx?.translate(star?.x, star?.y);
        ctx?.rotate(docRotation);
        
        // Draw document-like shape
        ctx.fillStyle = star?.color;
        ctx?.fillRect(-star?.size * 1.5, -star?.size * 1.5, star?.size * 3, star?.size * 3);
        
        ctx?.restore();
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