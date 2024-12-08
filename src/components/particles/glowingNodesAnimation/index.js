import React, { useEffect, useRef } from "react";

const GlowingNodesAnimation = () => {
    const canvasRef = useRef(null);
    const isMouseMoving = useRef(false);
    const mouseTimeout = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            alert("Ooops! Your browser does not support canvas :'(");
            return;
        }

        let circ, nodes, SENSITIVITY, SIBLINGS_LIMIT, DENSITY, NODES_QTY, ANCHOR_LENGTH, MOUSE_RADIUS;
        SENSITIVITY = 100;
        SIBLINGS_LIMIT = 10;
        DENSITY = 50;
        NODES_QTY = 0;
        ANCHOR_LENGTH = 20;
        MOUSE_RADIUS = 200;

        circ = 2 * Math.PI;
        nodes = [];

        // Set mouse position to center of canvas on reload
        const mousePosition = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };

        function Node(x, y) {
            this.anchorX = x;
            this.anchorY = y;
            this.x = Math.random() * (x - (x - ANCHOR_LENGTH)) + (x - ANCHOR_LENGTH);
            this.y = Math.random() * (y - (y - ANCHOR_LENGTH)) + (y - ANCHOR_LENGTH);
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.energy = Math.random() * 100;
            this.radius = Math.random();
            this.siblings = [];
            this.brightness = 0;
        }

        Node.prototype.drawNode = function () {
            const color = `rgba(255, 255, 255, ${this.brightness})`; // White color
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2 * this.radius + (2 * this.siblings.length) / SIBLINGS_LIMIT, 0, circ);
            ctx.fillStyle = color;
            ctx.fill();
        };

        Node.prototype.drawConnections = function () {
            for (let i = 0; i < this.siblings.length; i++) {
                const color = `rgba(255, 255, 255, ${this.brightness})`; // White color
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
                ctx.lineWidth = 1 - calcDistance(this, this.siblings[i]) / SENSITIVITY;
                ctx.strokeStyle = color;
                ctx.stroke();
            }
        };

        Node.prototype.moveNode = function () {
            this.energy -= 2;
            if (this.energy < 1) {
                this.energy = Math.random() * 100;
                if (this.x - this.anchorX < -ANCHOR_LENGTH) {
                    this.vx = Math.random() * 2;
                } else if (this.x - this.anchorX > ANCHOR_LENGTH) {
                    this.vx = Math.random() * -2;
                } else {
                    this.vx = Math.random() * 4 - 2;
                }
                if (this.y - this.anchorY < -ANCHOR_LENGTH) {
                    this.vy = Math.random() * 2;
                } else if (this.y - this.anchorY > ANCHOR_LENGTH) {
                    this.vy = Math.random() * -2;
                } else {
                    this.vy = Math.random() * 4 - 2;
                }
            }
            this.x += (this.vx * this.energy) / 100;
            this.y += (this.vy * this.energy) / 100;
        };

        function initNodes() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            nodes = [];
            for (let i = DENSITY; i < canvas.width; i += DENSITY) {
                for (let j = DENSITY; j < canvas.height; j += DENSITY) {
                    nodes.push(new Node(i, j));
                    NODES_QTY++;
                }
            }
        }

        function calcDistance(node1, node2) {
            return Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));
        }

        function findSiblings() {
            let node1, node2, distance;
            for (let i = 0; i < NODES_QTY; i++) {
                node1 = nodes[i];
                node1.siblings = [];
                for (let j = 0; j < NODES_QTY; j++) {
                    node2 = nodes[j];
                    if (node1 !== node2) {
                        distance = calcDistance(node1, node2);
                        if (distance < SENSITIVITY) {
                            if (node1.siblings.length < SIBLINGS_LIMIT) {
                                node1.siblings.push(node2);
                            } else {
                                let maxDistance = 0;
                                let s;
                                for (let k = 0; k < SIBLINGS_LIMIT; k++) {
                                    const nodeSiblingDistance = calcDistance(node1, node1.siblings[k]);
                                    if (nodeSiblingDistance > maxDistance) {
                                        maxDistance = nodeSiblingDistance;
                                        s = k;
                                    }
                                }
                                if (distance < maxDistance) {
                                    node1.siblings.splice(s, 1);
                                    node1.siblings.push(node2);
                                }
                            }
                        }
                    }
                }
            }
        }

        function redrawScene() {
            resizeCanvas();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            findSiblings();
            let distance;
            for (let i = 0; i < NODES_QTY; i++) {
                const node = nodes[i];
                distance = calcDistance(mousePosition, node);
                if (distance < MOUSE_RADIUS) {
                    node.brightness = 1 - distance / MOUSE_RADIUS;
                } else {
                    node.brightness = 0;
                }
            }
            for (let i = 0; i < NODES_QTY; i++) {
                const node = nodes[i];
                if (node.brightness) {
                    node.drawNode();
                    node.drawConnections();
                }
                node.moveNode();
            }
            requestAnimationFrame(redrawScene);
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (!isMouseMoving.current) {
                mousePosition.x = canvas.width / 2;
                mousePosition.y = canvas.height / 2;
            }
        }

        function resetMouseToCenter() {
            isMouseMoving.current = false;
            mousePosition.x = canvas.width / 2;
            mousePosition.y = canvas.height / 2;
        }

        function mousemoveHandler(e) {
            isMouseMoving.current = true;
            clearTimeout(mouseTimeout.current); // Clear any existing timeout
            const rect = canvas.getBoundingClientRect();
            mousePosition.x = e.clientX - rect.left;
            mousePosition.y = e.clientY - rect.top;

            // Set timeout to reset position after 2 seconds of inactivity
            mouseTimeout.current = setTimeout(resetMouseToCenter, 500);
        }

        // Initialize nodes and start animation
        resizeCanvas();
        initNodes();
        redrawScene();

        // Add event listeners
        window.addEventListener("resize", resizeCanvas);
        canvas.addEventListener("mousemove", mousemoveHandler);

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            canvas.removeEventListener("mousemove", mousemoveHandler);
        };
    }, []);

    return (
        <div className="absolute inset-0 h-full w-full z-10">
            <canvas ref={canvasRef} className='h-full w-full'></canvas>
        </div>
    );
};

export default GlowingNodesAnimation;