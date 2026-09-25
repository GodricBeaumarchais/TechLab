"use client";
import { useEffect, useRef } from "react";
import { FaDiscord, FaLinux, FaDocker, FaNodeJs, FaReact, FaGitAlt, FaServer, FaGlobe } from "react-icons/fa";
import { SiKubernetes, SiNextdotjs, SiPostgresql, SiNginx } from "react-icons/si";
import { TbApi } from "react-icons/tb";

// Repris du CV (ParticleField.js / FloatingIcons.js), mêmes réglages.
const PARTICLE_COUNT = 55;
const LINK_DISTANCE = 160;
const CURSOR_DISTANCE = 220;
const COLORS = ["218, 16, 123", "1, 236, 243"];

function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = canvas.getContext("2d");
        let width = 0, height = 0;
        let particles = [];
        const mouse = { x: -9999, y: -9999 };
        let rafId = null;
        let running = true;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: 1.8 + Math.random() * 1.8,
            color: COLORS[i % 2],
        }));

        const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

        const line = (x1, y1, x2, y2, color, alpha, lw) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = lw;
            ctx.stroke();
        };

        const draw = () => {
            if (!running) return;
            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, 0.65)`;
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < LINK_DISTANCE) line(a.x, a.y, b.x, b.y, a.color, 0.22 * (1 - dist / LINK_DISTANCE), 1);
                }
                const dist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
                if (dist < CURSOR_DISTANCE) line(a.x, a.y, mouse.x, mouse.y, a.color, 0.55 * (1 - dist / CURSOR_DISTANCE), 1.4);
            }

            rafId = requestAnimationFrame(draw);
        };

        const onVisibilityChange = () => {
            if (document.hidden) {
                running = false;
                cancelAnimationFrame(rafId);
            } else if (!running) {
                running = true;
                draw();
            }
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseleave", onMouseLeave);
        window.addEventListener("resize", resize);
        document.addEventListener("visibilitychange", onVisibilityChange);
        draw();

        return () => {
            running = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

// Valeurs fixes (pas Math.random) : sinon mismatch d'hydratation serveur/client.
// depth = vitesse du parallax au scroll.
const icons = [
    { Icon: FaGlobe, top: "3%", left: "5%", rotate: -12, size: 40, delay: 0, depth: 0.06 },
    { Icon: FaDocker, top: "9%", left: "89%", rotate: 18, size: 34, delay: 1.4, depth: 0.14 },
    { Icon: FaDiscord, top: "18%", left: "8%", rotate: 8, size: 44, delay: 2.6, depth: 0.22 },
    { Icon: SiNextdotjs, top: "26%", left: "93%", rotate: -20, size: 32, delay: 0.8, depth: 0.09 },
    { Icon: TbApi, top: "35%", left: "3%", rotate: 15, size: 42, delay: 3.2, depth: 0.18 },
    { Icon: FaLinux, top: "44%", left: "91%", rotate: -8, size: 40, delay: 1.8, depth: 0.05 },
    { Icon: SiKubernetes, top: "53%", left: "6%", rotate: 22, size: 38, delay: 2.2, depth: 0.16 },
    { Icon: SiPostgresql, top: "62%", left: "88%", rotate: -15, size: 34, delay: 0.4, depth: 0.11 },
    { Icon: FaNodeJs, top: "71%", left: "4%", rotate: 10, size: 36, delay: 1.9, depth: 0.2 },
    { Icon: SiNginx, top: "79%", left: "92%", rotate: -18, size: 30, delay: 2.9, depth: 0.07 },
    { Icon: FaReact, top: "87%", left: "7%", rotate: 25, size: 38, delay: 3.5, depth: 0.13 },
    { Icon: FaGitAlt, top: "94%", left: "86%", rotate: -10, size: 34, delay: 0.6, depth: 0.24 },
    { Icon: FaServer, top: "13%", left: "60%", rotate: 12, size: 28, delay: 2.1, depth: 0.19 },
];

function FloatingIcons() {
    // --scroll-y sur <html>, lu par .floating-icon pour le parallax (throttlé au rAF)
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                document.documentElement.style.setProperty("--scroll-y", window.scrollY);
                ticking = false;
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return icons.map(({ Icon, top, left, rotate, size, delay, depth }, i) => (
        <Icon
            key={i}
            className="floating-icon"
            aria-hidden="true"
            style={{ top, left, fontSize: size, animationDelay: `${delay}s`, "--rotate": `${rotate}deg`, "--depth": depth }}
        />
    ));
}

// Premiers enfants de .page, sans z-index : l'ordre du DOM les peint derrière le contenu
// (un z-index négatif cassait leur rendu sur le CV, voir FloatingIcons.css là-bas).
export default function Background() {
    return (
        <>
            <ParticleField />
            <FloatingIcons />
        </>
    );
}
