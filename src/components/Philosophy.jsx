import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Philosophy() {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Text reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      // Simple manual split-text effect by selecting words (which we wrap in spans)
      const words1 = text1Ref.current.querySelectorAll('span.word');
      const words2 = text2Ref.current.querySelectorAll('span.word');

      tl.from(words1, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      })
      .from(words2, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      }, "-=0.4");
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const WrapWords = ({ text, className }) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className={`word inline-block mr-[0.3em] ${className || ''}`}>{word}</span>
    ));
  };

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-dark text-background overflow-hidden" id="about">
      {/* Background Image Parallax */}
      <div className="absolute inset-[_top_-20%_bottom_-20%_left_0_right_0] z-0 opacity-15 pointer-events-none" ref={bgRef}>
        <img 
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2669&auto=format&fit=crop" 
          alt="Organic Architecture Texture" 
          className="w-full h-[140%] object-cover object-center grayscale mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <div ref={text1Ref} className="font-sans text-xl md:text-2xl text-background/60 mb-8 max-w-2xl font-medium tracking-tight">
          <WrapWords text="Most luxury builders focus on: standardized blueprints." />
        </div>
        
        <h2 ref={text2Ref} className="font-drama italic text-5xl md:text-[90px] leading-[1.1] text-background">
          <WrapWords text="We focus on: " />
          <span className="word inline-block text-accent">your sanctuary.</span>
        </h2>
      </div>
    </section>
  );
}
