import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LetsTalkCTA from '../components/LetsTalkCTA';

import heroImg from '../../assets/Greystone 3981 NW 63rd/14__mg_1984.jpg';
import portraitImg from '../../assets/Greystone 3981 NW 63rd/10__mg_1942.jpg';
import craftImg from '../../assets/Greystone 3981 NW 63rd/12__mg_1975.jpg';

const VALUES = [
  {
    label: 'Craft',
    title: 'Built by hand, every time.',
    body: 'No catalogue plans, no cookie-cutter shortcuts. Every home is drawn from your life and detailed by the people who will pour, frame, and finish it.',
  },
  {
    label: 'Care',
    title: 'A relationship, not a transaction.',
    body: 'You will know the project lead by name. You will walk the site weekly. You will see invoices before they are paid. That is the standard.',
  },
  {
    label: 'Calm',
    title: 'A slow, deliberate process.',
    body: 'We build a small number of homes each year. That cap protects quality, protects your timeline, and protects the calm a custom build deserves.',
  },
];

export default function About() {
  const heroRef    = useRef(null);
  const storyRef   = useRef(null);
  const valuesRef  = useRef(null);
  const portraitRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.ab-hero-bg', { scale: 1.15, duration: 2.4, ease: 'power2.out' }, 0)
        .from('.ab-eyebrow', { y: 24, opacity: 0, duration: 1.0 }, 0.3)
        .from('.ab-title .word', { y: 80, opacity: 0, duration: 1.1, stagger: 0.05 }, 0.45)
        .from('.ab-sub', { y: 20, opacity: 0, duration: 0.9 }, 0.8);

      gsap.from('.ab-story-line', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: storyRef.current, start: 'top 70%' },
      });

      gsap.from('.ab-value', {
        y: 60,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: valuesRef.current, start: 'top 70%' },
      });

      gsap.from('.ab-portrait-img', {
        scale: 1.12,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: portraitRef.current, start: 'top 75%' },
      });
      gsap.from('.ab-portrait-line', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: portraitRef.current, start: 'top 65%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const splitWords = (s) =>
    s.split(' ').map((w, i) => (
      <span key={i} className="word inline-block mr-3 md:mr-5 last:mr-0">
        {w}
      </span>
    ));

  return (
    <>
      {/* ============== HERO ============== */}
      <section ref={heroRef} className="relative w-full min-h-[100svh] overflow-hidden bg-deep">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="An ABR home exterior" className="ab-hero-bg w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-deep" />
        </div>
        <div className="relative z-10 max-w-[1780px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-16 min-h-[100svh] flex flex-col justify-center">
          <p className="ab-eyebrow font-mono text-[11px] md:text-[13px] tracking-[0.4em] text-white/80 uppercase mb-6">
            About ABR
          </p>
          <h1 className="ab-title font-sans font-bold uppercase text-white text-[clamp(3rem,11vw,9rem)] leading-[0.92] tracking-tight">
            {splitWords('A boutique builder.')}
          </h1>
          <p className="ab-sub mt-6 max-w-2xl font-sans text-white/85 text-lg md:text-xl leading-relaxed">
            ABR Developers builds a small number of custom luxury homes each year across Florida — for clients who want one home built right, not many homes built fast.
          </p>
        </div>
      </section>

      {/* ============== STORY ============== */}
      <section ref={storyRef} className="relative w-full bg-deep py-20 md:py-32">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5">
            <h2 className="ab-story-line font-display text-white text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight">
              Our <em className="not-italic italic">story</em>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 font-sans text-white/80 text-lg leading-[1.7]">
            <p className="ab-story-line">
              ABR Developers was founded on a quiet conviction: that the home a family lives in should be drawn from the way they actually live — not from a marketing brochure.
            </p>
            <p className="ab-story-line">
              We work with discerning clients across Florida who want a partner, not a vendor. Every project begins with long conversations, careful sketches, and a slow walk of the land. We translate those into a precise, build-ready plan and stay on-site through the final walkthrough.
            </p>
            <p className="ab-story-line">
              Today, ABR remains intentionally small. A handful of projects each year, led personally, finished personally, and stood behind for the long term.
            </p>
          </div>
        </div>
      </section>

      {/* ============== VALUES ============== */}
      <section ref={valuesRef} className="relative w-full bg-deep py-20 md:py-32 border-t border-white/10">
        <div className="max-w-[1780px] mx-auto px-6 md:px-12">
          <h2 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight mb-12 md:mb-16">
            What we <em className="not-italic italic">stand for</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {VALUES.map((v) => (
              <div key={v.label} className="ab-value">
                <p className="font-mono text-[11px] md:text-[13px] tracking-[0.4em] text-gold uppercase mb-5">
                  {v.label}
                </p>
                <h3 className="font-display text-white text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.1] tracking-tight mb-4">
                  {v.title}
                </h3>
                <p className="font-sans text-white/70 text-base md:text-lg leading-[1.7]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PORTRAIT ============== */}
      <section ref={portraitRef} className="relative w-full bg-deep py-20 md:py-32 overflow-hidden">
        <div className="max-w-[1780px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 overflow-hidden aspect-[4/5]">
            <img src={portraitImg} alt="An ABR project interior" className="ab-portrait-img w-full h-full object-cover" />
          </div>
          <div className="md:col-span-6">
            <h2 className="font-display text-white text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] tracking-tight">
              <span className="ab-portrait-line block">Florida is</span>
              <span className="ab-portrait-line block"><em className="not-italic italic">home.</em></span>
            </h2>
            <div className="mt-8 space-y-5 font-sans text-white/80 text-lg leading-[1.7]">
              <p className="ab-portrait-line">
                We build only in Florida, and we know its land — the sandy soils of the Gulf, the limestone bedrock of the central ridge, the salt air of the Atlantic coast. Every plan answers to that ground.
              </p>
              <p className="ab-portrait-line">
                That focus is intentional. We are slow to expand because we are committed to the place we already build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== HEAD CRAFTSMAN IMAGE ============== */}
      <section className="relative w-full bg-deep overflow-hidden">
        <div className="max-w-[1780px] mx-auto px-6 md:px-12 py-10 md:py-16">
          <div className="overflow-hidden aspect-[16/7]">
            <img src={craftImg} alt="Detail of ABR craftsmanship" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <LetsTalkCTA eyebrow="Build with us" />
    </>
  );
}
