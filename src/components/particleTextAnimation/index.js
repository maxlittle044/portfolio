import React, { useEffect, useRef } from 'react';

const ParticleTextAnimation = () => {
    const canvasRef1 = useRef(null);
    const canvasRef2 = useRef(null);
    const canvasRef3 = useRef(null);
    let particles = [];
    let frequency = 20;

    useEffect(() => {
        const c1 = createCanvas(canvasRef1.current);
        const c2 = createCanvas(canvasRef2.current);
        const c3 = createCanvas(canvasRef3.current);

        const tela = c1.canvas;
        const canvas = c1.context;

        document.body.appendChild(c3.canvas);
        writeText(c2.canvas, c2.context, "PARTICLES\nWRITE\nTEXT");

        setInterval(() => {
            popolate();
        }, frequency);

        update();

        function createCanvas(canvasElement) {
            const context = canvasElement.getContext('2d');
            return {
                canvas: canvasElement,
                context: context
            };
        }

        function writeText(canvas, context, text) {
            const size = 100;
            context.font = `${size}px Montserrat`;
            context.fillStyle = "#111111";
            context.textAlign = "center";
            const lineheight = 70;
            const lines = text.split('\n');
            for (let i = 0; i < lines.length; i++) {
                context.fillText(lines[i], canvas.width / 2, canvas.height / 2 + lineheight * i - (lineheight * (lines.length - 1)) / 3);
            }
        }

        function maskCanvas() {
            c3.context.drawImage(c2.canvas, 0, 0, c2.canvas.width, c2.canvas.height);
            c3.context.globalCompositeOperation = 'source-atop';
            c3.context.drawImage(c1.canvas, 0, 0);
            blur(c1.context, c1.canvas, 2);
        }

        function blur(ctx, canvas, amt) {
            ctx.filter = `blur(${amt}px)`;
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';
        }

        function popolate() {
            particles.push(
                new Particle(canvas, {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                })
            );
        }

        function clear() {
            canvas.globalAlpha = 0.03;
            canvas.fillStyle = '#111111';
            canvas.fillRect(0, 0, tela.width, tela.height);
            canvas.globalAlpha = 1;
        }

        function update() {
            clear();
            particles = particles.filter(p => p.move());
            maskCanvas();
            requestAnimationFrame(update);
        }

        class Particle {
            constructor(canvas, options) {
                this.canvas = canvas;
                this.x = options.x;
                this.y = options.y;
                this.s = 3 + Math.random();
                this.a = 0;
                this.w = window.innerWidth;
                this.h = window.innerHeight;
                this.radius = 0.5 + Math.random() * 20;
                this.color = this.radius > 5 ? "#FF5E4C" : "#ED413C";
            }

            randomColor() {
                const colors = ["#FF5E4C", "#FFFFFF"];
                return colors[this.randomIntFromInterval(0, colors.length - 1)];
            }

            randomIntFromInterval(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            render() {
                this.canvas.beginPath();
                this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                this.canvas.lineWidth = 2;
                this.canvas.fillStyle = this.color;
                this.canvas.fill();
                this.canvas.closePath();
            }

            move() {
                this.x += Math.cos(this.a) * this.s;
                this.y += Math.sin(this.a) * this.s;
                this.a += Math.random() * 0.8 - 0.4;

                if (this.x < 0 || this.x > this.w - this.radius || this.y < 0 || this.y > this.h - this.radius) {
                    return false;
                }

                this.render();
                return true;
            }
        }
    }, []);

    return (
        <>
            <div className="w-full h-full absolute top-0 left-0">
                <canvas className='hidden' ref={canvasRef1} width={window.innerWidth} height={window.innerHeight} style={{ display: 'none' }} />
                <canvas className='hidden' ref={canvasRef2} width={window.innerWidth} height={window.innerHeight} style={{ display: 'none' }} />
                <canvas ref={canvasRef3} width={window.innerWidth} height={window.innerHeight} />
            </div>
        </>
    );
};

export default ParticleTextAnimation;