import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LetsTalkCTA from '../components/LetsTalkCTA';

import heroMap from '../../assets/zoom/2.png';
import neighborhoodImg from '../../assets/zoom/2.png';
import apartmentsImg from '../../assets/zoom/2.png';

// v0.4: condensed timeline — exactly 4 phases labelled by month range.
const PHASES = [
  {
    month: 'Month 1-3',
    title: 'Planning, Permits & Foundation',
    body:
      'We evaluate the land with you, finalize blueprints, and secure municipal permits. Crews then clear the site, grade the earth, and pour the concrete footings and foundation slab.',
  },
  {
    month: 'Month 4-6',
    title: 'Structural Framing & Weatherproofing',
    body:
      'The skeleton goes up. We erect the structural framing, define rooflines and rooms, then dry-in the structure with roof, windows, and exterior moisture barriers — readying the build for interior trades.',
  },
  {
    month: 'Month 7-9',
    title: 'Rough Utilities, Insulation & Drywall',
    body:
      'Specialized contractors route plumbing, electrical, and HVAC through the open walls. We then install thermal insulation, hang and tape drywall, and prime the new interior surfaces.',
  },
  {
    month: 'Month 10-12',
    title: 'Finishes, Punch List & Handover',
    body:
      'Cabinetry, stone, millwork, lighting, fixtures, and the final coats of paint. We walk the home with you, work the punch list, and complete a slow, unhurried handover of the keys.',
  },
];

