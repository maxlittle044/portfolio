import React, { useEffect, useRef } from 'react';

const NeonHexagonFormingAnimation = () => {
    const canvasRef = useRef(null);
    const pointer = useRef({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const opts = {
            len: 25,
            count: 100,
            baseTime: 20, // Slow down the speed a bit
            addedTime: 5,
            dieChance: 0.05,
            spawnChance: 0.1, // Lower chance to spawn lines for smoother animation
            sparkChance: 0.1,
            sparkDist: 10,
            sparkSize: 2,
            color: 'hsl(hue, 100%, light%)',
            baseLight: 50,
            addedLight: 10,
            shadowToTimePropMult: 6,
            baseLightInputMultiplier: 0.01,
            addedLightInputMultiplier: 0.02,
            cx: w / 2,
            cy: h / 2,
            repaintAlpha: 0.04,
            hueChange: 0.1,
        };

        let tick = 0;
        let lines = [];
        const baseRad = (Math.PI * 2) / 6;

        function loop() {
            window.requestAnimationFrame(loop);
            ++tick;

            ctx.globalCompositeOperation = 'source-over';
            ctx.shadowBlur = 0;
            ctx.fillStyle = `rgba(0, 0, 0, ${opts.repaintAlpha})`;
            ctx.fillRect(0, 0, w, h);

            ctx.globalCompositeOperation = 'lighter';

            // Generate lines based on mouse movement
            if (lines.length < opts.count && Math.random() < opts.spawnChance) {
                lines.push(new Line());
            }

            lines.forEach((line) => line.step());
        }

        function Line() {
            this.reset();
        }

        Line.prototype.reset = function () {
            this.x = 0;
            this.y = 0;
            this.addedX = 0;
            this.addedY = 0;
            this.rad = Math.random() * Math.PI * 2; // Random start angle for variation
            this.lightInputMultiplier =
                opts.baseLightInputMultiplier +
                opts.addedLightInputMultiplier * Math.random();
            this.color = `hsl(${(tick * opts.hueChange + Math.random() * 360) % 360}, 100%, 50%)`;
            this.cumulativeTime = 0;
            this.beginPhase();
        };

        Line.prototype.beginPhase = function () {
            this.x += this.addedX;
            this.y += this.addedY;
            this.time = 0;
            this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
            this.rad += baseRad * (Math.random() < 0.5 ? 1 : -1);
            this.addedX = Math.cos(this.rad);
            this.addedY = Math.sin(this.rad);
        };

        Line.prototype.step = function () {
            ++this.time;
            ++this.cumulativeTime;

            if (this.time >= this.targetTime) this.beginPhase();

            const prop = this.time / this.targetTime;
            const wave = Math.sin(prop * Math.PI / 2);
            const x = this.addedX * wave;
            const y = this.addedY * wave;

            ctx.shadowBlur = prop * opts.shadowToTimePropMult;
            ctx.fillStyle = ctx.shadowColor = this.color.replace(
                'light',
                opts.baseLight +
                opts.addedLight *
                Math.sin(this.cumulativeTime * this.lightInputMultiplier)
            );
            ctx.fillRect(
                opts.cx + (this.x + x) * opts.len,
                opts.cy + (this.y + y) * opts.len,
                2,
                2
            );

            if (Math.random() < opts.sparkChance)
                ctx.fillRect(
                    opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2,
                    opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < 0.5 ? 1 : -1) - opts.sparkSize / 2,
                    opts.sparkSize,
                    opts.sparkSize
                );
        };

        const handlePointerMove = (e) => {
            let clientX, clientY;
            if (e.touches) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            opts.cx = clientX;
            opts.cy = clientY;

            // Clear lines and regenerate for smooth appearance
            lines = []; // Reset lines to create a new pattern on movement
        };

        loop();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, w, h);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchstart', handlePointerMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchstart', handlePointerMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute w-full inset-0 h-full z-10"></canvas>;
};

export default NeonHexagonFormingAnimation;