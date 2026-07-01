import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Facebook, ArrowUpRight } from 'lucide-react';
import doorImg from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_986_a201ffbf33d8f69540dc8f921d00e929-uncropped_scaled_within_1344_1008.jpg';

export default function ContactCTA({
  headlineTop = 'ENVISION YOUR',
  headlineMid = 'FUTURE WITH',
  brand = 'ABR',
  intro,
}) {
  const wrapRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.cta-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 70%' },
      });
      gsap.from('.cta-row', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 60%' },
      });
      gsap.from('.cta-image', {
        scale: 1.12,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 80%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} className="relative w-full bg-deep py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1780px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* Image */}
        <div className="img-zoom relative overflow-hidden aspect-[4/5] lg:aspect-auto lg:min-h-[600px]">
          <img
            src={doorImg}
            alt="Front entrance of an ABR custom home"
            className="cta-image absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Sage box */}
        <div className="relative bg-sage px-8 md:px-14 lg:px-16 py-12 md:py-16 lg:py-20 text-white flex flex-col justify-center">
          <div className="font-display tracking-[0.04em] leading-[0.95]">
            {headlineTop && <div className="cta-line text-[clamp(2.5rem,5.5vw,5.5rem)]">{headlineTop}</div>}
            {headlineMid && <div className="cta-line text-[clamp(2.5rem,5.5vw,5.5rem)]">{headlineMid}</div>}
            <div className="cta-line text-[clamp(3rem,7vw,6.5rem)] mt-2 tracking-[0.08em]">{brand}</div>
          </div>

          {intro && (
            <p className="cta-line mt-6 max-w-md font-sans text-white/85 text-lg md:text-xl leading-relaxed">
              {intro}
            </p>
          )}

          <div className="mt-10 md:mt-12 flex flex-col gap-4 font-display text-2xl md:text-[28px]">
            <a href="mailto:abr@email.com" className="cta-row group inline-flex items-center gap-4 hover:text-white/70 transition-colors">
              <Mail size={22} className="opacity-70" />
              <span>Email: abr@email.com</span>
              <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="#" className="cta-row group inline-flex items-center gap-4 hover:text-white/70 transition-colors">
              <Facebook size={22} className="opacity-70" />
              <span>Facebook: abr</span>
              <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a href="tel:3520000000" className="cta-row group inline-flex items-center gap-4 hover:text-white/70 transition-colors">
              <Phone size={22} className="opacity-70" />
              <span>Phone: 352-000-0000</span>
              <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
