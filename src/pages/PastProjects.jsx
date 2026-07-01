import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, X } from 'lucide-react';

import heroImg from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_1250_dfd527db64f237168eb328ea7a44d8c9-uncropped_scaled_within_1536_1152.jpg';
import project1Img from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_1274_3cbd9f8484ddf54394b89f0e7fd83172-uncropped_scaled_within_1536_1152.jpg';
import project1Detail1 from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_5_hero.png';
import project1Detail2 from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_672_214d2582741dfee4e4ab1c5544acff03-cc_ft_1152.jpg';
import greystoneExt from '../../assets/Greystone 3981 NW 63rd/14__mg_1984.jpg';
import greystoneDetail1 from '../../assets/Greystone 3981 NW 63rd/10__mg_1942.jpg';
import greystoneDetail2 from '../../assets/Greystone 3981 NW 63rd/12__mg_1975.jpg';

const PROJECTS = [
  {
    title: '1001 SW 120th Dr',
    city: 'Gainesville, FL',
    year: '2025',
    status: 'Delivered',
    bedrooms: 4,
    bathrooms: 3,
    area: '3,860 sq ft',
    image: project1Img,
    accent: 'A modern single-family residence on a sprawling lot — designed for natural light, family rhythm, and effortless entertaining.',
    detailBody:
      'Set on more than an acre of mature oak canopy, this four-bedroom residence was drawn around a central great room that opens onto a covered lanai. The kitchen anchors family life — quartzite counters, custom rift-cut white oak cabinetry, and a 60" professional range tucked behind a hidden scullery. The primary suite occupies its own quiet wing with a spa-grade bath, dual closets, and direct pool access.',
    gallery: [project1Detail1, project1Detail2],
    spec: [
      { label: 'Lot', value: '1.2 acres' },
      { label: 'Garage', value: '3-car attached' },
      { label: 'Pool', value: 'Saltwater, gas-heated' },
      { label: 'Delivered', value: 'Q2 2025' },
    ],
  },
  {
    title: 'Greystone',
    city: 'Gainesville, FL',
    year: '2025',
    status: 'Delivered',
    bedrooms: 5,
    bathrooms: 4,
    area: '4,420 sq ft',
    image: greystoneExt,
    accent: 'Architect-led custom home with art-inspired interiors, an open-plan kitchen, and gallery-quality finishes throughout.',
    detailBody:
      'Greystone is a five-bedroom custom home designed in close partnership with its owners — collectors who wanted the architecture to recede so their art could lead. Limewashed plaster walls, white oak floors, and an oversized double-island kitchen create a quiet, museum-like calm. A wing of guest suites doubles as a private gallery for rotating works.',
    gallery: [greystoneDetail1, greystoneDetail2],
    spec: [
      { label: 'Lot', value: '0.9 acres' },
      { label: 'Garage', value: '2-car detached' },
      { label: 'Pool', value: 'Reflecting, lap-style' },
      { label: 'Delivered', value: 'Q1 2025' },
    ],
  },
];

