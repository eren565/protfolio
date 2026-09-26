import React, { useEffect, useRef } from "react";

const shapes = ["circle", "square", "triangle", "star", "emoji"];
const emojis = ["⋆⭒˚.⋆", "⋆✴︎˚｡⋆", "〇", "✮", "𝐖𝐄𝐋𝐂𝐎𝐌𝐄"];

const AnimatedDotsBG = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: width / 2, y: height / 2 };

    // --- Create dots ---
    const dots = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      baseSize: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.9) * 0.7,
      speedY: (Math.random() - 0.8) * 0.7,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      lastChangeTime: Date.now(),
    }));

    // --- Draw shapes ---
    const drawShape = (dot, color) => {
      ctx.save();
      ctx.translate(dot.x, dot.y);
      ctx.fillStyle = color;

      switch (dot.shape) {
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, dot.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case "square":
          ctx.fillRect(-dot.size, -dot.size, dot.size * 2, dot.size * 2);
          break;

        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -dot.size);
          ctx.lineTo(dot.size, dot.size);
          ctx.lineTo(-dot.size, dot.size);
          ctx.closePath();
          ctx.fill();
          break;

        case "star":
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = dot.size * 1.9;
          const innerRadius = dot.size * 0.1;
          for (let i = 0; i < spikes * 2; i++) {
            const angle = (Math.PI / spikes) * i;
            const r = i % 2 === 0 ? outerRadius : innerRadius;
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
          }
          ctx.closePath();
          ctx.fill();
          break;

        case "emoji":
          ctx.font = `${dot.size * 10}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(dot.emoji, 0, 0);
          break;

        default:
          break;
      }

      ctx.restore();
    };

    // --- Animate ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const now = Date.now();

      for (let dot of dots) {
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // bounce at edges
        if (dot.x < 0 || dot.x > width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > height) dot.speedY *= -1;

        // slow shape + emoji change (every 2–5 seconds)
        if (now - dot.lastChangeTime > 2000 + Math.random() * 3000) {
          dot.shape = shapes[Math.floor(Math.random() * shapes.length)];
          dot.emoji = emojis[Math.floor(Math.random() * emojis.length)];
          dot.lastChangeTime = now;
        }

        // hover green effect
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const color =
          dist < 150
            ? "rgba(34,197,94,0.8)" // green near mouse
            : "rgba(255,255,255,0.3)"; // white default

        drawShape(dot, color);
      }

      requestAnimationFrame(animate);
    };

    // --- Mouse + resize events ---
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default AnimatedDotsBG;
