import React, { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Upcoming from './pages/Upcoming';
import PastProjects from './pages/PastProjects';
import About from './pages/About';
import Contact from './pages/Contact';
import { ROUTES, useRoute } from './router';

gsap.registerPlugin(ScrollTrigger);

// v0.6: any component can pop open the contact overlay by dispatching this
// custom event — keeps Contact decoupled from the router and avoids prop drill.
//   window.dispatchEvent(new CustomEvent('open-contact'))

export default function App() {
  const { path, navigate } = useRoute();
  // Initialize once based on the current URL so a direct hit to /contact opens
  // the overlay without a setState-in-effect.
  const [contactOpen, setContactOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.location.hash.replace(/^#/, '') === ROUTES.contact) {
      window.location.hash = ROUTES.home;
      return true;
    }
    return false;
  });

  // Refresh ScrollTrigger after route changes / images load
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => clearTimeout(id);
  }, [path]);

  // Listen for the global "open-contact" event.
  useEffect(() => {
    const onOpen = () => setContactOpen(true);
    window.addEventListener('open-contact', onOpen);
    return () => window.removeEventListener('open-contact', onOpen);
  }, []);

  const handleCloseContact = useCallback(() => setContactOpen(false), []);

  let PageEl;
  switch (path) {
    case ROUTES.upcoming:
      PageEl = <Upcoming navigate={navigate} />;
      break;
    case ROUTES.pastProjects:
      PageEl = <PastProjects navigate={navigate} />;
      break;
    case ROUTES.about:
      PageEl = <About navigate={navigate} />;
      break;
    case ROUTES.home:
    default:
      PageEl = <Home navigate={navigate} />;
  }

  return (
    <div className="relative w-full min-h-screen bg-deep text-white selection:bg-gold selection:text-deep">
      <Navbar currentPath={path} navigate={navigate} />
      <main key={path} className="relative">
        {PageEl}
      </main>
      <Footer navigate={navigate} />
      {contactOpen && <Contact onClose={handleCloseContact} />}
    </div>
  );
}
