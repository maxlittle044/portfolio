import React, { useEffect, useRef } from 'react';

const CanvasParticle = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const animationFrameRef = useRef(null);
    const particlesRef = useRef([]);
    const interactionParticleRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const options = {
            velocity: 1,
            density: 15000,
            netLineDistance: 200,
            netLineColor: '#929292',
            particleColors: ['#aaa']
        };

        const sizeCanvas = () => {
            canvas.width = containerRef.current.offsetWidth;
            canvas.height = containerRef.current.offsetHeight;
        };

        const createParticles = () => {
            const quantity = canvas.width * canvas.height / options.density;

            for (let i = 0; i < quantity; i++) {
                particlesRef.current.push(new Particle(canvas, options));
            }
        };

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;

            // Draw connections
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = particlesRef.current.length - 1; j > i; j--) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];
                    const distance = Math.sqrt(
                        Math.pow(p1.x - p2.x, 2) +
                        Math.pow(p1.y - p2.y, 2)
                    );

                    if (distance <= options.netLineDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = options.netLineColor;
                        ctx.globalAlpha = (options.netLineDistance - distance) / options.netLineDistance * p1.opacity * p2.opacity;
                        ctx.lineWidth = 0.7;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            particlesRef.current.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });

            animationFrameRef.current = requestAnimationFrame(update);
        };

        const bindUiActions = () => {
            const handleResize = () => {
                sizeCanvas();
                cancelAnimationFrame(animationFrameRef.current);
                particlesRef.current = [];
                createParticles();
                update();
            };

            const handleMouseMove = (e) => {
                if (!interactionParticleRef.current) {
                    interactionParticleRef.current = createInteractionParticle(canvas, e.offsetX, e.offsetY);
                } else {
                    interactionParticleRef.current.x = e.offsetX;
                    interactionParticleRef.current.y = e.offsetY;
                }
            };

            const handleMouseClick = (e) => {
                for (let i = 0; i < 3; i++) {
                    particlesRef.current.push(new Particle(canvas, options, e.offsetX, e.offsetY));
                }
            };

            window.addEventListener('resize', handleResize);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('click', handleMouseClick);

            return () => {
                window.removeEventListener('resize', handleResize);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('click', handleMouseClick);
            };
        };

        sizeCanvas();
        createParticles();
        animationFrameRef.current = requestAnimationFrame(update);
        const unbindUiActions = bindUiActions();

        return () => {
            cancelAnimationFrame(animationFrameRef.current);
            unbindUiActions();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Particle = function (canvas, options, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particleColor = returnRandomArrayitem(options.particleColors || ['#aaa']);
        this.radius = getLimitedRandom(1.5, 2.5);
        this.opacity = 0;
        this.x = x || Math.random() * this.canvas.width;
        this.y = y || Math.random() * this.canvas.height;
        this.velocity = {
            x: (Math.random() - 0.5) * options.velocity,
            y: (Math.random() - 0.5) * options.velocity
        };
    };

    Particle.prototype.update = function () {
        if (this.opacity < 1) {
            this.opacity += 0.01;
        } else {
            this.opacity = 1;
        }

        // Change direction if outside canvas
        if (this.x > this.canvas.width + 100 || this.x < -100) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y > this.canvas.height + 100 || this.y < -100) {
            this.velocity.y = -this.velocity.y;
        }

        // Update position
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    Particle.prototype.draw = function (ctx) {
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = this.particleColor;
        ctx.globalAlpha = this.opacity;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    };

    const createInteractionParticle = (canvas, x, y) => {
        const interactionParticle = new Particle(canvas, {}, x, y);
        interactionParticle.velocity = { x: 0, y: 0 };
        particlesRef.current.push(interactionParticle);
        return interactionParticle;
    };

    const getLimitedRandom = function (min, max, roundToInteger) {
        let number = Math.random() * (max - min) + min;
        if (roundToInteger) {
            number = Math.round(number);
        }
        return number;
    };

    const returnRandomArrayitem = function (array) {
        return array[Math.floor(Math.random() * array.length)];
    };

    return (
        <div ref={containerRef} className="particle-network-animation absolute top-0 left-0 right-0 bottom-0 h-full z-10">
            <canvas ref={canvasRef} className='h-full'></canvas>
        </div>
    );
};

export default CanvasParticle;