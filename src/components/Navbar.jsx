import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { ROUTES } from '../router';
import logoWhite from '../../assets/logo/ABR Developers Logo-white.png';

const LINKS = [
  { label: 'Home',              to: ROUTES.home },
  { label: 'Past Projects',     to: ROUTES.pastProjects },
  { label: 'Upcoming Projects', to: ROUTES.upcoming },
  { label: 'About us',          to: ROUTES.about },
];

export default function Navbar({ currentPath, navigate }) {
  const navRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Toggle morph class once user scrolls past the hero band
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  // Intro animation: nav drops in from top
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.15,
      });
    });
    return () => ctx.revert();
  }, []);

  const handleClick = (e, link) => {
    if (link.anchor) return;
    e.preventDefault();
    navigate(link.to);
    setOpen(false);
  };

  const handleLogo = (e) => {
    e.preventDefault();
    navigate(ROUTES.home);
    setOpen(false);
  };

  return (
    <div
      id="nav-rail"
      className="fixed top-4 md:top-6 left-0 w-full z-50 flex justify-center px-3 md:px-6 transition-transform duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)] [&.nav-hidden]:-translate-y-[150%]"
    >
      <nav
        ref={navRef}
        className="
          group/nav relative flex items-center justify-between w-full max-w-[1400px]
          rounded-full pr-3 md:pr-4 pl-2 py-1.5
          transition-[background-color,color,box-shadow,backdrop-filter] duration-500 ease-out
          bg-transparent text-white border-0 shadow-none
          [&.nav-scrolled]:bg-white/10
          [&.nav-scrolled]:backdrop-blur-xl
          [&.nav-scrolled]:text-white
          [&.nav-scrolled]:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.35)]
        "
      >
        {/* Logo section — no background in any state (v0.6) */}
        <a
          href={ROUTES.home}
          onClick={handleLogo}
          className="flex items-center gap-3 px-3 md:px-4 py-1 md:py-1.5 bg-transparent"
        >
          <span className="relative inline-block h-10 md:h-12 w-auto">
            <img
              src={logoWhite}
              alt="ABR Developers"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </span>
          <span className="font-sans font-bold text-lg md:text-xl tracking-[0.08em] text-white transition-colors duration-500">
            ABR
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.to}
              onClick={(e) => handleClick(e, link)}
              className={`link-hover font-sans font-medium text-[15px] tracking-tight ${
                currentPath === link.to ? 'active' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
          <MagneticButton
            variant="brown"
            size="sm"
            className="!px-6 !py-2.5 text-[15px]"
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
          >
            Contact Us
          </MagneticButton>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Mobile drawer */}
        <div
          className={`lg:hidden absolute top-[calc(100%+10px)] left-0 right-0 rounded-[2rem] bg-white text-deep shadow-2xl overflow-hidden transition-all duration-300 origin-top ${
            open ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-1 p-5">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => handleClick(e, link)}
                className="font-sans font-medium text-base py-3 px-3 rounded-2xl hover:bg-deep/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 bg-brown text-white rounded-full px-6 py-3 text-center font-semibold"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('open-contact'));
                setOpen(false);
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
