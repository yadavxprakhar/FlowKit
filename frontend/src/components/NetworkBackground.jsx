import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
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

    // Dynamic scale depending on screen size to keep it fast
    const getDensity = () => {
      const area = width * height;
      if (area < 500000) return 40; // mobile
      if (area < 1000000) return 70; // tablet
      return 110; // desktop
    };

    // Node particles
    class Particle {
      constructor() {
        this.reset();
        // Distribute randomly initially
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1; // node size
        this.baseSpeedX = (Math.random() - 0.5) * 0.3;
        this.baseSpeedY = (Math.random() - 0.5) * 0.3;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseDir = Math.random() > 0.5 ? 1 : -1;
        this.colorType = Math.random() > 0.4 ? 'amber' : 'teal'; // Amber and teal to match existing landing page theme
      }

      update(mouse, scrollY) {
        // Pulse alpha
        this.alpha += this.pulseSpeed * this.pulseDir;
        if (this.alpha > 0.8 || this.alpha < 0.2) {
          this.pulseDir *= -1;
        }

        // Calculate current drawn Y position to do accurate mouse collision
        const scrollFactor = this.size > 2 ? 0.12 : 0.06;
        const currentDrawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        // Mouse interaction (gentle repulsion + attraction mix)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - currentDrawY;
          const distance = Math.hypot(dx, dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            // Push away slightly
            this.x -= (dx / distance) * force * 1.2;
            this.y -= (dy / distance) * force * 1.2;
          }
        }

        // Apply normal drift speed
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(scrollY) {
        // Apply parallax scrolling based on depth (size)
        const scrollFactor = this.size > 2 ? 0.12 : 0.06;
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.beginPath();
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        
        if (this.colorType === 'amber') {
          ctx.fillStyle = `rgba(217, 119, 6, ${this.alpha})`; // amber-600
        } else {
          ctx.fillStyle = `rgba(32, 178, 170, ${this.alpha})`; // teal-400
        }
        
        ctx.fill();
        
        // Highlight larger nodes with subtle glowing shadows
        if (this.size > 2.5) {
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.colorType === 'amber' ? '#D97706' : '#20B2AA';
          ctx.beginPath();
          ctx.arc(this.x, drawY, this.size + 1, 0, Math.PI * 2);
          ctx.fillStyle = this.colorType === 'amber' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(45, 212, 191, 0.3)';
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // High-tech flow highway lines (like the beautiful glowing paths in the user's image)
    class FlowHighway {
      constructor(type) {
        this.type = type; // 'highway1', 'highway2', 'highway3'
        this.progress = Math.random();
        this.speed = Math.random() * 0.0008 + 0.0004;
        this.pulse = 0;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) {
          this.progress = 0;
        }
        this.pulse += 0.01;
      }

      draw(scrollY) {
        ctx.save();
        
        // Premium scroll-driven parallax translation + rotational shift
        const scrollOffset = (scrollY * 0.18) % height; // Shift slightly faster than background particles
        
        ctx.translate(width / 2, height / 2);
        // Very subtle pivoting rotation as the user scrolls
        ctx.rotate(scrollY * 0.00003);
        ctx.translate(-width / 2, -height / 2);
        
        // Slide downwards/upwards depending on scroll
        ctx.translate(0, -scrollOffset);
        
        // Dynamic control points based on screen dimensions
        let start, cp1, cp2, end;
        
        if (this.type === 'highway1') {
          // Flowing from top left swooping down to bottom right
          start = { x: -100, y: height * 0.25 };
          cp1 = { x: width * 0.35, y: height * 0.15 };
          cp2 = { x: width * 0.25, y: height * 0.85 };
          end = { x: width + 100, y: height * 0.75 };
        } else if (this.type === 'highway2') {
          // Flowing low and swooping high
          start = { x: -100, y: height * 0.85 };
          cp1 = { x: width * 0.45, y: height * 0.95 };
          cp2 = { x: width * 0.65, y: height * 0.05 };
          end = { x: width + 100, y: height * 0.35 };
        } else {
          // Additional subtle highway
          start = { x: width * 0.1, y: height + 100 };
          cp1 = { x: width * 0.3, y: height * 0.4 };
          cp2 = { x: width * 0.7, y: height * 0.6 };
          end = { x: width * 0.9, y: -100 };
        }

        const pathGrad = ctx.createLinearGradient(0, 0, width, height);
        pathGrad.addColorStop(0, 'rgba(139, 69, 19, 0.02)'); 
        pathGrad.addColorStop(0.3, 'rgba(217, 119, 6, 0.12)'); 
        pathGrad.addColorStop(0.7, 'rgba(32, 178, 170, 0.12)'); 
        pathGrad.addColorStop(1, 'rgba(32, 178, 170, 0.02)');

        // Helper function to calculate Bezier position at parameter t
        const getBezierPoint = (t, p0, p1, p2, p3) => {
          const cX = 3 * (p1.x - p0.x);
          const bX = 3 * (p2.x - p1.x) - cX;
          const aX = p3.x - p0.x - cX - bX;
          
          const cY = 3 * (p1.y - p0.y);
          const bY = 3 * (p2.y - p1.y) - cY;
          const aY = p3.y - p0.y - cY - bY;
          
          const x = ((aX * t + bX) * t + cX) * t + p0.x;
          const y = ((aY * t + bY) * t + cY) * t + p0.y;
          
          return { x, y };
        };

        // Draw glowing data cubes/hexagons moving along the highway
        const drawDataCube = (t, size = 6, offsetY = 0) => {
          const pt = getBezierPoint(t, start, cp1, cp2, end);
          const drawY = pt.y + offsetY;
          
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.type === 'highway2' ? '#20B2AA' : '#D97706';
          
          // Draw high-tech 3D-looking isometric cube/hexagon
          ctx.fillStyle = this.type === 'highway2' 
            ? 'rgba(45, 212, 191, 0.9)' 
            : 'rgba(251, 191, 36, 0.9)';
          
          // Outer Diamond
          ctx.beginPath();
          ctx.moveTo(pt.x, drawY - size);
          ctx.lineTo(pt.x + size * 0.86, drawY - size * 0.5);
          ctx.lineTo(pt.x + size * 0.86, drawY + size * 0.5);
          ctx.lineTo(pt.x, drawY + size);
          ctx.lineTo(pt.x - size * 0.86, drawY + size * 0.5);
          ctx.lineTo(pt.x - size * 0.86, drawY - size * 0.5);
          ctx.closePath();
          ctx.fill();

          // Inside detail lines for 3D tech feel
          ctx.beginPath();
          ctx.moveTo(pt.x, drawY);
          ctx.lineTo(pt.x, drawY - size);
          ctx.moveTo(pt.x, drawY);
          ctx.lineTo(pt.x - size * 0.86, drawY + size * 0.5);
          ctx.moveTo(pt.x, drawY);
          ctx.lineTo(pt.x + size * 0.86, drawY + size * 0.5);
          ctx.strokeStyle = 'rgba(15, 9, 6, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Glowing pulse ring around the data cube
          ctx.beginPath();
          ctx.arc(pt.x, drawY, size * 2.2 + Math.sin(this.pulse * 2.5) * 2, 0, Math.PI * 2);
          ctx.strokeStyle = this.type === 'highway2' 
            ? 'rgba(45, 212, 191, 0.2)' 
            : 'rgba(251, 191, 36, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        };

        // Draw multiple copies offset by height to enable seamless looping during scroll wrapping
        const drawSegment = (offsetY) => {
          ctx.beginPath();
          ctx.moveTo(start.x, start.y + offsetY);
          ctx.bezierCurveTo(cp1.x, cp1.y + offsetY, cp2.x, cp2.y + offsetY, end.x, end.y + offsetY);
          ctx.strokeStyle = pathGrad;
          ctx.lineWidth = 1.5 + Math.sin(this.pulse) * 0.5;
          ctx.stroke();

          drawDataCube(this.progress, 7, offsetY);
          drawDataCube((this.progress + 0.3) % 1.0, 5, offsetY);
          drawDataCube((this.progress + 0.65) % 1.0, 6, offsetY);
        };

        // Draw current segment, plus segments below and above for visual looping
        drawSegment(0);
        drawSegment(height);
        drawSegment(-height);

        ctx.restore();
      }
    }

    // Setup arrays
    const particles = [];
    const particleCount = getDensity();
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const highways = [
      new FlowHighway('highway1'),
      new FlowHighway('highway2'),
      new FlowHighway('highway3'),
    ];

    // Connection distance limit
    const maxConnectionDistance = 110;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth scroll interpolation (lerping) for buttery momentum
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // 1. Draw Highways (Under particles) with parallax scroll tracking
      highways.forEach((h) => {
        h.update();
        h.draw(smoothScrollY);
      });

      // 2. Update and Draw Particles with parallax scroll tracking
      particles.forEach((p) => {
        p.update(mouseRef.current, smoothScrollY);
        p.draw(smoothScrollY);
      });

      // 3. Draw Constellation Network Connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          // Get exact wrapped scroll positions for links
          const p1ScrollFactor = p1.size > 2 ? 0.12 : 0.06;
          const p1DrawY = (p1.y - smoothScrollY * p1ScrollFactor + height * 10) % height;
          
          const p2ScrollFactor = p2.size > 2 ? 0.12 : 0.06;
          const p2DrawY = (p2.y - smoothScrollY * p2ScrollFactor + height * 10) % height;
          
          const dx = p1.x - p2.x;
          const dy = p1DrawY - p2DrawY;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * 0.15;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1DrawY);
            ctx.lineTo(p2.x, p2DrawY);
            
            const lineGrad = ctx.createLinearGradient(p1.x, p1DrawY, p2.x, p2DrawY);
            
            if (p1.colorType === 'amber') {
              lineGrad.addColorStop(0, `rgba(217, 119, 6, ${alpha})`);
            } else {
              lineGrad.addColorStop(0, `rgba(32, 178, 170, ${alpha})`);
            }
            
            if (p2.colorType === 'amber') {
              lineGrad.addColorStop(1, `rgba(217, 119, 6, ${alpha})`);
            } else {
              lineGrad.addColorStop(1, `rgba(32, 178, 170, ${alpha})`);
            }

            ctx.strokeStyle = lineGrad;
            ctx.stroke();
          }
        }
      }

      // 4. Mouse Interactive Web Connection
      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        particles.forEach((p) => {
          const pScrollFactor = p.size > 2 ? 0.12 : 0.06;
          const pDrawY = (p.y - smoothScrollY * pScrollFactor + height * 10) % height;
          
          const dx = p.x - mouseRef.current.x;
          const dy = pDrawY - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRef.current.radius) {
            const alpha = (1 - dist / mouseRef.current.radius) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, pDrawY);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = p.colorType === 'amber'
              ? `rgba(251, 191, 36, ${alpha})`
              : `rgba(45, 212, 191, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Event Listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      const targetCount = getDensity();
      if (particles.length < targetCount) {
        const diff = targetCount - particles.length;
        for (let i = 0; i < diff; i++) particles.push(new Particle());
      } else if (particles.length > targetCount) {
        particles.splice(targetCount);
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

export default NetworkBackground;
