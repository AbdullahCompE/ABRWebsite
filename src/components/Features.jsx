import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MousePointer2 } from 'lucide-react';

// 1. Diagnostic Shuffler
const DiagnosticShuffler = () => {
  const [cards, setCards] = useState([
    { id: 1, label: "Site Topography Analysis" },
    { id: 2, label: "Spatial Flow Simulation" },
    { id: 3, label: "Material Resonance Mapping" },
  ]);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[240px] w-full flex flex-col justify-end pb-8" ref={containerRef}>
      {cards.map((card, index) => {
        const isSelf = index === 2; // Front card
        return (
          <div
            key={card.id}
            className="absolute left-6 right-6 bg-background rounded-2xl border border-primary/10 p-6 shadow-sm flex items-center justify-between"
            style={{
              zIndex: index,
              transform: `translateY(-${(2 - index) * 20}px) scale(${1 - (2 - index) * 0.05})`,
              opacity: 1 - (2 - index) * 0.2,
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease'
            }}
          >
            <div className="font-mono text-xs text-primary/60">0{card.id}</div>
            <div className="font-sans font-semibold text-sm">{card.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// 2. Telemetry Typewriter
const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const messages = [
    "[SYS] Calibrating foundation metrics... [OK]",
    "[SYS] Aligning steel tolerances... [OK]",
    "[SYS] Executing millwork protocols... [OK]",
    "[SYS] Verifying material integrity... [OK]"
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const currentMsg = messages[msgIdx];
    let charIdx = 0;
    
    setText('');
    const typingInterval = setInterval(() => {
      if (charIdx <= currentMsg.length) {
        setText(currentMsg.substring(0, charIdx));
        charIdx++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setMsgIdx((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [msgIdx]);

  return (
    <div className="h-[240px] w-full p-6 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        <div className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">Live Feed</div>
      </div>
      <div className="font-mono text-sm leading-relaxed text-dark h-[80px]">
        {text}
        <span className="inline-block w-2 h-4 bg-accent ml-1 -mb-1 animate-pulse"></span>
      </div>
    </div>
  );
};

// 3. Cursor Protocol Scheduler
const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      // Initial state
      gsap.set(cursorRef.current, { x: 0, y: 150, opacity: 0 });
      setActiveDay(null);

      // Animation
      tl.to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 120, y: 60, duration: 1, ease: 'power2.inOut' })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, onComplete: () => setActiveDay(3) }) // click Wed
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { x: 220, y: 180, duration: 0.8, ease: 'power2.inOut', delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 }) // click save
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-[240px] w-full p-6 flex flex-col justify-between" ref={containerRef}>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => (
          <div 
            key={i} 
            className={`flex items-center justify-center h-10 rounded-lg text-xs font-mono transition-colors duration-300 ${activeDay === i ? 'bg-accent text-background' : 'bg-primary/5 text-primary/40'}`}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="self-end mt-auto px-4 py-2 bg-primary text-background rounded-full text-xs font-sans font-semibold">
        Save Schedule
      </div>
      
      {/* SVG Cursor */}
      <div ref={cursorRef} className="absolute top-0 left-0 z-10 pointer-events-none drop-shadow-md text-primary">
        <MousePointer2 size={24} className="fill-background" />
      </div>
    </div>
  );
};

export default function Features() {
  const cards = [
    {
      title: "Bespoke Architectural Design",
      desc: "Tailored blueprints that capture your unique lifestyle.",
      Component: DiagnosticShuffler
    },
    {
      title: "Master Craftsmanship",
      desc: "Premium materials and flawless execution in every detail.",
      Component: TelemetryTypewriter
    },
    {
      title: "Seamless Build Process",
      desc: "Transparent scheduling, guided selection, and stress-free delivery.",
      Component: CursorProtocolScheduler
    }
  ];

  return (
    <section className="py-32 px-6 w-full max-w-7xl mx-auto" id="process">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-background rounded-[2rem] border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
            <card.Component />
            <div className="p-8 pt-0 mt-auto bg-background z-20 relative">
              <h3 className="font-sans font-bold text-xl mb-2 tracking-tight">{card.title}</h3>
              <p className="font-sans text-primary/70 text-sm leading-relaxed">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
