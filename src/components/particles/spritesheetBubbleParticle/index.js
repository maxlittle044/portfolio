import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import waterBubbleImg from "../../../images/animation/water-bubbles.webp";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

const SpriteSheetBubbleParticle = () => {
  const canvasRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseMoved, setIsMouseMoved] = useState(false);

  // Preload image globally
  const img = new Image();
  img.src = waterBubbleImg; // Correct way to set the image source

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let cw = window.innerWidth;
    let ch = window.innerHeight;

    canvas.width = cw;
    canvas.height = ch;

    const handlePointerMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseMoved(true); // Mark that the mouse has moved
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // Load image
  useEffect(() => {
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [img]);

  // Render bubbles
  useEffect(() => {
    if (imageLoaded) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bubbles.forEach((bubble) => {
          ctx.translate(
            bubble.x + bubble.scaleX * 75,
            bubble.y + bubble.scaleY * 75
          );
          ctx.rotate(bubble.rotate);
          ctx.drawImage(
            img,
            0,
            bubble.step * 150,
            150,
            150,
            -bubble.scaleX * 75,
            -bubble.scaleY * 75,
            bubble.scaleX * 150,
            bubble.scaleY * 150
          );
          ctx.rotate(-bubble.rotate);
          ctx.translate(
            -bubble.x - bubble.scaleX * 75,
            -bubble.y - bubble.scaleY * 75
          );
        });
      };

      const update = () => {
        render();
        requestAnimationFrame(update);
      };

      update();
    }
  }, [bubbles, imageLoaded]);

  // Function to create and animate bubbles
  const makeBubble = (isStatic = false, continuous = false) => {
    const dist = gsap.utils.random(100, 200);
    const scale = gsap.utils.random(0.6, 0.8);
    const bubble = {
      dur: gsap.utils.random(3, 7),
      spriteDur: gsap.utils.random(0.12, 0.5),
      rotate: gsap.utils.random(-9, 9),
      scaleX: scale,
      scaleY: scale,
      step: 0,
      x: isStatic ? Math.random() * window.innerWidth : mousePosition.x - 75 * scale,
      y: isStatic ? Math.random() * window.innerHeight : mousePosition.y - 75 * scale,
    };

    setBubbles((prevBubbles) => [...prevBubbles, bubble]);

    // Continuous loop for preloaded bubbles until the mouse moves
    const timeline = gsap.timeline({ defaults: { ease: "none" } })
      .fromTo(
        bubble,
        { x: bubble.x, y: bubble.y },
        {
          duration: bubble.dur,
          rotate: "+=" + gsap.utils.random(-5, 5, 1),
          motionPath: () =>
            "M" +
            bubble.x +
            "," +
            bubble.y +
            "c" +
            gsap.utils.random(-dist, dist, 1) +
            "," +
            gsap.utils.random(-dist, dist, 1) +
            " " +
            gsap.utils.random(-dist, dist, 1) +
            "," +
            gsap.utils.random(-dist, dist, 1) +
            " " +
            gsap.utils.random(-dist, dist, 1) +
            "," +
            gsap.utils.random(-dist, dist, 1),
        },
        0
      )
      .to(
        bubble,
        {
          duration: bubble.dur / 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 3,
          repeatRefresh: true,
          scaleX: () => 0.7 + Math.random() / 9,
          scaleY: () => 0.7 + Math.random() / 9,
        },
        bubble.dur / 5
      )
      .to(
        bubble,
        {
          duration: bubble.spriteDur,
          step: 8,
          snap: "step",
        },
        bubble.dur - bubble.spriteDur
      );

    // If it's a static bubble and should animate continuously, loop the animation
    if (continuous && !isMouseMoved) {
      timeline.repeat(-1); // Infinite loop until mouse moves
    } else {
      timeline.to(
        bubble,
        {
          opacity: 0,
          onComplete: () => {
            setBubbles((prevBubbles) =>
              prevBubbles.filter((b) => b !== bubble)
            );
          },
        },
        bubble.dur // Make bubble disappear after the animation
      );
    }
  };

  // Preload static bubbles with animation until mouse moves
  useEffect(() => {
    if (imageLoaded && !isMouseMoved) {
      const makeInitialBubbles = () => {
        for (let i = 0; i < 10; i++) {
          makeBubble(true, true); // Create static bubbles that animate continuously
        }
      };

      makeInitialBubbles(); // Preloaded bubbles on initial load
    }
  }, [imageLoaded, isMouseMoved]);

  // Create mouse interaction bubbles once the mouse moves
  useEffect(() => {
    if (imageLoaded && isMouseMoved) {
      window.onpointerdown = window.onpointermove = () => makeBubble(false);

      return () => {
        window.onpointerdown = window.onpointermove = null;
      };
    }
  }, [imageLoaded, mousePosition, isMouseMoved]);

  return (
    <div className="w-full h-full absolute top-0 left-0 z-10">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
};

export default SpriteSheetBubbleParticle;