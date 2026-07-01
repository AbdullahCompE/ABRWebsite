import React from 'react';
import { ROUTES } from '../router';

export default function Footer({ navigate }) {
  const handleNav = (e, to) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <footer
      id="contact"
      style={{ backgroundColor: '#273617' }}
      className="relative w-full text-white rounded-t-[3rem] md:rounded-t-[4rem] px-6 md:px-16 lg:px-20 pt-16 md:pt-20 pb-10 mt-0 overflow-hidden z-20"
    >
      <div className="max-w-[1780px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">

          <div className="flex flex-col gap-3 max-w-sm">
            <h3 className="font-sans font-bold text-2xl md:text-[32px] tracking-tight">ABR Developers</h3>
            <p className="font-sans text-white/55 text-sm leading-relaxed">
              We build custom luxury homes based on
              <br className="hidden sm:inline" />
              your specific needs. Your vision, seamlessly executed.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-20 lg:gap-[126px]">
            {/* v0.9: navigation links now mirror the header (Home, Past
                Projects, Upcoming Projects, About us) one-for-one. */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] tracking-[1.65px] text-gold font-semibold">Navigation</h4>
              <a href={ROUTES.home}          onClick={(e) => handleNav(e, ROUTES.home)}          className="font-sans text-sm text-white/60 hover:text-white transition-colors">Home</a>
              <a href={ROUTES.pastProjects}  onClick={(e) => handleNav(e, ROUTES.pastProjects)}  className="font-sans text-sm text-white/60 hover:text-white transition-colors">Past Projects</a>
              <a href={ROUTES.upcoming}      onClick={(e) => handleNav(e, ROUTES.upcoming)}      className="font-sans text-sm text-white/60 hover:text-white transition-colors">Upcoming Projects</a>
              <a href={ROUTES.about}         onClick={(e) => handleNav(e, ROUTES.about)}         className="font-sans text-sm text-white/60 hover:text-white transition-colors">About us</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] tracking-[1.65px] text-gold font-semibold">Social</h4>
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">Twitter (X)</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-[11px] tracking-[1.65px] text-gold font-semibold">Legal</h4>
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="font-sans text-sm text-white/60 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[12px] text-white/35">
          <div>&copy; {new Date().getFullYear()} ABR Developers. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
