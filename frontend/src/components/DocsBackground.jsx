import React, { useEffect, useRef } from 'react';

const DocsBackground = () => {
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

    // Matrix binary stream variables
    const fontSize = 12;
    const columnsCount = Math.floor(width / 24);
    const charList = "010101API{}=:[];<>$_+*".split("");

    // Falling digital streams (developer rain)
    class CodeStream {
      constructor(x) {
        this.x = x;
        this.reset();
        this.y = Math.random() * -height;
      }

      reset() {
        this.y = -150;
        this.speed = Math.random() * 2 + 1;
        this.chars = [];
        const length = Math.floor(Math.random() * 15) + 8;
        for (let i = 0; i < length; i++) {
          this.chars.push(charList[Math.floor(Math.random() * charList.length)]);
        }
        this.alpha = Math.random() * 0.25 + 0.05;
        this.colorType = Math.random() > 0.5 ? 'amber' : 'teal';
      }

      update(mouse, scrollY) {
        // Scrolling shifts the falling columns
        const scrollFactor = 0.1;
        this.y += this.speed + scrollY * 0.0005;

        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        // Interactive mouse disturbance
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            // Speed up or warp away
            this.y += (mouse.radius - dist) * 0.05;
          }
        }

        if (this.y > height + 150) {
          this.reset();
        }
      }

      draw(scrollY) {
        const scrollFactor = 0.1;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.save();
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';

        // Draw character waterfall
        for (let i = 0; i < this.chars.length; i++) {
          const charY = drawY - i * fontSize;
          if (charY < - fontSize || charY > height) continue;

          // Fade characters out as they go up the tail
          const charAlpha = this.alpha * (1 - i / this.chars.length);
          
          if (i === 0) {
            // Bright leading character
            ctx.fillStyle = this.colorType === 'amber' ? `rgba(251, 191, 36, ${charAlpha * 2.5})` : `rgba(45, 212, 191, ${charAlpha * 2.5})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.colorType === 'amber' ? '#FFB74D' : '#2D4AA';
          } else {
            ctx.fillStyle = this.colorType === 'amber' ? `rgba(139, 69, 19, ${charAlpha})` : `rgba(32, 178, 170, ${charAlpha})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(this.chars[i], this.x, charY);
        }

        ctx.restore();
      }
    }

    const streams = [];
    const spacing = 28;
    for (let x = 10; x < width; x += spacing) {
      streams.push(new CodeStream(x));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      streams.forEach((s) => {
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

export default DocsBackground;
