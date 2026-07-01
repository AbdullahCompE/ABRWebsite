import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const StepOneGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-80" aria-label="Stylus writing hello on a tablet">
    <rect x="15" y="25" width="70" height="50" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="18" y="28" width="64" height="44" rx="2" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
    
    <path 
      d="M 25 55 C 25 35 30 35 30 55 C 30 45 34 45 34 55 C 34 45 38 45 38 52 C 38 60 42 60 43 55 C 45 40 46 35 46 55 C 48 40 49 35 49 55 C 52 45 50 45 50 52 C 50 60 54 60 55 52 C 57 45 61 45 63 55"
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="animate-[write_3s_ease-in-out_infinite]"
      style={{ strokeDasharray: '200', strokeDashoffset: '200' }}
    />
    
    <g className="origin-bottom-left animate-[stylus_3s_ease-in-out_infinite]">
      <path d="M 0 0 L 6 -12 L 9 -10 Z" fill="currentColor" />
      <path d="M 7.5 -11 L 18 -30 L 22 -28 L 11 -9 Z" fill="currentColor" opacity="0.5" />
    </g>

    <style>{`
      @keyframes write { 
        0%, 10% { stroke-dashoffset: 200; } 
        75%, 100% { stroke-dashoffset: 0; } 
      }
      @keyframes stylus { 
        0%, 10% { transform: translate(25px, 55px); opacity: 1; } 
        25% { transform: translate(30px, 35px); }
        40% { transform: translate(38px, 55px); }
        55% { transform: translate(46px, 35px); }
        70% { transform: translate(55px, 55px); }
        75% { transform: translate(63px, 55px); opacity: 1; }
        76%, 100% { transform: translate(63px, 55px); opacity: 0; } 
      }
    `}</style>
  </svg>
);

const StepTwoGraphic = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-accent opacity-80 overflow-hidden" aria-label="Rain falling on a suburban house">
    {/* Rain particles */}
    <g className="opacity-40">
      {Array.from({ length: 20 }).map((_, i) => (
        <line 
          key={i}
          x1={Math.random() * 150 - 25} 
          y1="-20" 
          x2={Math.random() * 150 - 25 - 20} 
          y2="120" 
          stroke="currentColor" 
          strokeWidth="0.5"
          className="animate-[rain_linear_infinite]"
          style={{ 
            animationDuration: `${0.4 + Math.random() * 0.3}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </g>

    {/* House Base */}
    <rect x="25" y="50" width="50" height="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Roof */}
    <polygon points="15,50 50,20 85,50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    
    {/* Door */}
    <rect x="42" y="65" width="16" height="20" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="54" cy="75" r="1" fill="currentColor" />
    
    {/* Windows */}
    <rect x="30" y="55" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="35" y1="55" x2="35" y2="65" stroke="currentColor" strokeWidth="0.5" />
    <line x1="30" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="0.5" />

    <rect x="60" y="55" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="65" y1="55" x2="65" y2="65" stroke="currentColor" strokeWidth="0.5" />
    <line x1="60" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="0.5" />

    {/* Chimney */}
    <rect x="65" y="25" width="8" height="15" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="60" y1="25" x2="78" y2="25" stroke="currentColor" strokeWidth="1" />

    {/* Ground line */}
    <line x1="5" y1="85" x2="95" y2="85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    <style>{`
      @keyframes rain {
        0% { transform: translateY(-100%) translateX(20%); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(100%) translateX(-20%); opacity: 0; }
      }
    `}</style>
  </svg>
);

const StepThreeGraphic = () => (
  <svg viewBox="0 0 100 50" className="w-full h-full text-accent drop-shadow-[0_0_8px_rgba(204,88,51,0.5)]">
    <path 
      d="M0 25 L30 25 L35 10 L45 40 L50 25 L80 25 L85 15 L95 35 L100 25" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="animate-[dash_3s_linear_infinite]"
      style={{ strokeDasharray: '200', strokeDashoffset: '200' }}
    />
    <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
  </svg>
);

export default function Protocol() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = cardsRef.current;
      
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Skip last card for stacking logic

        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: containerRef.current, // Pin until end of whole container
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
        });

        const nextCard = cards[index + 1];
        
        // As next card scrolls over, fade/blur current card
        gsap.to(card, {
          scale: 0.9,
          filter: 'blur(10px)',
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Discovery & Blueprint",
      desc: "We analyze your lifestyle topography and craft a spatial flow simulation tailored to your unique needs.",
      Graphic: StepOneGraphic
    },
    {
      num: "02",
      title: "Material Sourcing",
      desc: "Pristine alignment of structural elements with premium materials sourced for longevity and aesthetic resonance.",
      Graphic: StepTwoGraphic
    },
    {
      num: "03",
      title: "Master Delivery",
      desc: "Flawless execution of millwork protocols, ensuring transparency from groundbreak to the final key handover.",
      Graphic: StepThreeGraphic
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-background" id="protocol">
      {steps.map((step, idx) => (
        <div 
          key={idx} 
          ref={el => cardsRef.current[idx] = el}
          className="w-full h-[100dvh] flex items-center justify-center p-6 bg-background border-t border-primary/5 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]"
        >
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
            
            <div className="order-2 md:order-1 flex flex-col justify-center max-w-lg">
              <div className="font-mono text-accent text-lg mb-6 tracking-widest uppercase flex items-center gap-4">
                <span className="w-12 h-[1px] bg-accent/30 inline-block"></span>
                Phase {step.num}
              </div>
              <h2 className="font-sans font-bold text-4xl md:text-6xl text-dark mb-6 tracking-tight leading-[1.1]">
                {step.title}
              </h2>
              <p className="font-sans text-lg text-primary/70 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>

            <div className="order-1 md:order-2 aspect-square relative flex items-center justify-center border border-primary/10 rounded-[3rem] bg-primary/[0.02] p-12 md:p-24 shadow-inner">
              <step.Graphic />
              
              <div className="absolute bottom-6 right-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse"></div>
                <div className="font-mono text-[10px] text-primary/40 tracking-widest">SYS_ACTIVE</div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}