export default function PastProjects() {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const cardsRef = useRef([]);
  // v1.0: two separate "active" states so the card can FADE back in during
  // the close morph (otherwise the card spot stays blank for ~300ms after
  // the overlay unmounts).
  //   • activeIdx     — controls whether the overlay is mounted.
  //   • visibleHideIdx — controls the card's opacity; cleared the moment
  //                      close starts, while the overlay is still morphing.
  const [activeIdx, setActiveIdx] = useState(null);
  const [visibleHideIdx, setVisibleHideIdx] = useState(null);
  const [cardRect, setCardRect] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-bg-img', { scale: 1.18, duration: 2.6, ease: 'power2.out' }, 0)
        .from('.pp-eyebrow', { y: 22, opacity: 0, duration: 1.0 }, 0.3)
        .from('.pp-title .word', { y: 90, opacity: 0, duration: 1.1, stagger: 0.05 }, 0.45)
        .from('.pp-sub', { y: 20, opacity: 0, duration: 0.9 }, 0.85);
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => {
        gsap.from(card.querySelector('.project-img'), {
          scale: 1.12,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
        });
        gsap.from(card.querySelectorAll('.project-text > *'), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 75%' },
        });
        gsap.from(card.querySelector('.project-meta'), {
          y: 20,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 70%' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // Toggle navbar visibility + body scroll lock whenever a card is expanded.
  useEffect(() => {
    const rail = document.getElementById('nav-rail');
    if (activeIdx !== null) {
      rail?.classList.add('nav-hidden');
      document.body.style.overflow = 'hidden';
    } else {
      rail?.classList.remove('nav-hidden');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeIdx]);


  const splitWords = (s) =>
    s.split(' ').map((w, i) => (
      <span key={i} className="word inline-block mr-3 md:mr-5 last:mr-0">
        {w}
      </span>
    ));

  // v1.1: stagger the click sequence so the card's text fades out FIRST,
  // then the overlay mounts and morphs. The 300ms delay matches the card's
  // opacity transition duration — the user sees the title/info finish
  // fading before the box starts expanding.
  const CARD_FADE_MS = 300;
  const handleCardClick = (i) => {
    const el = cardsRef.current[i];
    if (el) {
      const r = el.getBoundingClientRect();
      setCardRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    // Step 1: kick off the fade-out immediately.
    setVisibleHideIdx(i);
    // Step 2: wait one fade-cycle, then mount the overlay → morph begins.
    setTimeout(() => setActiveIdx(i), CARD_FADE_MS);
  };

  // Closing is handled inside the overlay (so it can reverse-animate before
  // the parent unmounts it). It calls `onCloseStart` the moment the user
  // clicks X (so the card can start fading back in WHILE the overlay morphs
  // back) and `onClose` once the morph completes (final unmount).
  const handleCloseStart = () => {
    setVisibleHideIdx(null);
  };
  const handleCloseDetail = () => {
    setActiveIdx(null);
    setCardRect(null);
  };

  return (
    <>
      {/* ============== HERO ============== */}
      {/* v0.9 (mobile): hero is shorter on phones (~70svh) so the gallery
          arrives sooner. Desktop keeps the full 100svh. */}
      <section ref={heroRef} className="relative w-full min-h-[70svh] md:min-h-[100svh] overflow-hidden bg-deep">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Aerial view of past ABR projects in Gainesville" className="hero-bg-img w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-deep" />
        </div>

        <div className="relative z-10 max-w-[1780px] mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-12 md:pb-16 min-h-[70svh] md:min-h-[100svh] flex flex-col justify-center">
          <p className="pp-eyebrow font-mono text-[11px] md:text-[13px] tracking-[0.4em] text-white/80 uppercase mb-6">
            Portfolio &nbsp;·&nbsp; Built &amp; delivered
          </p>
          <h1 className="pp-title font-sans font-bold uppercase text-white text-[clamp(3rem,11vw,9rem)] leading-[0.92] tracking-tight">
            {splitWords('Our past projects')}
          </h1>
          <p className="pp-sub mt-6 max-w-2xl font-sans text-white/85 text-lg md:text-xl leading-relaxed">
            A quiet portfolio of completed luxury homes — each built around the lives of the families that now call them home.
          </p>
        </div>
      </section>

      {/* ============== PROJECT CARDS ============== */}
      <section ref={projectsRef} className="relative w-full bg-deep py-16 md:py-24">
        <div className="max-w-[1780px] mx-auto px-4 md:px-12 flex flex-col gap-10 md:gap-14">
          {PROJECTS.map((p, i) => {
            const isHidden = visibleHideIdx === i;
            return (
            <button
              key={p.title}
              type="button"
              ref={(el) => (cardsRef.current[i] = el)}
              onClick={() => handleCardClick(i)}
              className="project-card group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black/40 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold/60"
              // v1.2: opacity is NO LONGER applied to the whole card. The
              // image must stay visible during the click → morph hand-off so
              // it reads as one continuous element. Only `.project-text` and
              // the two readability gradients fade out (handled inline below).
              style={{
                pointerEvents: isHidden ? 'none' : 'auto',
              }}
            >
              {/* Image — v0.9 (mobile): taller aspect (4/5) on phones so the
                  overlaid text has room and the top of the title doesn't get
                  clipped against the project image edge.
                  v1.1: hover state simply FADES OUT the two readability
                  gradients (top-up + left-right) so the raw image shows
                  through. No tint, no brightness filter — just the image.
                  v1.2: those same gradients ALSO fade on click (driven by
                  `isHidden`) so the morph hand-off is gradient-free, while
                  the image itself stays fully visible. */}
              <div className="relative aspect-[4/5] md:aspect-[16/8] overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.title} — exterior view`}
                  className="project-img absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity duration-300 ease-out group-hover:opacity-0"
                  style={{ opacity: isHidden ? 0 : undefined }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent transition-opacity duration-300 ease-out group-hover:opacity-0"
                  style={{ opacity: isHidden ? 0 : undefined }}
                />
              </div>

              {/* Content overlay (no "View details" button).
                  v1.2: this is the ONLY layer that fades on click — the image
                  underneath stays fully visible for the morph hand-off. */}
              <div
                className="project-text absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 text-white pointer-events-none"
                style={{
                  opacity: isHidden ? 0 : 1,
                  transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-gold/90 mb-4">
                  <MapPin size={14} className="opacity-80" />
                  <span>Gainesville, FL</span>
                  <span className="opacity-50">·</span>
                  <span>2025</span>
                  <span className="opacity-50">·</span>
                  <span>Delivered</span>
                </div>
                <h2 className="font-display font-medium text-white text-[clamp(2.25rem,5.5vw,6rem)] leading-[0.95] tracking-tight max-w-4xl">
                  {p.title}
                </h2>
                <p className="mt-4 max-w-2xl font-sans text-white/85 text-base md:text-lg leading-relaxed">
                  {p.accent}
                </p>

                <div className="project-meta mt-6 flex flex-wrap items-end justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[12px] tracking-[0.18em] uppercase text-white/70">
                    <Stat label="Bedrooms" value={p.bedrooms} />
                    <Stat label="Bathrooms" value={p.bathrooms} />
                    <Stat label="Floor area" value={p.area} />
                  </div>
                </div>
              </div>
            </button>
            );
          })}
        </div>
      </section>

      {/* ============== EXPANDED DETAIL OVERLAY ============== */}
      {activeIdx !== null && (
        <DetailOverlay
          project={PROJECTS[activeIdx]}
          startRect={cardRect}
          onCloseStart={handleCloseStart}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
}

// v0.6: the entire overlay container is what morphs — from the card's rect to
// fullscreen. Once it's expanded, the overlay becomes a normal scrollable
// container with the hero image at the top, so the user can scroll the whole
// thing (image + content) instead of just the lower content.
function DetailOverlay({ project, startRect, onCloseStart, onClose }) {
  const overlayRef  = useRef(null);
  const closeBtnRef = useRef(null);
  const closing     = useRef(false);

  // Open: morph the overlay box from card rect -> fullscreen, then unlock scroll.
  // v1.0: the close button is animated in TANDEM with the morph — starting
  // at the card's top-left corner (24px inset) and tweening to the viewport's
  // top-left corner, with opacity fading in.
  useEffect(() => {
    if (!overlayRef.current || !startRect) return;
    const el = overlayRef.current;
    const r  = startRect;

    gsap.set(el, {
      position: 'fixed',
      top:    r.top,
      left:   r.left,
      width:  r.width,
      height: r.height,
      borderRadius: '2.5rem',
      overflow: 'hidden',
      autoAlpha: 1,
    });

    if (closeBtnRef.current) {
      gsap.set(closeBtnRef.current, {
        position: 'fixed',
        top:  r.top  + 24,
        left: r.left + 24,
        opacity: 0,
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Hand control to native scrolling now that we're fullscreen.
        if (overlayRef.current) overlayRef.current.style.overflowY = 'auto';
      },
    });

    tl.to(el, {
      top: 0,
      left: 0,
      width:  '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 0.75,
      ease: 'power3.inOut',
    }, 0);

    if (closeBtnRef.current) {
      tl.to(closeBtnRef.current, {
        top:  24,
        left: 24,
        duration: 0.75,
        ease: 'power3.inOut',
      }, 0);
      tl.to(closeBtnRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, 0.35);
    }
  }, [startRect]);

  // v0.9 / v1.0: close reverses the open morph — the fullscreen overlay
  // shrinks back into the original card's rect (border-radius eases back
  // in) and the close button tweens from the viewport corner BACK to the
  // card's top-left corner, fading out as it goes. Body scroll is locked
  // while the overlay is open, so `startRect` is still accurate relative
  // to the viewport.
  const handleClose = () => {
    if (closing.current) return;
    closing.current = true;
    // v1.0: fire onCloseStart immediately so the parent can begin fading the
    // underlying card back in WHILE the overlay morphs back (avoids the
    // blank-slot flash after unmount).
    onCloseStart?.();
    const el = overlayRef.current;
    if (!el || !startRect) {
      onClose();
      return;
    }
    // Lock further scrolling and snap the inner scroll back to the top so the
    // hero image is what's visible while the overlay shrinks.
    el.style.overflowY = 'hidden';
    el.scrollTop = 0;

    const r = startRect;
    const tl = gsap.timeline({ onComplete: onClose });

    tl.to(el, {
      top:    r.top,
      left:   r.left,
      width:  r.width,
      height: r.height,
      borderRadius: '2.5rem',
      duration: 0.7,
      ease: 'power3.inOut',
    }, 0);

    if (closeBtnRef.current) {
      tl.to(closeBtnRef.current, {
        top:  r.top  + 24,
        left: r.left + 24,
        duration: 0.7,
        ease: 'power3.inOut',
      }, 0);
      tl.to(closeBtnRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, 0);
    }
  };

  // Esc-to-close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={overlayRef}
      className="detail-overlay z-[100] text-white bg-deep"
      role="dialog"
      aria-modal="true"
      style={{ opacity: 0 }}
    >
      {/* Close button — v1.0: gsap drives its top/left/opacity so it tweens
          FROM the card's top-left corner TO the viewport's top-left corner
          alongside the overlay morph, then reverses on close. Position is
          fixed throughout so it doesn't scroll away while the overlay is
          expanded. */}
      <button
        ref={closeBtnRef}
        type="button"
        onClick={handleClose}
        aria-label="Close project details"
        className="
          close-btn z-[120]
          inline-flex items-center justify-center
          w-12 h-12 md:w-14 md:h-14 rounded-full
          bg-white/10 hover:bg-white text-white hover:text-deep
          border border-white/25 backdrop-blur-md
          transition-[background-color,color,transform] duration-300 ease-out
          hover:scale-[1.08] hover:-translate-y-[2px]
          shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]
        "
        style={{ position: 'fixed', opacity: 0 }}
      >
        <X size={22} strokeWidth={2.2} />
      </button>

      {/* Hero — flows with the rest of the overlay so it scrolls along */}
      <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} — hero`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 lg:px-24 pb-10 md:pb-16">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-gold/90 mb-4">
            <MapPin size={14} className="opacity-80" />
            <span>Gainesville, FL</span>
            <span className="opacity-50">·</span>
            <span>2025</span>
            <span className="opacity-50">·</span>
            <span>Delivered</span>
          </div>
          <h1 className="font-display font-medium text-white text-[clamp(2rem,6vw,6rem)] leading-[0.95] tracking-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Body content — sits below the hero, scrolls naturally with it */}
      <section className="max-w-[1480px] mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-7 font-sans text-white/85 text-lg md:text-xl leading-[1.7] space-y-6">
            <p>{project.detailBody}</p>
            <p className="text-white/65 text-base md:text-lg">{project.accent}</p>
          </div>

          <aside className="md:col-span-5 border-t md:border-t-0 md:border-l border-white/15 pt-8 md:pt-0 md:pl-10">
            <h3 className="font-mono text-[11px] md:text-xs tracking-[0.3em] text-gold uppercase mb-6">
              Project Specs
            </h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <SpecItem label="Bedrooms" value={project.bedrooms} />
              <SpecItem label="Bathrooms" value={project.bathrooms} />
              <SpecItem label="Floor area" value={project.area} />
              {project.spec.map((s) => (
                <SpecItem key={s.label} label={s.label} value={s.value} />
              ))}
            </dl>
          </aside>
        </div>

        {/* Detail gallery */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {project.gallery.map((src, i) => (
            <div key={i} className="overflow-hidden aspect-[4/3]">
              <img src={src} alt={`${project.title} — detail ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-white font-sans text-base md:text-lg font-semibold tracking-normal normal-case">{value}</span>
      <span className="text-white/55 text-[10px] md:text-[11px]">{label}</span>
    </div>
  );
}

function SpecItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-display text-white text-2xl md:text-3xl leading-tight">{value}</span>
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">{label}</span>
    </div>
  );
}
