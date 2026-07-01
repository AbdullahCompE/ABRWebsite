import { useEffect, useState, useCallback } from 'react';

// Hash-based routing. This keeps the app working when hosted on GitHub Pages
// under a subpath (e.g. /ABRWebsite/) and avoids 404s on deep-link refreshes,
// since everything is served from a single index.html. Routes stay the same
// values ('/', '/upcoming', ...) but live after the '#'.
const getPath = () => {
  if (typeof window === 'undefined') return '/';
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
};

export function useRoute() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onChange = () => setPath(getPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((next) => {
    if (next === getPath()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Updating the hash fires 'hashchange', which updates `path` via the listener.
    window.location.hash = next;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return { path, navigate };
}

export const ROUTES = {
  home: '/',
  upcoming: '/upcoming',
  pastProjects: '/past-projects',
  about: '/about',
  contact: '/contact',
};
