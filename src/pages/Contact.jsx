import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, Phone, ArrowUpRight, X, MapPin } from 'lucide-react';
import doorImg from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_986_a201ffbf33d8f69540dc8f921d00e929-uncropped_scaled_within_1344_1008.jpg';

// v1.1: layouts now diverge between desktop and mobile (both render below;
// CSS picks the right one). Both fit on screen WITHOUT scrolling.
//
//   DESKTOP — image fills the left half with eyebrow/title/intro overlaid
//             on top of it (no more text below the image). The right
//             rectangle uses #1F2D1E and shows only Email / Phone / Studio.
//
//   MOBILE  — image fills the viewport as the background. Eyebrow/title/
//             intro float on the upper portion. A compact #1F2D1E info
//             panel sits anchored to the bottom with Email / Phone /
//             Studio rows — all visible without scrolling.
//
// Slide-up open animation (v0.9) is preserved.

const PANEL_BG = '#1F2D1E';

export default function Contact({ onClose }) {
  const wrapRef    = useRef(null);
  const closing    = useRef(false);

  const handleClose = () => {
    if (closing.current) return;
    closing.current = true;
    gsap.to(wrapRef.current, {
      yPercent: 100,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: onClose,
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(wrapRef.current, { yPercent: 100, autoAlpha: 1 });
      gsap.to(wrapRef.current, {
        yPercent: 0,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.cn-image', {
        scale: 1.14,
        duration: 1.6,
        ease: 'power2.out',
        delay: 0.3,
      });
      gsap.from('.cn-line', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.35,
      });
      gsap.from('.cn-panel', {
        y: 60,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        delay: 0.5,
      });
      gsap.from('.cn-row', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.75,
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[100] bg-deep text-white overflow-hidden"
      role="dialog"
      aria-modal="true"
      style={{ opacity: 0 }}
    >
      {/* Close button — top left */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close contact"
        className="
          fixed top-6 left-6 md:top-8 md:left-8 z-[120]
          inline-flex items-center justify-center
          w-12 h-12 md:w-14 md:h-14 rounded-full
          bg-white/10 hover:bg-white text-white hover:text-deep
          border border-white/25 backdrop-blur-md
          transition-all duration-300 ease-out
          hover:scale-[1.08] hover:-translate-y-[2px]
          shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]
        "
      >
        <X size={22} strokeWidth={2.2} />
      </button>

      {/* ====================== DESKTOP LAYOUT ====================== */}
      {/* v1.2: one BIG rounded parent card centered on the page. Its left
          half holds the image (no separate card — the image IS the parent
          card on the left) with eyebrow / title / intro overlaid on it.
          A smaller `#1F2D1E` info card sits inset on the right half. */}
      <section className="hidden md:flex relative w-full h-[100svh] items-center justify-center px-8 lg:px-12">
        <div
          className="
            relative w-full max-w-[1440px] h-[86vh] max-h-[860px]
            rounded-[2rem] lg:rounded-[2.5rem]
            overflow-hidden border border-white/10
            shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]
            grid grid-cols-12
          "
        >
          {/* LEFT half of the parent card — image fills it, text overlaid */}
          <div className="relative col-span-7 h-full overflow-hidden">
            <img
              src={doorImg}
              alt="Front entrance of an ABR custom home"
              className="cn-image absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/55" />

            <div className="relative z-10 h-full flex flex-col justify-start pt-14 lg:pt-20 px-10 lg:px-14 pb-12">
              <p className="cn-line font-mono text-[11px] lg:text-[13px] tracking-[0.4em] uppercase text-gold mb-5">
                Get in touch
              </p>
              <h2 className="cn-line font-display text-white text-[clamp(2.5rem,4.4vw,4.25rem)] leading-[0.95] tracking-tight max-w-xl">
                Let&apos;s build <em className="not-italic italic text-gold">together.</em>
              </h2>
              <p className="cn-line mt-6 max-w-md font-sans text-white/85 text-base lg:text-lg leading-relaxed">
                Step into a process built around your life — from the first sketch to the final key handover.
              </p>
            </div>
          </div>

          {/* RIGHT half — #1F2D1E info section, flush with the parent card
              edge (no inner sub-card). Reach-us header + 3 rows. */}
          <div
            className="cn-panel col-span-5 h-full flex flex-col"
            style={{ backgroundColor: PANEL_BG }}
          >
            <div className="px-8 lg:px-12 pt-12 lg:pt-16 pb-7 border-b border-white/10">
              <p className="font-mono text-[10px] lg:text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                Reach us
              </p>
              <h3 className="font-display text-white text-[clamp(1.65rem,2.4vw,2.5rem)] leading-[1.05] tracking-tight">
                Direct lines to the studio.
              </h3>
            </div>

            <ul className="divide-y divide-white/10 flex-1">
              <ContactRow icon={Mail}   label="Email"  value="abr@email.com"   href="mailto:abr@email.com" />
              <ContactRow icon={Phone}  label="Phone"  value="352-000-0000"    href="tel:3520000000" />
              <ContactRow icon={MapPin} label="Studio" value="Gainesville, FL" href="#" />
            </ul>
          </div>
        </div>
      </section>

      {/* ====================== MOBILE LAYOUT ====================== */}
      {/* v1.2: text + info card are now ONE group centered on the screen
          (no more anchoring to top/bottom). The info card uses a translucent
          #1F2D1E (rgba) so the background image bleeds through, with the
          text on top still fully legible. */}
      <section className="md:hidden relative w-full h-[100svh] overflow-hidden">
        {/* Image as full-bleed background */}
        <img
          src={doorImg}
          alt="Front entrance of an ABR custom home"
          className="cn-image absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />

        {/* Centered text + card group */}
        <div className="relative z-10 h-full flex flex-col items-stretch justify-center px-5 py-20 gap-6">
          <div>
            <p className="cn-line font-mono text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
              Get in touch
            </p>
            <h2 className="cn-line font-display text-white text-[clamp(2.25rem,9vw,3.25rem)] leading-[0.95] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              Let&apos;s build <em className="not-italic italic text-gold">together.</em>
            </h2>
            <p className="cn-line mt-3 font-sans text-white/90 text-sm leading-relaxed max-w-[34ch] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              From first sketch to final key handover — built around your life.
            </p>
          </div>

          {/* Info rectangle — translucent #1F2D1E so the image shows through */}
          <div
            className="cn-panel w-full rounded-[1.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] border border-white/15 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(31, 45, 30, 0.7)' }}
          >
            <div className="px-5 pt-4 pb-3 border-b border-white/10">
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-gold">
                Reach us
              </p>
            </div>
            <ul className="divide-y divide-white/10">
              <ContactRow icon={Mail}   label="Email"  value="abr@email.com"   href="mailto:abr@email.com" compact />
              <ContactRow icon={Phone}  label="Phone"  value="352-000-0000"    href="tel:3520000000"        compact />
              <ContactRow icon={MapPin} label="Studio" value="Gainesville, FL" href="#"                     compact />
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

// Single contact row inside the info rectangle. `compact` mode tightens
// padding + type so all three rows fit on mobile without scrolling.
function ContactRow({ icon: Icon, label, value, href, compact = false }) {
  return (
    <li>
      <a
        href={href}
        className={`
          cn-row group flex items-center transition-colors duration-300
          hover:bg-white/[0.04]
          ${compact ? 'gap-4 px-5 py-3.5' : 'gap-5 md:gap-7 px-7 md:px-12 py-5 md:py-6'}
        `}
      >
        <span className={`
          shrink-0 inline-flex items-center justify-center rounded-full
          bg-gold/15 text-gold
          group-hover:bg-gold group-hover:text-deep
          transition-colors duration-300
          ${compact ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'}
        `}>
          <Icon size={compact ? 18 : 22} strokeWidth={1.8} />
        </span>
        <div className="flex-1 min-w-0">
          <div className={`
            font-mono uppercase text-white/55 mb-0.5 tracking-[0.3em]
            ${compact ? 'text-[9px]' : 'text-[10px] md:text-[11px] mb-1'}
          `}>
            {label}
          </div>
          <div className={`
            font-display text-white leading-tight truncate
            ${compact ? 'text-[1.05rem]' : 'text-[clamp(1.35rem,2.4vw,1.875rem)]'}
          `}>
            {value}
          </div>
        </div>
        <span className={`
          shrink-0 inline-flex items-center justify-center rounded-full
          bg-white/5 text-white/70
          group-hover:bg-gold group-hover:text-deep
          group-hover:-translate-y-[2px] group-hover:translate-x-[2px]
          transition-all duration-300
          ${compact ? 'w-8 h-8' : 'w-10 h-10'}
        `}>
          <ArrowUpRight size={compact ? 15 : 18} />
        </span>
      </a>
    </li>
  );
}
