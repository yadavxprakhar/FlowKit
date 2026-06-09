import React, { useEffect, useRef } from 'react';

const LegalBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 160 });
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Floating Trust/Security Nodes (Checkmarks, Keys, Shields metaphor)
    class LegalNode {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 18 + 12; // Increased size (12 to 30px)
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.003;
        this.alpha = Math.random() * 0.15 + 0.08; // Increased opacity (0.08 to 0.23)
        this.color = Math.random() > 0.5 ? '#8B4513' : '#20B2AA';
        this.type = Math.random() > 0.5 ? 'shield' : 'circle';
      }

      update(mouse, scrollY) {
        this.rotation += this.rotationSpeed;

        const scrollFactor = 0.1;
        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Repelled by mouse gently
            this.x -= (dx / dist) * force * 1.2;
            this.y -= (dy / dist) * force * 1.2;
          }
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -this.size * 2) this.x = width + this.size * 2;
        if (this.x > width + this.size * 2) this.x = -this.size * 2;
        if (this.y < -this.size * 2) this.y = height + this.size * 2;
        if (this.y > height + this.size * 2) this.y = -this.size * 2;
      }

      draw(scrollY) {
        const scrollFactor = 0.1;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.save();
        ctx.translate(this.x, drawY);
        ctx.rotate(this.rotation);
        
        // Add shadow glow for premium contrast
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        ctx.strokeStyle = this.color === '#8B4513'
          ? `rgba(139, 69, 19, ${this.alpha})`
          : `rgba(32, 178, 170, ${this.alpha})`;
        ctx.lineWidth = 1.2;

        if (this.type === 'shield') {
          // Draw mini pointed secure shield shape
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size * 0.8, -this.size * 0.4);
          ctx.lineTo(this.size * 0.8, this.size * 0.4);
          ctx.lineTo(0, this.size);
          ctx.lineTo(-this.size * 0.8, this.size * 0.4);
          ctx.lineTo(-this.size * 0.8, -this.size * 0.4);
          ctx.closePath();
          ctx.stroke();
        } else {
          // Draw Concentric safety targets
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = this.color === '#8B4513'
            ? `rgba(139, 69, 19, ${this.alpha * 0.5})`
            : `rgba(32, 178, 170, ${this.alpha * 0.5})`;
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // Concentric orbital safety ripples
    class SafetyRipple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 200 + 50;
        this.maxRadius = this.radius + 200;
        this.speed = Math.random() * 0.4 + 0.2;
        this.alpha = Math.random() * 0.12 + 0.06; // Increased opacity (0.06 to 0.18)
        this.color = Math.random() > 0.5 ? '#8B4513' : '#20B2AA';
      }

      update() {
        this.radius += this.speed;
        if (this.radius > this.maxRadius) {
          this.radius = 50;
        }
      }

      draw(scrollY) {
        const scrollFactor = 0.05;
        const drawY = this.y - scrollY * scrollFactor;

        ctx.save();
        
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, drawY, this.radius, 0, Math.PI * 2);
        
        const currentAlpha = this.alpha * (1 - (this.radius - 50) / (this.maxRadius - 50));
        ctx.strokeStyle = this.color === '#8B4513'
          ? `rgba(139, 69, 19, ${currentAlpha})`
          : `rgba(32, 178, 170, ${currentAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }
    }

    const nodes = [];
    const nodeCount = Math.floor((width * height) / 100000) + 6; // Increased density
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new LegalNode());
    }

    const ripples = [
      new SafetyRipple(width * 0.15, height * 0.25),
      new SafetyRipple(width * 0.85, height * 0.75),
      new SafetyRipple(width * 0.5, height * 0.5) // Added a third ripple for more coverage
    ];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // Draw and update ripples
      ripples.forEach(r => {
        r.update();
        r.draw(smoothScrollY);
      });

      // Draw and update legal nodes
      nodes.forEach(n => {
        n.update(mouseRef.current, smoothScrollY);
        n.draw(smoothScrollY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const handleScroll = () => {
      scrollRef.current.target = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none block z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default LegalBackground;
