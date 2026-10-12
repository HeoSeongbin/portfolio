import { useEffect, useState } from 'react';
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('about');
  useEffect(() => { const update = () => { const current = ids.filter(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 160).at(-1); setActive(current ?? 'about'); }; window.addEventListener('scroll', update, { passive: true }); update(); return () => window.removeEventListener('scroll', update); }, [ids]);
  return active;
}
