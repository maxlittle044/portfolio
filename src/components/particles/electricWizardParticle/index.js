import React, { useEffect, useRef } from 'react';
import { TweenLite, Back } from 'gsap';

const ElectricWizardParticle = () => {
  const canvasRefs = [useRef(null), useRef(null)]; // Array of refs for multiple canvases
  let ctxs = [];
  let particles = [];
  const minDist = 110;
  const mouse = { x: 0, y: 0 };
  const W = window.innerWidth;
  const H = window.innerHeight;

  useEffect(() => {
    canvasRefs.forEach((canvasRef, index) => {
      const ctx = canvasRef.current.getContext("2d");
      ctxs.push(ctx);
      canvasRef.current.width = W;
      canvasRef.current.height = H;

      const animate = () => {
        requestAnimationFrame(animate);
        render(index); // Pass index to render function to differentiate canvases
      };

      const resize = () => {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      };

      const mouseMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };

      const addListeners = () => {
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', mouseMove);
      };

      const initialize = () => {
        for (let x = 0; x < W; x += W / 10) {
          for (let y = 0; y < H; y += H / 10) {
            const px = x + Math.random() * (W / 20);
            const py = y + Math.random() * (H / 20);
            const p = Particle(px, py);
            particles.push(p);
            particleAnimation(p);
          }
        }
        addListeners();
        animate();
      };

      initialize();

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', mouseMove);
      };
    });
    
  }, []);

  const Particle = (x, y) => {
    return {
      x,
      y,
      vx: -1 + Math.random() * 2,
      vy: -1 + Math.random() * 2,
      radius: 2,
      color: { r: 255, g: 255, b: 255 }, // White color
      opacity: 0,
      paint: function () {
        const ctx = ctxs[Math.floor(Math.random() * ctxs.length)]; // Select a random context from ctxs array
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      },
      accelerate: function (x, y) {
        const ax = x / 5000;
        const ay = y / 5000;
        this.vx -= ax;
        this.vy -= ay;
      }
    };
  };

  const particleAnimation = (p) => {
    TweenLite.to(
      p,
      3 + 1 * Math.random(),
      {
        x: p.x - 50 + Math.random() * 100,
        y: p.y - 50 + Math.random() * 100,
        ease: Back.easeInOut,
        onComplete: function () {
          particleAnimation(p);
        }
      }
    );
  };

  const render = (index) => {
    paintCanvas(index); // Pass index to paintCanvas function to differentiate canvases
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.paint();
    }
    update();
  };

  const update = () => {
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const mouseDistance = getDistance(p, mouse);
      if (mouseDistance.d <= minDist) {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = getDistance(p, p2);
          if (distance.d <= minDist) {
            paintLine(p.x, p.y, p2.x, p2.y, distance.d);
            p.accelerate(distance.dx, distance.dy);
            p.opacity = 1;
            p2.accelerate(distance.dx, distance.dy);
            p2.opacity = 1;
          }
        }
      }
      if (p.opacity > 0) p.opacity -= 0.08;
    }
  };

  const getDistance = (p1, p2) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    return {
      d,
      dx,
      dy
    };
  };

  const paintCanvas = (index) => {
    const ctx = ctxs[index]; // Get the context for the corresponding canvas
    ctx.clearRect(0, 0, W, H); // Clear canvas
  };

  const paintLine = (x1, y1, x2, y2, opacity) => {
    const ctx = ctxs[Math.floor(Math.random() * ctxs.length)]; // Select a random context from ctxs array
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255, 255, 255, ${1.2 - opacity / minDist})`; // White color
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 0.1;
    ctx.stroke();

    // Add more paint line effects here if needed
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full z-10">
      {canvasRefs.map((canvasRef, index) => (
        <canvas key={index} ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}></canvas>
      ))}
    </div>
  );
};

export default ElectricWizardParticle;