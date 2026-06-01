import React, { useEffect, useRef } from 'react';

const AboutBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 200 });
  const scrollRef = useRef({ current: 0, target: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Orbital configuration
    const orbits = [
      { radius: 150, speed: 0.0006, scrollFactor: 0.04, color: '#D97706', nodeSize: 5 },
      { radius: 300, speed: -0.0003, scrollFactor: 0.08, color: '#8B4513', nodeSize: 7 },
      { radius: 450, speed: 0.0002, scrollFactor: 0.12, color: '#20B2AA', nodeSize: 6 },
      { radius: 600, speed: -0.0001, scrollFactor: 0.16, color: '#FFB74D', nodeSize: 8 },
    ];

    // Background cosmic dust particles
    class Star {
      constructor() {
        this.reset();
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.1;
        this.speedY = (Math.random() - 0.5) * 0.1;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulseDir = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.alpha += this.pulseSpeed * this.pulseDir;
        if (this.alpha > 0.6 || this.alpha < 0.1) {
          this.pulseDir *= -1;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(scrollY) {
        const scrollFactor = 0.03; // Extremely deep background parallax
        const drawY = (this.y - scrollY * scrollFactor + height * 10) % height;

        ctx.beginPath();
        ctx.arc(this.x, drawY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 119, 6, ${this.alpha})`;
        ctx.fill();
      }
    }

    const stars = [];
    const starCount = Math.floor((width * height) / 10000) + 10;
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    // Interactive Camera Pivot coordinates (simulates 3D lens movement)
    let cameraX = 0;
    let cameraY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    let orbitAngleOffset = 0;

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Lerp scrolling position
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      const smoothScrollY = scrollRef.current.current;

      // Update cosmic dust stars
      stars.forEach((s) => {
        s.update();
        s.draw(smoothScrollY);
      });

      // Smoothly update camera perspective tilt based on mouse position
      if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
        targetCameraX = (mouseRef.current.x - width / 2) * 0.08;
        targetCameraY = (mouseRef.current.y - height / 2) * 0.08;
      } else {
        targetCameraX = 0;
        targetCameraY = 0;
      }
      cameraX += (targetCameraX - cameraX) * 0.05;
      cameraY += (targetCameraY - cameraY) * 0.05;

      // Base orbital system center (slightly offset to the right side of the screen for balanced editorial layout)
      const centerX = width * 0.7 + cameraX;
      const centerY = height * 0.4 + cameraY;

      orbitAngleOffset += 0.0005;

      // Draw concentric orbital shells
      orbits.forEach((orbit, index) => {
        ctx.save();

        const scrollOffset = smoothScrollY * orbit.scrollFactor;
        const currentCenterY = centerY - scrollOffset;

        // Draw the concentric orbital ring path
        ctx.beginPath();
        ctx.arc(centerX, currentCenterY, orbit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = index % 2 === 0 ? 'rgba(139, 69, 19, 0.03)' : 'rgba(32, 178, 170, 0.03)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Pulsing orbital ring dash effect (high-tech rings)
        ctx.beginPath();
        ctx.arc(centerX, currentCenterY, orbit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = index % 2 === 0 ? 'rgba(217, 119, 6, 0.06)' : 'rgba(32, 178, 170, 0.06)';
        ctx.lineWidth = 0.5;
        ctx.setLineDash([40, 180]);
        ctx.lineDashOffset = orbitAngleOffset * orbit.radius * (index % 2 === 0 ? 1 : -1);
        ctx.stroke();

        // Calculate and draw planetary/milestone nodes gliding along the orbits
        const drawNode = (angleOffset, nodeSizeMultiplier = 1) => {
          // Dynamic angle progress based on time and orbit speed
          const angle = orbitAngleOffset * orbit.radius * orbit.speed + angleOffset;
          const nodeX = centerX + Math.cos(angle) * orbit.radius;
          const nodeY = currentCenterY + Math.sin(angle) * orbit.radius;

          // Glowing shadow
          ctx.shadowBlur = 15;
          ctx.shadowColor = orbit.color;

          const finalSize = orbit.nodeSize * nodeSizeMultiplier;

          // Milestone Outer glow
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, finalSize + 4 + Math.sin(orbitAngleOffset * 8 + angleOffset) * 2, 0, Math.PI * 2);
          ctx.fillStyle = index % 2 === 0 ? 'rgba(251, 191, 36, 0.05)' : 'rgba(45, 212, 191, 0.05)';
          ctx.fill();

          // Milestone Core Node
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, finalSize, 0, Math.PI * 2);
          ctx.fillStyle = orbit.color;
          ctx.fill();

          // Inside core highlight
          ctx.beginPath();
          ctx.arc(nodeX, nodeY, finalSize * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // If mouse is close, draw web link to mouse
          if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
            const dx = mouseRef.current.x - nodeX;
            const dy = mouseRef.current.y - nodeY;
            const dist = Math.hypot(dx, dy);

            if (dist < mouseRef.current.radius) {
              const intensity = (1 - dist / mouseRef.current.radius) * 0.15;
              ctx.beginPath();
              ctx.moveTo(nodeX, nodeY);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.strokeStyle = index % 2 === 0 ? `rgba(251, 191, 36, ${intensity})` : `rgba(45, 212, 191, ${intensity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        };

        // Draw multiple milestone nodes on each orbit at different angle offsets
        drawNode(0, 1.0);
        drawNode(Math.PI * 0.6, 0.85);
        drawNode(Math.PI * 1.35, 0.7);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize and listeners
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const targetCount = Math.floor((width * height) / 10000) + 10;
      if (stars.length < targetCount) {
        const diff = targetCount - stars.length;
        for (let i = 0; i < diff; i++) stars.push(new Star());
      } else if (stars.length > targetCount) {
        stars.splice(targetCount);
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

export default AboutBackground;
