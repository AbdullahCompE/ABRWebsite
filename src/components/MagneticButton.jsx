import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const VARIANTS = {
  brown:   'bg-brown text-white',
  sage:    'bg-sage text-white',
  gold:    'bg-gold text-deep',
  outline: 'bg-transparent text-white border border-white/40',
  light:   'bg-white text-deep',
};

const HOVER_BG = {
  brown:   'bg-[#3f2a1d]',
  sage:    'bg-[#4a5530]',
  gold:    'bg-[#b8962d]',
  outline: 'bg-white/10',
  light:   'bg-deep',
};

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  variant = 'brown',
  size = 'md',
}) {
  const btnRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const btn = btnRef.current;
      if (!btn) return;
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.18, y: y * 0.18, duration: 0.4, ease: 'power3.out' });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
      };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
    return () => ctx.revert();
  }, []);

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  const baseStyle =
    `magnetic-btn relative inline-flex items-center justify-center font-sans font-semibold tracking-tight rounded-full transition-colors duration-300 overflow-hidden ${sizes[size]}`;

  const Cmp = href ? 'a' : 'button';

  const props = href ? { href } : { type: 'button', onClick };

  return (
    <Cmp ref={btnRef} className={`${baseStyle} ${VARIANTS[variant]} ${className}`} {...props}>
      <span className={`hover-bg ${HOVER_BG[variant]}`}></span>
      <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">{children}</span>
    </Cmp>
  );
}
