
import React, { useEffect, useRef } from 'react';

const EQUATIONS = [
  // --- FLUID DYNAMICS ---
  "\\rho\\left(\\frac{\\partial \\mathbf{u}}{\\partial t} + \\mathbf{u} \\cdot \\nabla \\mathbf{u}\\right) = -\\nabla p + \\mu \\nabla^2 \\mathbf{u} + \\mathbf{f}",
  "P + \\frac{1}{2}\\rho v^2 + \\rho gh = C",
  "Re = \\frac{\\rho vL}{\\mu}",
  "Nu = \\frac{hL}{k}",
  "Pr = \\frac{\\mu C_p}{k}",
  "Ma = \\frac{v}{a}",
  "\\dot{m} = \\rho AV",
  "h_L = f \\frac{L}{D} \\frac{v^2}{2g}",
  "C_D = \\frac{F_d}{\\frac{1}{2}\\rho v^2 A}",
  "\\nabla \\cdot \\mathbf{u} = 0",

  // --- THERMODYNAMICS & HEAT TRANSFER ---
  "PV = nRT",
  "\\Delta U = Q - W",
  "dS = \\frac{dQ}{T}",
  "\\mathbf{q} = -k\\nabla T",
  "q = hA(T_s - T_\\infty)",
  "Q = \\sigma \\epsilon A (T^4_s - T^4_{sur})",
  "\\eta = 1 - \\frac{T_L}{T_H}",
  "h = u + Pv",
  "q = mC_p\\Delta T",
  "\\gamma = \\frac{C_p}{C_v}",
  "\\text{COP}_{hp} = \\frac{Q_H}{W_{in}}",
  "\\frac{\\partial T}{\\partial t} = \\alpha \\nabla^2 T",

  // --- SOLID MECHANICS & STATICS ---
  "\\mathbf{F} = m\\mathbf{a}",
  "\\sigma = E\\epsilon",
  "\\tau = G\\gamma",
  "\\epsilon = \\frac{\\Delta L}{L_0}",
  "\\frac{M}{I} = \\frac{\\sigma}{y} = \\frac{E}{R}",
  "\\theta = \\frac{TL}{JG}",
  "\\delta = \\frac{PL}{AE}",
  "P_{cr} = \\frac{\\pi^2 EI}{(KL)^2}",
  "J = \\int r^2 dA",
  "\\tau_{max} = \\frac{Tr}{J}",
  "\\sigma_{avg} = \\frac{\\sigma_x + \\sigma_y}{2}",
  "R_{Mohr} = \\sqrt{(\\frac{\\sigma_x - \\sigma_y}{2})^2 + \\tau_{xy}^2}",
  "\\delta_{max} = \\frac{5wL^4}{384EI}",

  // --- DYNAMICS & VIBRATIONS ---
  "\\omega_n = \\sqrt{\\frac{k}{m}}",
  "x(t) = Xe^{-\\zeta \\omega_n t}\\cos(\\omega_d t - \\phi)",
  "\\sum M_G = I_G \\alpha",
  "T = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2",
  "\\vec{H}_O = \\vec{r} \\times m\\vec{v}",
  "f_n = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}",
  "c_c = 2\\sqrt{km}",
  "m\\ddot{x} + c\\dot{x} + kx = F_0\\sin(\\omega t)",

  // --- ELECTRICAL CIRCUITS & SIGNALS ---
  "V = IR",
  "P = VI = I^2 R",
  "V(t) = L\\frac{di}{dt}",
  "i(t) = C\\frac{dv}{dt}",
  "Z = R + j(X_L - X_C)",
  "f_r = \\frac{1}{2\\pi \\sqrt{LC}}",
  "\\tau = RC",
  "\\tau = L/R",
  "H(s) = \\frac{Y(s)}{X(s)}",
  "V_{out} = V_{in} \\frac{R_2}{R_1 + R_2}",
  "P_{3\\phi} = \\sqrt{3}V_L I_L \\cos \\theta",

  // --- ELECTROMAGNETICS (MAXWELL'S) ---
  "\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\epsilon_0}",
  "\\nabla \\cdot \\mathbf{B} = 0",
  "\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}",
  "\\nabla \\times \\mathbf{B} = \\mu_0\\mathbf{J} + \\mu_0\\epsilon_0\\frac{\\partial \\mathbf{E}}{\\partial t}",
  "\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B})",
  "\\phi = \\int \\mathbf{B} \\cdot d\\mathbf{A}",
  "e = -N\\frac{d\\phi}{dt}",

  // --- CALCULUS & DIFFERENTIAL EQUATIONS ---
  "\\int_a^b f(x)dx = F(b) - F(a)",
  "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n",
  "\\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}",
  "\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u",
  "x^2 y'' + xy' + (x^2 - n^2)y = 0",
  "\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty e^{-st}f(t)dt",
  "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}",
  "\\iint_S \\mathbf{F} \\cdot d\\mathbf{S} = \\iiint_V (\\nabla \\cdot \\mathbf{F}) dV",
  "y_p = \\frac{1}{P(D)}f(x)",
  "W[y_1, y_2] = y_1 y_2' - y_2 y_1'",
  "\\delta \\int L(q, \\dot{q}, t) dt = 0",

  // --- GEOMETRY & MATH ---
  "a^2 + b^2 = c^2",
  "e^{i\\theta} = \\cos \\theta + i\\sin \\theta",
  "V = \\frac{4}{3}\\pi r^3",
  "A = 4\\pi r^2",
  "\\kappa = \\frac{|\\mathbf{r}' \\times \\mathbf{r}''|}{|\\mathbf{r}'|^3}",
  "\\cos(A) = \\frac{b^2 + c^2 - a^2}{2bc}",
  "\\det(A - \\lambda I) = 0",
  "e^{i\\pi} + 1 = 0",

  // --- CONTROL SYSTEMS ---
  "G(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}",
  "u(t) = K_p e(t) + K_i \\int e(t)dt + K_d \\frac{de}{dt}",
  "\\dot{\\mathbf{x}} = \\mathbf{Ax} + \\mathbf{Bu}"
];

