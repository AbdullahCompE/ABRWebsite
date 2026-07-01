import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

import MagneticButton from '../components/MagneticButton';
import LetsTalkCTA from '../components/LetsTalkCTA';

import plantImg from '../../assets/home/hero_section3.png';

// Heart-of-Florida zoom stack
import zoom1 from '../../assets/zoom/1.png';
import zoom2 from '../../assets/zoom/2.png';
import zoom3 from '../../assets/zoom/3.png';
import zoom4 from '../../assets/zoom/4.png';
import zoom5 from '../../assets/zoom/5.png';
import zoom6 from '../../assets/zoom/6.png';

// Greystone interior photos
import grey10 from '../../assets/Greystone 3981 NW 63rd/10__mg_1942.jpg';
import grey12 from '../../assets/Greystone 3981 NW 63rd/12__mg_1975.jpg';
import grey15 from '../../assets/Greystone 3981 NW 63rd/15__mg_1981.jpg';
import grey2  from '../../assets/Greystone 3981 NW 63rd/2__mg_1960.jpg';

// 1001 SW house photos for the story scroll section
import house1 from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_980_fb6ae9ce9f7aa75cea1d22e90f9d85bf-uncropped_scaled_within_1536_1152.jpg';
import house2 from '../../assets/1001 SW 120th Dr, Gainesville, FL 32607/imgi_672_214d2582741dfee4e4ab1c5544acff03-cc_ft_1152.jpg';

const ZOOM_IMAGES = [zoom1, zoom2, zoom3, zoom4, zoom5, zoom6];

const STORY = [
  {
    title: 'From design',
    titleItalic: 'to blueprint',
    body:
      'Every home begins with a long conversation. We translate the way you live into a precise, build-ready set of plans.',
    big: grey10,
    small: grey2,
  },
  {
    title: 'Crafted',
    titleItalic: 'on site',
    body:
      'Hand-selected materials, master tradespeople, and a project lead who walks the site with you, week after week.',
    big: grey12,
    small: grey15,
  },
  {
    title: 'Delivered',
    titleItalic: 'with care',
    body:
      'A final walkthrough, an unhurried handover, and a relationship that continues long after the keys change hands.',
    big: house1,
    small: house2,
  },
];

// Number of horizontal slices for the big-image "cut up" reveal in section 5.
const STORY_SLICES = 5;

