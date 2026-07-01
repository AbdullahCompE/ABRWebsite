import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function LetsTalkCTA({ eyebrow = 'More in the works' }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.lt-eyebrow', {
        y: 30,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 70%' },
      });
      gsap.from('.lt-headline .line', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 65%' },
      });
      gsap.from('.lt-cta', {
        y: 30,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: { trigger: wrapRef.current, start: 'top 60%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-contact'));
  };

  return (
    <section
      ref={wrapRef}
      className="relative w-full min-h-[70svh] md:min-h-[100svh] bg-deep flex items-center justify-center overflow-hidden py-16 md:py-0"
    >
      <div className="max-w-[1780px] w-full mx-auto px-6 md:px-12 text-center">
        <p className="lt-eyebrow font-mono text-xs md:text-sm tracking-[0.4em] text-white/55 uppercase mb-8">
          {eyebrow}
        </p>
        <h2 className="lt-headline font-display text-white leading-[0.95] tracking-tight text-[clamp(3rem,9vw,9rem)] max-w-[1400px] mx-auto">
          <span className="line block">Have a property or</span>
          <span className="line block">vision in mind?</span>
          <span className="line block">
            <em className="text-gold not-italic">Let&apos;s talk.</em>
          </span>
        </h2>
        {/* v0.8: now uses MagneticButton so it gets the same cursor-following
            magnetic feel as the "Contact Us" button in the navbar. */}
        <div className="lt-cta mt-12 md:mt-16 inline-block">
          <MagneticButton
            variant="brown"
            size="lg"
            onClick={handleClick}
            className="!px-9 !py-5 !text-lg md:!text-xl"
          >
            Start a conversation <ArrowUpRight size={22} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