const COLORS = [
  "#00FF41", // Terminal Green
  "#00f2ff", // Cyan
  "#facc15", // Yellow
  "#3b82f6", // Blue
  "#ef4444"  // Red
];

const EquationRain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    const height = window.innerHeight;

    const initRain = () => {
      if (!containerRef.current || isCancelled) return;
      
      const katex = (window as any).katex;
      if (!katex) {
        setTimeout(initRain, 150);
        return;
      }

      const container = containerRef.current;
      container.innerHTML = ''; 
      
      // Slightly increased density as requested (from 12 to 18)
      const count = 18; 
      const drops: { el: HTMLElement; y: number; speed: number }[] = [];

      for (let i = 0; i < count; i++) {
        const dropEl = document.createElement('div');
        dropEl.className = 'absolute whitespace-nowrap pointer-events-none select-none';
        dropEl.style.fontSize = '14px'; 
        dropEl.style.willChange = 'transform';
        
        const latex = EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)];
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        
        try {
          const html = katex.renderToString(latex, { 
            throwOnError: false,
            displayMode: false 
          });
          dropEl.innerHTML = html;
        } catch (e) {
          dropEl.textContent = latex;
        }

        dropEl.style.color = color;
        dropEl.style.opacity = '0.22'; 
        dropEl.style.textShadow = `0 0 10px ${color}, 0 0 15px ${color}aa, 0 0 20px ${color}66`;
        dropEl.style.left = `${Math.random() * 90}%`;
        
        // Initial spread
        const y = Math.random() * -height * 3;
        // Slightly increased speed (from 0.1-0.3 to 0.15-0.4)
        const speed = 0.15 + Math.random() * 0.25;
        
        dropEl.style.transform = `translate3d(0, ${y}px, 0)`;
        container.appendChild(dropEl);
        
        drops.push({ el: dropEl, y, speed });
      }

      const animate = () => {
        if (isCancelled) return;
        
        for (let i = 0; i < drops.length; i++) {
          const drop = drops[i];
          drop.y += drop.speed;
          
          if (drop.y > height + 250) {
            drop.y = -400;
            drop.el.style.left = `${Math.random() * 90}%`;
            
            const newLatex = EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)];
            const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            try {
              const html = katex.renderToString(newLatex, { throwOnError: false });
              drop.el.innerHTML = html;
              drop.el.style.color = newColor;
              drop.el.style.textShadow = `0 0 10px ${newColor}, 0 0 15px ${newColor}aa, 0 0 20px ${newColor}66`;
            } catch (e) {}
          }
          
          drop.el.style.transform = `translate3d(0, ${drop.y}px, 0)`;
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    initRain();

    return () => {
      isCancelled = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: 'transparent' }}
    />
  );
};

export default EquationRain;
