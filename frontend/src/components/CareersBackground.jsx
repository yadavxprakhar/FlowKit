import React, { useEffect, useRef } from 'react';

const CareersBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Rising/ascending career milestones (upward movement)
    class AscendingNode {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 50;
        this.size = Math.random() * 2 + 1;
        // Upward floating speed
        this.speedY = -(Math.random() * 0.4 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.color = Math.random() > 0.4 ? '#8B4513' : '#20B2AA';
        this.growthFactor = Math.random() * 0.01;
      }

      update(mouse, scrollY) {
        // Drag scrolling affects rising speed (scrolling down pushes them upwards faster!)
        const scrollImpact = scrollY * 0.0008;
        this.y += this.speedY - scrollImpact;
        this.x += this.speedX;

        const scrollFactor = 0.12;
        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        // Mouse attraction/repulsion
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Guide nodes upwards towards mouse or float away
            this.x -= (dx / dist) * force * 1.0;
            this.y -= (dy / dist) * force * 1.0;
          }
        }

        if (this.y < -50) {
          this.reset();
        }
      }

      draw(scrollY) {
        const scrollFactor = 0.12;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color === '#8B4513' 
          ? `rgba(139, 69, 19, ${this.alpha})` 
          : `rgba(32, 178, 170, ${this.alpha})`;
        ctx.fill();

        ctx.restore();
      }
    }

    const nodes = [];
    const count = Math.floor((width * height) / 15000) + 10;
    for (let i = 0; i < count; i++) {
      nodes.push(new AscendingNode());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // Draw branching connecting vines/trees
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const n1ScrollFactor = 0.12;
          const n1DrawY = (n1.y - smoothScrollY * n1ScrollFactor + height * 10) % height;

          const n2ScrollFactor = 0.12;
          const n2DrawY = (n2.y - smoothScrollY * n2ScrollFactor + height * 10) % height;

          const dx = n1.x - n2.x;
          const dy = n1DrawY - n2DrawY;
          const dist = Math.hypot(dx, dy);

          // We draw diagonal branching connections suggesting growth trees
          if (dist < 130 && Math.abs(dx) < 80) {
            const alpha = (1 - dist / 130) * 0.14;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1DrawY);
            ctx.lineTo(n2.x, n2DrawY);
            ctx.strokeStyle = n1.color === '#8B4513'
              ? `rgba(139, 69, 19, ${alpha})`
              : `rgba(32, 178, 170, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw and update ascending nodes
      nodes.forEach((n) => {
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

export default CareersBackground;
