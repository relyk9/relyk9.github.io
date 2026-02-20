
import React, { useEffect, useRef } from 'react';

const EQUATIONS = [
  // --- FLUID DYNAMICS & CFD ---
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
  "\\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot (\\rho \\mathbf{u}) = 0",
  "\\tau_{ij} = \\mu \\left( \\frac{\\partial u_i}{\\partial x_j} + \\frac{\\partial u_j}{\\partial x_i} \\right)",
  "St = \\frac{fL}{U}",
  "We = \\frac{\\rho v^2 L}{\\sigma}",
  "\\frac{P}{\\rho} + \\frac{v^2}{2} + gz = \\text{constant}",
  "\\nabla^2 \\phi = 0",
  "k - \\epsilon \\text{ turbulence model}",
  "Y^+ = \\frac{u_\\tau y}{\\nu}",

  // --- THERMODYNAMICS & ADVANCED HEAT TRANSFER ---
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
  "G = H - TS",
  "A = U - TS",
  "\\left(\\frac{\\partial T}{\\partial V}\\right)_S = -\\left(\\frac{\\partial P}{\\partial S}\\right)_V",
  "\\mu_i = \\left(\\frac{\\partial G}{\\partial n_i}\\right)_{T,P,n_j}",
  "\\oint \\frac{dQ}{T} \\leq 0",
  "x = \\frac{m_{vap}}{m_{tot}}",
  "v = (1-x)v_f + xv_g",
  "\\ln\\frac{P_2}{P_1} = \\frac{\\Delta H_{vap}}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)",
  "Tds = dh - vdP",
  "P_v = P_{sat}(T)",
  "v_{rms} = \\sqrt{\\frac{3RT}{M}}",

  // --- SOLID MECHANICS & MATERIAL SCIENCE ---
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
  "n\\lambda = 2d \\sin\\theta",
  "K_{IC} = Y \\sigma \\sqrt{\\pi a}",
  "\\sigma_{ij} = C_{ijkl} \\epsilon_{kl}",
  "\\sigma_y = \\sigma_0 + k_y d^{-1/2}",
  "\\frac{\\partial C}{\\partial t} = D \\frac{\\partial^2 C}{\\partial x^2}",
  "\\sigma_t = \\sigma(1 + \\epsilon)",
  "\\epsilon_t = \\ln(1 + \\epsilon)",
  "E = 2G(1 + \\nu)",
  "\\sigma_{vM} = \\sqrt{\\frac{(\\sigma_1-\\sigma_2)^2 + (\\sigma_2-\\sigma_3)^2 + (\\sigma_3-\\sigma_1)^2}{2}}",
  "U = \\int \\frac{\\sigma^2}{2E} dV",
  "\\text{Brinell: } HB = \\frac{2P}{\\pi D (D-\\sqrt{D^2-d^2})}",

  // --- ROBOTICS & KINEMATICS ---
  "T = A_1 A_2 \\dots A_n",
  "\\mathbf{v} = \\mathbf{J}\\dot{\\mathbf{q}}",
  "M(q)\\ddot{q} + C(q, \\dot{q})\\dot{q} + g(q) = \\tau",
  "\\frac{d}{dt}\\left(\\frac{\\partial L}{\\partial \\dot{q}}\\right) - \\frac{\\partial L}{\\partial q} = Q",
  "q = w + xi + yj + zk",
  "\\mathbf{x}_{k+1} = \\mathbf{f}(\\mathbf{x}_k, \\mathbf{u}_k) + \\mathbf{w}_k",
  "^A P = ^A T_B ^B P",
  "\\omega_{skew} = \\begin{bmatrix} 0 & -\\omega_z & \\omega_y \\\\ \\omega_z & 0 & -\\omega_x \\\\ -\\omega_y & \\omega_x & 0 \\end{bmatrix}",
  "\\tau = \\mathbf{J}^T \\mathbf{F}",
  "L = T - V",
  "\\xi = [v, \\omega]^T",
  "\\text{Ad}_T \\xi",
  "\\mathbf{p} = \\exp(\\hat{\\xi}\\theta) \\mathbf{p}_0",

  // --- CONTROL SYSTEMS ---
  "G(s) = \\frac{\\omega_n^2}{s^2 + 2\\zeta\\omega_n s + \\omega_n^2}",
  "u(t) = K_p e(t) + K_i \\int e(t)dt + K_d \\frac{de}{dt}",
  "\\dot{\\mathbf{x}} = \\mathbf{Ax} + \\mathbf{Bu}",
  "\\mathbf{y} = \\mathbf{Cx} + \\mathbf{Du}",
  "H(s) = \\mathbf{C}(s\\mathbf{I}-\\mathbf{A})^{-1}\\mathbf{B} + \\mathbf{D}",
  "\\det(s\\mathbf{I} - \\mathbf{A}) = 0",
  "K = P C^T (C P C^T + R)^{-1}",
  "GM = 20 \\log_{10} \\frac{1}{|KG(j\\omega_{180})|}",
  "PM = 180^\\circ + \\angle KG(j\\omega_{gc})",
  "s = \\sigma + j\\omega",
  "S = (I + L)^{-1}",
  "T = L(I + L)^{-1}",
  "J = \\int_0^\\infty (x^T Q x + u^T R u) dt",

  // --- DYNAMICS & VIBRATIONS ---
  "\\omega_n = \\sqrt{\\frac{k}{m}}",
  "x(t) = Xe^{-\\zeta \\omega_n t}\\cos(\\omega_d t - \\phi)",
  "\\sum M_G = I_G \\alpha",
  "T = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2",
  "\\vec{H}_O = \\vec{r} \\times m\\vec{v}",
  "f_n = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}",
  "c_c = 2\\sqrt{km}",
  "m\\ddot{x} + c\\dot{x} + kx = F_0\\sin(\\omega t)",
  "I = \\int r^2 dm",
  "\\vec{L} = \\vec{r} \\times \\vec{p}",
  "\\delta = \\ln(x_1/x_2)",

  // --- MANUFACTURING & MACHINING ---
  "VT^n = C",
  "\\tan \\phi = \\frac{r \\cos \\alpha}{1 - r \\sin \\alpha}",
  "P_c = F_c v",
  "MRR = v f d",
  "R_a = \\frac{f^2}{32R}",
  "H = \\frac{2P}{\\pi D (D - \\sqrt{D^2 - d^2})}",
  "\\lambda_{pulse} = \\frac{c}{f}",
  "\\sigma_f = \\frac{3FL}{2bh^2}",
  "\\text{Merchant's Circle}",

  // --- MATHEMATICAL FOUNDATIONS ---
  "\\nabla^2 \\psi + k^2 \\psi = 0",
  "\\mathcal{L}\\{f(t)\\} = \\int_0^\\infty e^{-st}f(t)dt",
  "e^{i\\theta} = \\cos \\theta + i\\sin \\theta",
  "\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{S}",
  "\\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}",
  "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n",
  "\\delta(x) = \\begin{cases} \\infty, & x=0 \\\\ 0, & x \\neq 0 \\end{cases}"
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
      
      // Density for the rain
      const count = 35; 
      const drops: { el: HTMLElement; y: number; speed: number }[] = [];

      for (let i = 0; i < count; i++) {
        const dropEl = document.createElement('div');
        dropEl.className = 'absolute whitespace-nowrap pointer-events-none select-none';
        dropEl.style.fontSize = '12px'; 
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
        dropEl.style.textShadow = `0 0 8px ${color}, 0 0 12px ${color}88`;
        dropEl.style.left = `${Math.random() * 95}%`;
        
        // Spread the initial vertical position
        const y = Math.random() * -height * 2;
        const speed = 0.2 + Math.random() * 0.45;
        
        dropEl.style.transform = `translate3d(0, ${y}px, 0)`;
        container.appendChild(dropEl);
        
        drops.push({ el: dropEl, y, speed });
      }

      const animate = () => {
        if (isCancelled) return;
        
        for (let i = 0; i < drops.length; i++) {
          const drop = drops[i];
          drop.y += drop.speed;
          
          if (drop.y > height + 200) {
            drop.y = -300;
            drop.el.style.left = `${Math.random() * 95}%`;
            
            const newLatex = EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)];
            const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            try {
              const html = katex.renderToString(newLatex, { throwOnError: false });
              drop.el.innerHTML = html;
              drop.el.style.color = newColor;
              drop.el.style.textShadow = `0 0 8px ${newColor}, 0 0 12px ${newColor}88`;
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
