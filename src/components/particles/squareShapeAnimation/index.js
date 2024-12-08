import React, { useEffect, useRef } from "react";

const SquareSketchCanvas = () => {
  const canvasRef = useRef(null);
  const squaresRef = useRef([]);
  const maxSquares = 200;
  const hue = useRef(240); // Use useRef to preserve the value of hue
  let frameCount = useRef(0); // Declare frameCount using useRef

  const point = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Utility function to generate random numbers
  const random = (min, max) => Math.random() * (max - min) + min;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const parentElement = canvas.parentElement; // Get the parent element (section)

    const resizeCanvas = () => {
      const { width, height } = parentElement.getBoundingClientRect(); // Get parent's dimensions
      canvas.width = width;
      canvas.height = height;
      point.current.x = width / 2;
      point.current.y = height / 2;
    };

    resizeCanvas();

    // Resize the canvas when the parent size changes
    window.addEventListener("resize", resizeCanvas);

    const squares = squaresRef.current;

    // Square class
    class Square {
      constructor() {
        this.init();
      }
      init() {
        this.size = 5;
        this.a = 0;
        this.x = point.current.x;
        this.y = point.current.y;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.hue = hue.current; // Use hue from useRef
        this.life = 0;
        this.maxLife = random(10, 100);
      }
      draw(ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `hsla(${hue.current}, 100%, 50%, ${this.a})`;
        ctx.strokeRect(
          this.x - this.size / 2,
          this.y - this.size / 2,
          this.size,
          this.size
        );
        this.update();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.life > this.maxLife) {
          this.a -= 0.04;
          this.size += 2;
          if (this.a < 0.0001) {
            this.init();
          }
        } else {
          this.a = this.a >= 1 ? 1 : this.a + 0.05;
        }
        this.life++;
      }
    }

    // Create and add squares over time
    for (let s = 0; s < maxSquares; s++) {
      setTimeout(() => squares.push(new Square()), s * 15);
    }

    const draw = () => {
      frameCount.current++; // Increment frameCount for delay

      // Introduce a delay by only drawing every few frames
      if (frameCount.current % 1 === 0) { // Modify this number to adjust the delay
        // Clear the canvas without adding any background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw squares
        squares.forEach((sq) => sq.draw(ctx));

        // Animate point towards the mouse
        const dx = mouse.current.x - point.current.x;
        const dy = mouse.current.y - point.current.y;
        if (Math.hypot(dx, dy) > 0.1) {
          point.current.x += dx * 0.2;
          point.current.y += dy * 0.2;
        }

        hue.current += 0.8; // Update hue using useRef's current property
      }

      // Continue the animation loop
      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseOut = () => {
      mouse.current.x = canvas.width / 2;
      mouse.current.y = canvas.height / 2;
    };

    // Add mouse event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseout", handleMouseOut);

    // Start the draw loop
    draw();

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div className="absolute inset-0 h-full z-10">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default SquareSketchCanvas;