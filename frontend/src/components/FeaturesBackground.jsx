import React, { useEffect, useRef } from 'react';

const FeaturesBackground = () => {
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

    // Dynamic grid spacing based on resolution
    const gridSpacing = 80;

    // 1. Floating Isometric Wireframe Blocks (representing modular features)
    class FeatureBlock {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 30 + 20; // 3D box size
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        this.rotation = Math.random() * Math.PI * 2;
        this.alpha = Math.random() * 0.15 + 0.05;
        this.colorType = Math.random() > 0.5 ? 'amber' : 'teal';
        this.pulse = Math.random() * Math.PI;
      }

      update(mouse, scrollY) {
        this.rotation += this.rotationSpeed;
        this.pulse += 0.008;

        const scrollFactor = 0.18; // Fast foreground parallax
        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        // Mouse attraction/repulsion pivot logic
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Push away slightly
            this.x -= (dx / distance) * force * 0.8;
            this.y -= (dy / distance) * force * 0.8;
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
        const scrollFactor = 0.18;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.save();
        ctx.translate(this.x, drawY);
        ctx.rotate(this.rotation);

        // Subtle glowing highlight
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.colorType === 'amber' ? '#D97706' : '#20B2AA';

        const size = this.size + Math.sin(this.pulse) * 2;
        const h = size * 0.5;

        // Draw isometric projection box/cube wireframe
        ctx.strokeStyle = this.colorType === 'amber'
          ? `rgba(251, 191, 36, ${this.alpha + 0.05})`
          : `rgba(45, 212, 191, ${this.alpha + 0.05})`;
        ctx.lineWidth = 1;

        // Draw isometric hexagon silhouette representing a 3D box
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw interior wireframe ribs for 3D digital wireframe appearance
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -size);
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((2 * Math.PI) / 3) * size, Math.sin((2 * Math.PI) / 3) * size);
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos((4 * Math.PI) / 3) * size, Math.sin((4 * Math.PI) / 3) * size);
        ctx.stroke();

        ctx.restore();
      }
    }

    // 2. Orthogonal Digital Energy Grid Beams
    class GridBeam {
      constructor() {
        this.reset();
      }

      reset() {
        this.direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        
        if (this.direction === 'horizontal') {
          this.index = Math.floor(Math.random() * (height / gridSpacing)) * gridSpacing;
          this.progress = Math.random() > 0.5 ? -150 : width + 150;
          this.speed = (Math.random() * 2 + 1) * (this.progress < 0 ? 1 : -1);
        } else {
          this.index = Math.floor(Math.random() * (width / gridSpacing)) * gridSpacing;
          this.progress = Math.random() > 0.5 ? -150 : height + 150;
          this.speed = (Math.random() * 2 + 1) * (this.progress < 0 ? 1 : -1);
        }
        
        this.length = Math.random() * 120 + 80;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '#D97706' : '#20B2AA';
      }

      update() {
        this.progress += this.speed;
        
        if (this.direction === 'horizontal') {
          if ((this.speed > 0 && this.progress > width + 150) || 
              (this.speed < 0 && this.progress < -150)) {
            this.reset();
          }
        } else {
          if ((this.speed > 0 && this.progress > height + 150) || 
              (this.speed < 0 && this.progress < -150)) {
            this.reset();
          }
        }
      }

      draw(scrollY) {
        ctx.save();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        
        const scrollFactor = 0.1; // Midground parallax speed
        const scrollOffset = (scrollY * scrollFactor) % height;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        if (this.direction === 'horizontal') {
          // Adjust vertical index for infinite scroll wrapping
          const drawY = (this.index - scrollOffset + height * 10) % height;
          
          const grad = ctx.createLinearGradient(
            this.progress - (this.speed > 0 ? this.length : 0), 0,
            this.progress + (this.speed > 0 ? 0 : this.length), 0
          );
          grad.addColorStop(this.speed > 0 ? 0 : 1, 'rgba(0,0,0,0)');
          grad.addColorStop(this.speed > 0 ? 1 : 0, this.color);
          
          ctx.strokeStyle = grad;
          ctx.moveTo(this.progress, drawY);
          ctx.lineTo(this.progress - (this.speed > 0 ? this.length : -this.length), drawY);
        } else {
          // Adjust position based on direction and parallax
          const drawProgress = (this.progress - scrollOffset + height * 10) % height;
          
          const grad = ctx.createLinearGradient(
            0, drawProgress - (this.speed > 0 ? this.length : 0),
            0, drawProgress + (this.speed > 0 ? 0 : this.length)
          );
          grad.addColorStop(this.speed > 0 ? 0 : 1, 'rgba(0,0,0,0)');
          grad.addColorStop(this.speed > 0 ? 1 : 0, this.color);
          
          ctx.strokeStyle = grad;
          ctx.moveTo(this.index, drawProgress);
          ctx.lineTo(this.index, drawProgress - (this.speed > 0 ? this.length : -this.length));
        }

        ctx.stroke();
        ctx.restore();
      }
    }

    // Instantiation
    const blocks = [];
    const blockCount = Math.floor((width * height) / 180000) + 4; // dynamic count based on screen area
    for (let i = 0; i < blockCount; i++) {
      blocks.push(new FeatureBlock());
    }

    const beams = [];
    for (let i = 0; i < 8; i++) {
      beams.push(new GridBeam());
    }

    // Main Draw loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp scrolling position
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // 1. Draw Orthogonal Structured Matrix Grid (Background parallax layer: 0.05 speed)
      ctx.save();
      const gridScrollFactor = 0.05;
      const gridOffset = (smoothScrollY * gridScrollFactor) % gridSpacing;
      
      ctx.strokeStyle = 'rgba(139, 69, 19, 0.04)'; // primary warm brown lines
      ctx.lineWidth = 0.5;

      // Draw vertical grid lines
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal grid lines
      for (let y = -gridOffset; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw tiny glowing matrix nodes at grid intersections
      for (let x = 0; x < width; x += gridSpacing) {
        for (let y = -gridOffset; y < height; y += gridSpacing) {
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.hypot(dx, dy);

          ctx.beginPath();
          if (dist < mouseRef.current.radius) {
            // Interactive mouse lighting: points near mouse glow brighter
            const intensity = 1 - dist / mouseRef.current.radius;
            ctx.arc(x, y, 1.5 + intensity * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(251, 191, 36, ${0.15 + intensity * 0.45})`; // warm amber hover light
          } else {
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(139, 69, 19, 0.2)';
          }
          ctx.fill();
        }
      }
      ctx.restore();

      // 2. Draw Orthogonal Beams (Midground parallax layer: 0.10 speed)
      beams.forEach((b) => {
        b.update();
        b.draw(smoothScrollY);
      });

      // 3. Draw Floating Feature Isometric Wireframe Blocks (Foreground parallax layer: 0.18 speed)
      blocks.forEach((b) => {
        b.update(mouseRef.current, smoothScrollY);
        b.draw(smoothScrollY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize and listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const targetCount = Math.floor((width * height) / 180000) + 4;
      if (blocks.length < targetCount) {
        const diff = targetCount - blocks.length;
        for (let i = 0; i < diff; i++) blocks.push(new FeatureBlock());
      } else if (blocks.length > targetCount) {
        blocks.splice(targetCount);
      }
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

export default FeaturesBackground;