export default function Upcoming() {
  const heroRef = useRef(null);
  const neighborhoodRef = useRef(null);
  const apartmentsRef = useRef(null);
  const blueprintRef = useRef(null);
  const timelineColRef = useRef(null);
  const stickyRef = useRef(null);

  // Hero
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-bg-img', { scale: 1.18, duration: 2.6, ease: 'power2.out' }, 0)
        .from('.up-eyebrow', { y: 24, opacity: 0, duration: 1.0 }, 0.3)
        .from('.up-title .word', { y: 90, opacity: 0, duration: 1.2, stagger: 0.06 }, 0.45)
        .from('.up-sub', { y: 20, opacity: 0, duration: 0.9 }, 0.8);
    });
    return () => ctx.revert();
  }, []);

  // Neighborhood & Apartments parallax/reveal
  useEffect(() => {
    let ctx = gsap.context(() => {
      [neighborhoodRef.current, apartmentsRef.current].forEach((sec) => {
        if (!sec) return;
        gsap.from(sec.querySelector('.card-img'), {
          scale: 1.12,
          opacity: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: sec, start: 'top 75%' },
        });
        gsap.from(sec.querySelectorAll('.card-text .line'), {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sec, start: 'top 70%' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // Blueprint timeline — v0.8: rebuilt to match example/timeline-reference.html
  // (sticky title + gold dot pinned on the dividing line, year + text items
  // on the right column). Entrance fades retained from prior versions.
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.blueprint-line, .blueprint-body', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: blueprintRef.current, start: 'top 70%' },
      });
      // Each phase fades in from below as it enters the viewport.
      gsap.utils.toArray('.phase').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // v0.5: hide the global navbar while the user is inside the timeline.
      ScrollTrigger.create({
        trigger: blueprintRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleClass: { className: 'nav-hidden', targets: '#nav-rail' },
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
      {/* v0.9 (mobile): hero shrinks to ~70svh on phones (matches PastProjects),
          so the user reaches the content sections sooner. Desktop unchanged. */}
      <section ref={heroRef} className="relative w-full min-h-[70svh] md:min-h-[100svh] overflow-hidden bg-deep">
        <div className="absolute inset-0 z-0">
          <img src={heroMap} alt="Florida regional map" className="hero-bg-img w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-deep" />
        </div>

        <div className="relative z-10 max-w-[1780px] mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-12 md:pb-16 min-h-[70svh] md:min-h-[100svh] flex flex-col justify-center">
          <p className="up-eyebrow font-mono text-[11px] md:text-[13px] tracking-[0.4em] text-white/80 uppercase mb-6">
            Projects in the pipeline
          </p>
          <h1 className="up-title font-sans font-bold uppercase text-white text-[clamp(3rem,11vw,9rem)] leading-[0.92] tracking-tight">
            {splitWords('Upcoming…')}
          </h1>
          <p className="up-sub mt-6 max-w-xl font-sans text-white/85 text-lg md:text-xl leading-relaxed">
            Projects we are working on — neighborhoods, residences, and rental developments shaping Florida&apos;s near future.
          </p>
        </div>
      </section>

      {/* ============== PREMIUM NEIGHBORHOODS — v0.4: rounded corners removed; tightened so text fits ============== */}
      {/* v0.9 (mobile): tighter top/bottom padding so the gap between sections
          is shorter on phones. Desktop padding unchanged. */}
      <section ref={neighborhoodRef} className="relative w-full bg-deep py-8 md:py-24">
        <div className="max-w-[1780px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="card-img lg:col-span-6 img-zoom overflow-hidden aspect-[4/3] lg:aspect-[16/12]">
            <img src={neighborhoodImg} alt="Aerial view of a premium neighborhood" className="w-full h-full object-cover" />
          </div>
          <div className="card-text lg:col-span-6 lg:pl-4 min-w-0">
            <h2 className="font-display font-medium text-white text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[0.95] tracking-tight break-words">
              <span className="line block">PREMIUM</span>
              <span className="line block">NEIGHBORHOODS</span>
            </h2>
            <p className="line mt-6 max-w-[34ch] text-white/75 text-base md:text-lg leading-relaxed">
              Master-planned communities where every street, lot, and shared space is choreographed for quiet privilege.
            </p>
          </div>
        </div>
      </section>

      {/* ============== RENTAL APARTMENTS — v0.4: rounded corners removed ============== */}
      {/* v0.9 (mobile): tighter top/bottom padding to reduce inter-section gap. */}
      <section ref={apartmentsRef} className="relative w-full bg-deep py-8 md:py-24">
        <div className="max-w-[1780px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="card-text lg:col-span-6 order-2 lg:order-1 lg:pr-4 min-w-0">
            <h2 className="font-display font-medium text-white text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[0.95] tracking-tight break-words">
              <span className="line block">RENTAL</span>
              <span className="line block">APARTMENTS</span>
            </h2>
            <p className="line mt-6 max-w-[34ch] text-white/75 text-base md:text-lg leading-relaxed">
              Boutique multi-family residences with the finish quality of a custom home — designed for long-term value.
            </p>
          </div>
          <div className="card-img lg:col-span-6 order-1 lg:order-2 img-zoom overflow-hidden aspect-[4/3] lg:aspect-[16/12]">
            <img src={apartmentsImg} alt="Aerial view of new rental apartments" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ============== THE ABR BLUEPRINT — v0.8: re-skinned to match
           example/timeline-reference.html. Two columns separated by a 1px
           vertical line; left column has a sticky title with a gold disc
           pinned ON the divider, right column holds the phase entries. ============== */}
      {/* v0.9 (mobile): much tighter padding above + below the timeline so the
          end of the page sits closer to the last phase. Desktop unchanged. */}
      <section ref={blueprintRef} className="relative w-full bg-deep pt-12 pb-16 md:pt-44 md:pb-64">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:justify-between">

            {/* LEFT column — sticky title, subheading, gold dot on divider */}
            <div className="relative w-full md:w-[calc(50%-40px)] pb-0 md:pb-20">
              {/* 1px vertical divider line between the two columns (desktop) */}
              <span
                aria-hidden="true"
                className="hidden md:block absolute top-0 bottom-0 -right-5 w-px bg-white/45"
              />

              <div ref={stickyRef} className="md:sticky md:top-[20vh] relative">
                <h2 className="blueprint-line font-display font-normal text-white text-left text-[clamp(2.5rem,6.5vw,6rem)] leading-[1] tracking-[-0.02em] mb-4">
                  The ABR Blueprint
                </h2>
                <p className="blueprint-body font-sans text-white/80 text-left text-[13px] md:text-[15px] tracking-[0.18em] uppercase leading-[1.5] max-w-md">
                  A twelve-month process, broken into four chapters of work — each chapter led personally and stood behind for the long term.
                </p>

                {/* Solid gold disc pinned onto the divider line, vertically
                    aligned with the heading (matches .history-title::after
                    in the reference).
                    POSITION TUNING:
                      - top-[2.6rem]      → vertical position vs. the heading
                      - -right-[Xpx]      → MUST match the divider line's
                                            "-right-5" (= -right-[20px]) for
                                            the dot to sit on the line
                      - translate-x-1/2   → centers the dot on that anchor
                      - w-[18px] h-[18px] → dot size                          */}
                <span
                  aria-hidden="true"
                  className="hidden md:block absolute top-[2.6rem] -right-[20px] translate-x-1/2 w-[18px] h-[18px] rounded-full bg-gold"
                />
              </div>
            </div>

            {/* RIGHT column — stacked phase items, each with a gold display
                "year"-style label, title and body. */}
            <div
              ref={timelineColRef}
              className="w-full md:w-[calc(50%-40px)] mt-16 md:mt-0"
            >
              {PHASES.map((phase, i) => (
                <article
                  key={i}
                  className={`phase max-w-[460px] ${
                    i === PHASES.length - 1 ? '' : 'mb-24 md:mb-[18rem]'
                  }`}
                >
                  <div className="font-display font-normal text-gold text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.3] mb-4">
                    {phase.month}
                  </div>
                  <h3 className="font-display text-white text-[clamp(1.35rem,2.2vw,1.875rem)] leading-[1.2] tracking-tight mb-3">
                    {phase.title}
                  </h3>
                  <p className="font-sans text-white/80 text-base md:text-lg leading-[1.6]">
                    {phase.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== LET'S TALK CTA (v0.4 — replaces the old contact block) ============== */}
      <LetsTalkCTA eyebrow="Invest with ABR" />
    </>
  );
}