export default function Home({ navigate }) {
  const heroRef     = useRef(null);
  const heartRef    = useRef(null);
  const greystoneRef = useRef(null);
  const visionRef   = useRef(null);
  const storyRef    = useRef(null);

  // ===== Hero entrance =====
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-bg-img', { scale: 1.15, duration: 2.4, ease: 'power2.out' }, 0)
        .from('.hero-display .word', { y: 80, opacity: 0, duration: 1.2, stagger: 0.05 }, 0.3)
        .from('.hero-sub', { y: 20, opacity: 0, duration: 0.9 }, 0.6)
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.8 }, 0.8);
    });
    return () => ctx.revert();
  }, []);

  // ===== From the Heart of Florida — auto-play zoom-out stack =====
  // First transition (1 → 2) is triggered by scroll; the rest auto-play.
  // Delays between slides SHRINK as the sequence progresses, so the
  // animation feels snappier the further into it you get.
  // Every layer slides in from the TOP downward.
  useEffect(() => {
    let ctx = gsap.context(() => {
      const layers = gsap.utils.toArray('.zoom-layer');
      const title  = '.heart-title';

      // Initial state: image 1 visible, images 2-6 stacked above the frame
      layers.forEach((layer, i) => {
        gsap.set(layer, { yPercent: i === 0 ? 0 : -100 });
      });
      gsap.set(title, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
      });

      // ─── HEART-OF-FLORIDA TIMING KNOBS (v0.7) ───────────────────────────
      // Tweak these three numbers to change how fast / spaced the zoom plays.
      //   • slideDur  — duration of EACH individual slide (image-1→2, 2→3, …).
      //                 Lower = snappier.
      //   • baseDelay — gap AFTER transition 1→2 finishes, before 2→3 starts.
      //   • delayDecay— each later gap shrinks by this factor (e.g. 0.5 means
      //                 the next gap is half the previous one).
      // ────────────────────────────────────────────────────────────────────
      const slideDur   = 0.3;
      const baseDelay  = 0.18;
      const delayDecay = 0.55;

      for (let i = 1; i < layers.length; i++) {
        if (i === 1) {
          tl.to(layers[i], { yPercent: 0, duration: slideDur }, 0);
        } else {
          const gap = baseDelay * Math.pow(delayDecay, i - 2);
          tl.to(layers[i], { yPercent: 0, duration: slideDur }, `+=${gap.toFixed(3)}`);
        }
      }
      tl.to(title, { autoAlpha: 1, y: 0, duration: 0.5 }, '+=0.08');

      // Single scroll trigger fires the entire (otherwise time-based) timeline.
      // v0.4: deferred until the section's TOP reaches roughly 20% from the
      // viewport's top, so the user has scrolled most of the section into view
      // before the animation kicks off.
      ScrollTrigger.create({
        trigger: heartRef.current,
        start: 'top 20%',
        once: true,
        onEnter: () => tl.play(),
      });
    });
    return () => ctx.revert();
  }, []);

  // ===== Greystone gallery =====
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.grey-card', {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: greystoneRef.current, start: 'top 70%' },
      });
      gsap.from('.grey-word', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: greystoneRef.current, start: 'top 60%' },
      });
    });
    return () => ctx.revert();
  }, []);

  // ===== Vision section =====
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.vision-img', {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: visionRef.current, start: 'top 75%' },
      });
      gsap.from('.vision-title .line', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: visionRef.current, start: 'top 65%' },
      });
    });
    return () => ctx.revert();
  }, []);

  // ===== Story scroll — pinned, scrubbed reveal stack =====
  //
  // v0.6: TEXT and IMAGES use different swap mechanics.
  //   • IMAGES (slices + small picture) — still revealed on top of the previous
  //     panel by animating clip-paths. The new image "covers" the old one.
  //   • TEXT — the OLD text fades out FIRST, then (after a gap) the NEW text
  //     fades in. The two texts do not overlap in time (matches the
  //     example/stack-scroll.html behavior — one slide-box deactivates before
  //     the next one becomes active).
  //   • Each transition consumes a longer scroll segment (1.6 viewport heights)
  //     so the user has more room between transitions.
  //   • Pin lifetime + scroll-bar fill + navbar hide are all derived from the
  //     same `pinLen()` so they stay in sync.
  //
  // v1.0: gated to DESKTOP via gsap.matchMedia — mobile renders a horizontal
  // swipe carousel below (see `.story-mobile`) and the navbar stays visible.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const layers = gsap.utils.toArray('.story-layer');
      const total  = layers.length;
      const segment = () => window.innerHeight * 1.6;
      const pinLen  = () => (total - 1) * segment();

      // Initial state.
      layers.forEach((layer, i) => {
        const slices    = layer.querySelectorAll('.story-slice');
        const textBlock = layer.querySelector('.story-text-block');
        const smallImg  = layer.querySelector('.story-small-wrap');
        if (i === 0) {
          gsap.set(slices, { clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(textBlock, { autoAlpha: 1, y: 0 });
          if (smallImg) gsap.set(smallImg, { clipPath: 'inset(0% 0% 0% 0%)' });
        } else {
          gsap.set(layer, { autoAlpha: 1 });
          gsap.set(slices, { clipPath: 'inset(0% 0% 100% 0%)' });
          gsap.set(textBlock, { autoAlpha: 0, y: 24 });
          if (smallImg) gsap.set(smallImg, { clipPath: 'inset(0% 0% 100% 0%)' });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top top',
          end: () => `+=${pinLen()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Each transition = 1 unit on the timeline.
      // Image reveal spans the whole unit. Old text fades out in [0 → 0.3];
      // there's a deliberate gap, and the new text fades in in [0.55 → 0.85].
      for (let i = 1; i < total; i++) {
        const slices   = layers[i].querySelectorAll('.story-slice');
        const newText  = layers[i].querySelector('.story-text-block');
        const oldText  = layers[i - 1].querySelector('.story-text-block');
        const smallImg = layers[i].querySelector('.story-small-wrap');
        const segStart = i - 1;

        tl.to(slices, {
          clipPath: 'inset(0% 0% 0% 0%)',
          stagger: 0.08,
          duration: 1,
          ease: 'none',
        }, segStart);

        if (smallImg) {
          tl.to(smallImg, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.85,
            ease: 'none',
          }, segStart + 0.05);
        }

        // Old text exits first…
        tl.to(oldText, {
          autoAlpha: 0,
          y: -24,
          duration: 0.3,
          ease: 'power2.in',
        }, segStart);

        // …then new text enters after a clear gap.
        tl.to(newText, {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        }, segStart + 0.55);
      }

      // Scroll-bar fill across the entire timeline.
      tl.fromTo(
        '.story-progress-fill',
        { scaleY: 0 },
        { scaleY: 1, duration: total - 1, ease: 'none' },
        0
      );

      // Slide the global navbar up while inside this section.
      ScrollTrigger.create({
        trigger: storyRef.current,
        start: 'top 80%',
        end: () => `+=${window.innerHeight * 0.2 + pinLen() + window.innerHeight * 0.4}`,
        toggleClass: { className: 'nav-hidden', targets: '#nav-rail' },
      });
    });
    return () => mm.revert();
  }, []);

  const splitWords = (s) =>
    s.split(' ').map((w, i) => (
      <span key={i} className="word inline-block mr-3 md:mr-5 last:mr-0">
        {w}
      </span>
    ));

  return (
    <>
      {/* ============== 1. HERO ============== */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[100svh] overflow-hidden bg-deep"
      >
        <div className="absolute inset-0 z-0">
          {/* v0.9 (mobile): align the hero background to the RIGHT side of the
              image so the meaningful subject doesn't get cropped on phones. */}
          <img
            src={plantImg}
            alt="Sunlit room with a fiddle-leaf fig plant"
            className="hero-bg-img w-full h-full object-cover object-right md:object-center"
          />
        </div>

        <div className="relative z-10 max-w-[1780px] mx-auto px-6 md:px-12 pt-40 md:pt-48 pb-16 min-h-[100svh] flex flex-col justify-end">
          <div className="max-w-5xl">
            <h1 className="hero-display font-sans font-bold uppercase text-white leading-[0.95] text-[clamp(2.5rem,6.5vw,7rem)] tracking-tight">
              {splitWords('Your vision is the')}
            </h1>
            {/*
              ▼ "Blueprint" word — FONT SIZE is set on the line below.
                It uses `text-[clamp(4.5rem,16vw,12.5rem)]`:
                  · min  = 4.5rem  (mobile floor)
                  · pref = 16vw    (scales with viewport width)
                  · max  = 12.5rem (desktop ceiling)
                Adjust any of those three values to resize.
            */}
            <div className="hero-display font-display italic font-normal text-white text-[clamp(4.5rem,16vw,12.5rem)] leading-[0.78] tracking-tight mt-1 md:mt-2">
              <span className="word inline-block">Blueprint.</span>
            </div>
            <p className="hero-sub mt-6 max-w-2xl font-sans text-white/85 text-lg md:text-xl leading-relaxed">
              Design-led custom homes built for the way you live. A boutique homebuilder for discerning clients.
            </p>
            <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="brown"
                size="lg"
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
              >
                Book a consultation <ArrowRight size={20} />
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="lg"
                onClick={() => navigate('/past-projects')}
                className="backdrop-blur-md bg-white/5"
              >
                See past projects
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ============== 2. FROM THE HEART OF FLORIDA (zoom stack) ============== */}
      {/* v0.9 (mobile): section is vertically thinner on phones — was a full
          100svh which felt over-tall. Desktop keeps 100svh. */}
      <section
        ref={heartRef}
        className="relative w-full h-[60svh] md:h-[100svh] overflow-hidden bg-deep"
      >
        {ZOOM_IMAGES.map((src, i) => (
          <div
            key={i}
            className="zoom-layer absolute inset-0 will-change-transform"
            style={{ zIndex: i + 1 }}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div
          className="absolute inset-0 bg-black/35"
          style={{ zIndex: ZOOM_IMAGES.length + 1 }}
        />
        <div
          className="relative h-full flex items-center justify-center px-6"
          style={{ zIndex: ZOOM_IMAGES.length + 2 }}
        >
          <h2 className="heart-title font-display font-medium text-white text-center leading-[0.95] text-[clamp(2.25rem,6vw,6rem)]">
            From the Heart of Florida
          </h2>
        </div>
      </section>

      {/* ============== 3. GREYSTONE RESIDENCES ============== */}
      {/* v0.3: unified section background — was `bg-teal`, now `bg-deep` (#133630)
          v1.0: reverted the v0.9 mobile reflow and removed the brightness
          dimming on all three images. */}
      <section ref={greystoneRef} className="relative w-full bg-deep py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1780px] mx-auto px-6 md:px-12">
          <div className="relative">
            {/* Image grid — no rounded corners; middle is higher than sides */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 md:items-start">
              <div className="grey-card overflow-hidden aspect-[3/4] md:mt-20">
                <img
                  src={grey12}
                  alt="Greystone interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grey-card overflow-hidden aspect-[3/4] md:-mt-6">
                <img
                  src={grey2}
                  alt="Greystone living room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grey-card overflow-hidden aspect-[3/4] col-span-2 md:col-span-1 md:mt-20">
                <img
                  src={grey15}
                  alt="Greystone bedroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/*
              Staggered overlay title.
              "Greystone"  -> LEFT of center  (top line)
              "Residences" -> RIGHT of center (bottom line)

              Positioning attributes to tweak:
                · Horizontal placement: `text-left` / `text-right` aligns the
                  word inside its row, while `pl-[..%]` / `pr-[..%]` controls
                  the inset from that side.
                · Fine-tune the nudge with `translate-x-[..%]` on the inner span.
                · Vertical gap between the two lines: `mt-2 md:mt-4` on the
                  second row.
            */}
            <h2
              className="
                pointer-events-none absolute inset-0 z-10
                font-display text-white text-[clamp(2.75rem,9vw,8rem)] leading-[0.9] tracking-[0.04em]
                flex flex-col justify-center
              "
            >
              {/* "Greystone" — LEFT of center */}
              <span className="grey-word block w-full pl-[8%] md:pl-[14%] text-left">
                <span className="inline-block md:translate-x-[6%]">Greystone</span>
              </span>
              {/* "Residences" — RIGHT of center */}
              <span className="grey-word block w-full pr-[8%] md:pr-[14%] text-right mt-2 md:mt-4">
                <em className="not-italic inline-block md:translate-x-[-6%]">Residences</em>
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* ============== 4. A VISION OF INSPIRED LIVING ============== */}
      <section ref={visionRef} className="relative w-full bg-deep py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1780px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          <div className="vision-img md:col-span-7 img-zoom overflow-hidden aspect-[4/3]">
            <img src={grey10} alt="Open concept kitchen and dining" className="w-full h-full object-cover" />
          </div>
          <div className="vision-title md:col-span-5">
            <h2 className="font-display text-white text-[clamp(2.5rem,7vw,7rem)] leading-[0.92] tracking-tight">
              <span className="line block">A VISION OF</span>
              <span className="line block">INSPIRED</span>
              <span className="line block">LIVING</span>
            </h2>
            <p className="line mt-6 max-w-md text-white/75 text-lg leading-relaxed">
              Spaces shaped by the rhythms of your life — sunlight, gathering, calm, and craft.
            </p>
          </div>
        </div>
      </section>

      {/* ============== 5. STORY SCROLL — pinned scrub reveal (DESKTOP) ============== */}
      {/* v1.0: this pinned/scrubbed version only renders at md+. Mobile uses
          the horizontal swipe carousel further below. */}
      <section
        ref={storyRef}
        className="story-section hidden md:block relative w-full h-[100svh] bg-deep overflow-hidden"
      >
        <div className="absolute inset-0 max-w-[1780px] mx-auto px-6 md:px-12 flex items-center gap-6 md:gap-10">
          {/* Left scroll-bar: thin line, thicker gold fill grows from top down */}
          <div className="hidden md:flex shrink-0 w-8 lg:w-10 self-stretch py-24 items-center justify-center">
            <div className="relative h-72 w-px bg-white/15">
              <div
                className="story-progress-fill absolute left-1/2 -translate-x-1/2 top-0 w-[3px] bg-gold origin-top"
                style={{ height: '100%', transform: 'scaleY(0)' }}
              />
            </div>
          </div>

          {/* Stacked layers — each panel sits ON TOP of the previous */}
          <div className="relative flex-1 h-[60vh] md:h-[70vh]">
            {STORY.map((panel, i) => (
              <article
                key={i}
                className="story-layer absolute inset-0 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
                style={{ zIndex: i + 1 }}
              >
                {/* Text column (left).
                    v0.6: the entire text block (`.story-text-block`) fades as
                    a single unit. The OLD block fades out, then the NEW one
                    fades in — they never overlap. */}
                <div className="md:col-span-5 md:pr-6 self-center">
                  <div className="story-text-block">
                    <h3 className="font-display text-white text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
                      <span className="block">{panel.title}</span>
                      <em className="not-italic block italic">{panel.titleItalic}</em>
                    </h3>
                    <p className="mt-6 max-w-md font-sans text-white/75 text-lg leading-relaxed">
                      {panel.body}
                    </p>
                  </div>
                </div>

                {/* Image pair (right) */}
                <div className="md:col-span-7 relative h-full">
                  {/* Big image — anchored right, 80% wide, cut into horizontal slices */}
                  <div className="absolute right-0 top-0 bottom-0 w-[80%]">
                    {Array.from({ length: STORY_SLICES }).map((_, s) => (
                      <div
                        key={s}
                        className="story-slice absolute left-0 right-0 overflow-hidden"
                        style={{
                          top:    `${(s * 100) / STORY_SLICES}%`,
                          height: `${100 / STORY_SLICES}%`,
                          willChange: 'clip-path',
                        }}
                      >
                        <img
                          src={panel.big}
                          alt=""
                          aria-hidden="true"
                          className="absolute left-0 w-full object-cover"
                          style={{
                            height: `${STORY_SLICES * 100}%`,
                            top:    `-${s * 100}%`,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Small image — in front, vertically centered, center on big image's left border */}
                  <div
                    className="story-small-wrap absolute z-10
                      top-1/2 -translate-y-1/2
                      left-[20%] -translate-x-1/2
                      w-[34%] aspect-[3/4]
                      overflow-hidden shadow-2xl"
                    style={{ willChange: 'clip-path' }}
                  >
                    <img
                      src={panel.small}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 5. STORY (MOBILE — horizontal swipe carousel) ============== */}
      {/* v1.0: mobile-only replacement for the pinned stack-scroll above.
          Three panels in a horizontal snap carousel; the navbar stays visible
          because no ScrollTrigger / nav-hidden trigger fires on this page at
          mobile widths. */}
      <section className="story-mobile md:hidden relative w-full bg-deep py-12 overflow-hidden">
        <div className="max-w-[1780px] mx-auto px-6">
          <p className="font-mono text-[11px] tracking-[0.4em] text-gold uppercase mb-4">
            Our process
          </p>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 px-6 pb-6 scroll-pl-6 -mr-6">
          {STORY.map((panel, i) => (
            <article
              key={i}
              className="shrink-0 w-[85vw] snap-start flex flex-col"
            >
              {/* v1.1 (mobile): one image per card — the small overlay picture
                  was removed so each of the three cards shows a single hero
                  image (3 cards / 3 images total). */}
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img
                  src={panel.big}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6">
                <h3 className="font-display text-white text-[clamp(2rem,8vw,2.75rem)] leading-[1] tracking-tight">
                  <span className="block">{panel.title}</span>
                  <em className="not-italic block italic">{panel.titleItalic}</em>
                </h3>
                <p className="mt-4 font-sans text-white/75 text-base leading-relaxed">
                  {panel.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============== 6. LET'S TALK CTA ============== */}
      <LetsTalkCTA />
    </>
  );
}
