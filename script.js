"use strict";
let c, ctx, W, H;
let particles = [];
const numParticles = 100; // Number of particles

const random = (max = 1, min = 0) => Math.random() * (max - min) + min;

class Particle {
    constructor() {
        this.angle = random(0, 360) * (Math.PI / 180); // Convert to radians
        this.radius = random(50, 200); // Random radius
        this.size = random(2, 5); // Particle size
        this.speed = random(0.5, 1.5); // Speed of particles
        this.alpha = random(0.5, 1); // Transparency
    }

    update() {
        this.angle += this.speed * 0.01; // Rotate around the center
    }

    draw() {
        const x = W / 2 + Math.cos(this.angle) * this.radius;
        const y = H / 2 + Math.sin(this.angle) * this.radius;

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
    }
}

const init = () => {
    c = document.getElementById("canvas");
    c.width = W = window.innerWidth;
    c.height = H = window.innerHeight;
    ctx = c.getContext("2d");

    // Create particles
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }

    animate();
};

const clear = () => {
    ctx.clearRect(0, 0, W, H);
};

const animate = () => {
    clear();

    // Draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    window.requestAnimationFrame(animate);
};

window.onload = init;