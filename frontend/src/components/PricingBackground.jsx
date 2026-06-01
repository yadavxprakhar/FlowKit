import React, { useEffect, useRef } from 'react';

const PricingBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 180 });
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Floating premium gems/shapes (faceted shields representing security and support)
    class ShieldNode {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 20 + 15;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.003;
        this.alpha = Math.random() * 0.12 + 0.04;
        this.color = Math.random() > 0.5 ? '#8B4513' : '#20B2AA';
        this.pulse = Math.random() * Math.PI;
      }

      update(mouse, scrollY) {
        this.rotation += this.rotationSpeed;
        this.pulse += 0.005;

        const scrollFactor = 0.15;
        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 0.9;
            this.y -= (dy / dist) * force * 0.9;
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
        const scrollFactor = 0.15;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.save();
        ctx.translate(this.x, drawY);
        ctx.rotate(this.rotation);

        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.strokeStyle = this.color === '#8B4513' 
          ? `rgba(139, 69, 19, ${this.alpha + 0.04})` 
          : `rgba(32, 178, 170, ${this.alpha + 0.04})`;
        ctx.lineWidth = 1;

        const size = this.size + Math.sin(this.pulse) * 1.5;

        // Draw a shield outline (pointed polygon)
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.86, -size * 0.5);
        ctx.lineTo(size * 0.86, size * 0.4);
        ctx.lineTo(0, size);
        ctx.lineTo(-size * 0.86, size * 0.4);
        ctx.lineTo(-size * 0.86, -size * 0.5);
        ctx.closePath();
        ctx.stroke();

        // Draw central cross ribs inside shield
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.moveTo(-size * 0.86, -0.05 * size);
        ctx.lineTo(size * 0.86, -0.05 * size);
        ctx.stroke();

        ctx.restore();
      }
    }

    const shields = [];
    const count = Math.floor((width * height) / 160000) + 4;
    for (let i = 0; i < count; i++) {
      shields.push(new ShieldNode());
    }

    // Concentric protective safety rings/waves
    class SafetyRing {
      constructor() {
        this.radius = Math.random() * width * 0.3 + 100;
        this.speed = Math.random() * 0.1 + 0.05;
        this.color = Math.random() > 0.5 ? '#8B4513' : '#20B2AA';
      }

      draw(scrollY) {
        ctx.save();
        const scrollFactor = 0.06;
        const currentCenterY = height * 0.5 - scrollY * scrollFactor;

        ctx.beginPath();
        ctx.arc(width * 0.5, currentCenterY, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color === '#8B4513' ? 'rgba(139, 69, 19, 0.03)' : 'rgba(32, 178, 170, 0.03)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }
    }

    const rings = [new SafetyRing(), new SafetyRing(), new SafetyRing()];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // 1. Draw concentric protective safety rings
      rings.forEach((r) => {
        r.draw(smoothScrollY);
      });

      // 2. Draw and update shield nodes
      shields.forEach((s) => {
        s.update(mouseRef.current, smoothScrollY);
        s.draw(smoothScrollY);
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

export default PricingBackground;
