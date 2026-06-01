import React, { useEffect, useRef } from 'react';

const ContactBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 180 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Active signaling nodes
    class TransceiverNode {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.pulse = Math.random() * Math.PI;
        this.color = Math.random() > 0.5 ? '#8B4513' : '#20B2AA';
      }

      update(mouse, scrollY) {
        this.pulse += 0.02;

        const scrollFactor = 0.15;
        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.0;
            this.y -= (dy / dist) * force * 1.0;
          }
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(scrollY) {
        const scrollFactor = 0.15;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        const radius = this.size + Math.sin(this.pulse) * 1.5;

        // Draw pulsing outer ring
        ctx.beginPath();
        ctx.arc(this.x, drawY, radius * 2.2, 0, Math.PI * 2);
        ctx.strokeStyle = this.color === '#8B4513' ? 'rgba(139, 69, 19, 0.15)' : 'rgba(32, 178, 170, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Draw core node
        ctx.beginPath();
        ctx.arc(this.x, drawY, radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore();
      }
    }

    // Concentric expanding signal ripples on hover/click
    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.maxRadius = 150 + Math.random() * 100;
        this.speed = Math.random() * 2 + 1.5;
        this.alpha = 0.4;
      }

      update() {
        this.radius += this.speed;
        this.alpha = (1 - this.radius / this.maxRadius) * 0.4;
      }

      draw(scrollY) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(217, 119, 6, ${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const transceivers = [];
    const count = Math.floor((width * height) / 120000) + 5;
    for (let i = 0; i < count; i++) {
      transceivers.push(new TransceiverNode());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // 1. Draw connecting laser beams between nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < transceivers.length; i++) {
        for (let j = i + 1; j < transceivers.length; j++) {
          const t1 = transceivers[i];
          const t2 = transceivers[j];

          const t1ScrollFactor = 0.15;
          const t1DrawY = (t1.y - smoothScrollY * t1ScrollFactor + height * 10) % height;

          const t2ScrollFactor = 0.15;
          const t2DrawY = (t2.y - smoothScrollY * t2ScrollFactor + height * 10) % height;

          const dx = t1.x - t2.x;
          const dy = t1DrawY - t2DrawY;
          const dist = Math.hypot(dx, dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.12;
            ctx.beginPath();
            ctx.moveTo(t1.x, t1DrawY);
            ctx.lineTo(t2.x, t2DrawY);
            ctx.strokeStyle = t1.color === '#8B4513' 
              ? `rgba(139, 69, 19, ${alpha})` 
              : `rgba(32, 178, 170, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // 2. Draw Ripples
      ripplesRef.current.forEach((r, idx) => {
        r.update();
        r.draw(smoothScrollY);
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripplesRef.current.splice(idx, 1);
        }
      });

      // 3. Draw Nodes
      transceivers.forEach((t) => {
        t.update(mouseRef.current, smoothScrollY);
        t.draw(smoothScrollY);
      });

      // Randomly spawn background signal ripples
      if (Math.random() < 0.015 && ripplesRef.current.length < 5) {
        ripplesRef.current.push(new Ripple(Math.random() * width, Math.random() * height));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Spawn signal ripple on mouse motion occasionally
      if (Math.random() < 0.04) {
        ripplesRef.current.push(new Ripple(e.clientX, e.clientY));
      }
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

export default ContactBackground;
