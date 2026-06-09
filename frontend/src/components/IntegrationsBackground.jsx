import React, { useEffect, useRef } from 'react';

const IntegrationsBackground = () => {
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

    // Connected Integration Hubs
    class HubNode {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 8 + 6; // Main hub size
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
        this.alpha = Math.random() * 0.15 + 0.05;
        this.color = Math.random() > 0.5 ? '#8B4513' : '#20B2AA'; // Coffee and teal
        
        // Orbital satellite properties
        this.satellites = [];
        const satCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < satCount; i++) {
          this.satellites.push({
            angle: Math.random() * Math.PI * 2,
            speed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
            distance: Math.random() * 20 + 15,
            size: Math.random() * 2 + 1
          });
        }
      }

      update(mouse, scrollY) {
        // Update satellites
        this.satellites.forEach(sat => {
          sat.angle += sat.speed;
        });

        const scrollFactor = 0.12;
        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Attracted to mouse representing connection
            this.x += (dx / dist) * force * 0.8;
            this.y += (dy / dist) * force * 0.8;
          }
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap boundaries
        if (this.x < -40) this.x = width + 40;
        if (this.x > width + 40) this.x = -40;
        if (this.y < -40) this.y = height + 40;
        if (this.y > height + 40) this.y = -40;
      }

      draw(scrollY) {
        const scrollFactor = 0.12;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;

        // 1. Draw connections to satellites
        this.satellites.forEach(sat => {
          const satX = this.x + Math.cos(sat.angle) * sat.distance;
          const satY = drawY + Math.sin(sat.angle) * sat.distance;

          ctx.beginPath();
          ctx.moveTo(this.x, drawY);
          ctx.lineTo(satX, satY);
          ctx.strokeStyle = this.color === '#8B4513'
            ? `rgba(139, 69, 19, ${this.alpha * 0.4})`
            : `rgba(32, 178, 170, ${this.alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Draw satellite node
          ctx.beginPath();
          ctx.arc(satX, satY, sat.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color === '#8B4513'
            ? `rgba(139, 69, 19, ${this.alpha * 2})`
            : `rgba(32, 178, 170, ${this.alpha * 2})`;
          ctx.fill();
        });

        // 2. Draw central hub (outer ring + solid core)
        ctx.beginPath();
        ctx.arc(this.x, drawY, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color === '#8B4513'
          ? `rgba(139, 69, 19, ${this.alpha})`
          : `rgba(32, 178, 170, ${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, drawY, this.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = this.color === '#8B4513'
          ? `rgba(217, 119, 6, ${this.alpha * 1.5})`
          : `rgba(45, 212, 191, ${this.alpha * 1.5})`;
        ctx.fill();

        ctx.restore();
      }
    }

    // Data flow beams
    class DataBeam {
      constructor(fromHub, toHub) {
        this.from = fromHub;
        this.to = toHub;
        this.progress = Math.random();
        this.speed = Math.random() * 0.008 + 0.004;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.progress = 0;
        }
      }

      draw(scrollY) {
        const scrollFactor = 0.12;
        const fromY = (this.from.y - scrollY * scrollFactor + height * 10) % height;
        const toY = (this.to.y - scrollY * scrollFactor + height * 10) % height;

        // Draw line between hubs
        ctx.beginPath();
        ctx.moveTo(this.from.x, fromY);
        ctx.lineTo(this.to.x, toY);
        ctx.strokeStyle = `rgba(45, 212, 191, 0.02)`; // extremely faint path line
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Calculate packet coordinates along line
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = fromY + (toY - fromY) * this.progress;

        // Draw glowing packet
        ctx.save();
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#20B2AA';
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(32, 178, 170, ${this.alpha})`;
        ctx.fill();
        ctx.restore();
      }
    }

    const hubs = [];
    const hubCount = Math.floor((width * height) / 140000) + 5;
    for (let i = 0; i < hubCount; i++) {
      hubs.push(new HubNode());
    }

    // Create beams between nearest hubs
    const beams = [];
    for (let i = 0; i < hubs.length; i++) {
      // Find nearest hub
      let minDist = Infinity;
      let nearestIdx = -1;
      for (let j = 0; j < hubs.length; j++) {
        if (i === j) continue;
        const dist = Math.hypot(hubs[i].x - hubs[j].x, hubs[i].y - hubs[j].y);
        if (dist < minDist) {
          minDist = dist;
          nearestIdx = j;
        }
      }
      if (nearestIdx !== -1 && minDist < 280) {
        beams.push(new DataBeam(hubs[i], hubs[nearestIdx]));
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // Draw beams
      beams.forEach(b => {
        b.update();
        b.draw(smoothScrollY);
      });

      // Draw and update hubs
      hubs.forEach(h => {
        h.update(mouseRef.current, smoothScrollY);
        h.draw(smoothScrollY);
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

export default IntegrationsBackground;
