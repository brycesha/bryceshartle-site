import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { worldCtl } from './HeroWorld';

gsap.registerPlugin(ScrollTrigger);
let lenis: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === 'home' ? 0 : -10, duration: 1.5 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
export function lockScroll(lock: boolean) { if (lenis) { lock ? lenis.stop() : lenis.start(); } }
let t: number | undefined;
export function refreshScroll(delay = 0) { clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), delay); }

export function useSmoothScroll() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = document.getElementById('scroll-progress');
    const loader = document.getElementById('loader');

    const setProgress = (p: number) => {
      if (bar) bar.style.transform = `scaleX(${p})`;
    };
    const onNativeScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max > 0 ? scrollY / max : 0);
    };

    // spotlight cards follow the pointer
    const spot = (e: PointerEvent) => {
      const c = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spot');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    addEventListener('pointermove', spot);

    if (reduce) {
      loader?.remove();
      addEventListener('scroll', onNativeScroll, { passive: true });
      return () => { removeEventListener('scroll', onNativeScroll); removeEventListener('pointermove', spot); };
    }

    lenis = new Lenis({ duration: 1.15 });
    lenis.on('scroll', ScrollTrigger.update);
    lenis.on('scroll', ({ progress }: { progress: number }) => setProgress(progress));
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);


    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // ---------- Loader -> hero intro ----------
      const intro = gsap.timeline({ delay: 0.05 });
      if (loader) {
        const num = loader.querySelector<HTMLElement>('.loader-num');
        const count = { v: 0 };
        intro
          .to(count, { v: 100, duration: 1.1, ease: 'power2.inOut', onUpdate: () => { if (num) num.textContent = String(Math.round(count.v)).padStart(3, '0'); } })
          .to('.loader-fill', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
          .to('.loader-tire', { rotate: 540, duration: 1.1, ease: 'power2.inOut' }, 0)
          .to(loader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '+=0.1')
          .set(loader, { display: 'none' });
      }
      intro
        .from('.world', { opacity: 0, duration: 1.2, ease: 'power2.out' }, loader ? '-=0.5' : 0)
        .from('.hero-word', { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.1 }, '-=0.8')
        .from('.hero-fade', { y: 26, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, '-=0.7')
        ;

      // ---------- Hero: scroll drives you into the skyline ----------
      mm.add('(min-width: 900px)', () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.hero-track', start: 'top top', end: 'bottom bottom', scrub: 0.8 } });
        tl.to(worldCtl, { drive: 1, ease: 'none', duration: 1 }, 0)
          .to('.hero-content', { y: -70, opacity: 0, ease: 'power2.in', duration: 0.5 }, 0.05)
          .to('.scroll-cue', { opacity: 0, duration: 0.15 }, 0);
        return () => { worldCtl.drive = 0; };
      });
      mm.add('(max-width: 899px)', () => {
        gsap.to(worldCtl, { drive: 0.7, ease: 'none', scrollTrigger: { trigger: '.hero-track', start: 'top top', end: 'bottom top', scrub: true } });
        return () => { worldCtl.drive = 0; };
      });

      // ---------- Headings / generic reveals ----------
      gsap.utils.toArray<HTMLElement>('.mask-in').forEach((el) => {
        gsap.from(el, { yPercent: 110, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
      });
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });

      // ---------- Section morph ----------
      gsap.utils.toArray<HTMLElement>('.morph').forEach((el) => {
        gsap.fromTo(el, { borderTopLeftRadius: 72, borderTopRightRadius: 72, scale: 0.95 }, { borderTopLeftRadius: 0, borderTopRightRadius: 0, scale: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 100%', end: 'top 30%', scrub: true } });
      });

      // ---------- Stats: clean count-up ----------
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const to = parseFloat(el.dataset.to || '0'); const dec = parseInt(el.dataset.dec || '0', 10); const suf = el.dataset.suffix || '';
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 2.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => { el.textContent = o.v.toFixed(dec) + suf; } });
        el.textContent = (0).toFixed(dec) + suf;
      });

      // ---------- Scroll-lit words ----------
      gsap.utils.toArray<HTMLElement>('.word').forEach((w) => {
        gsap.fromTo(w, { opacity: 0.16 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: w, start: 'top 88%', end: 'top 60%', scrub: true } });
      });

      // ---------- Route: a tire rolls down the line ----------
      gsap.fromTo('.route-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.route', start: 'top 55%', end: 'bottom 55%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.route-stop').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top 55%', toggleClass: { targets: el, className: 'is-on' } });
      });

      // ---------- Capabilities: line draws, name scrambles, items slide ----------
      gsap.utils.toArray<HTMLElement>('.cap').forEach((cap) => {
        gsap.fromTo(cap.querySelector('.cap-line'), { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 1.1, ease: 'power3.inOut', scrollTrigger: { trigger: cap, start: 'top 85%' } });
        gsap.from(cap.querySelectorAll('.cap-item'), { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity', scrollTrigger: { trigger: cap, start: 'top 75%' } });
      });

      // ---------- Stagger + dealt cards ----------
      gsap.utils.toArray<HTMLElement>('.stagger-group').forEach((g) => {
        gsap.from(g.querySelectorAll('.stagger-item'), { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07, clearProps: 'transform,opacity',
          scrollTrigger: { trigger: g, start: 'top 85%' } });
      });
      // ---------- Resume paper: lifts in, tilts with the pointer ----------
      const stage = document.querySelector<HTMLElement>('.paper-stage');
      const paper = document.querySelector<HTMLElement>('.paper');
      if (stage && paper) {
        gsap.from(paper, { y: 60, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: stage, start: 'top 85%' } });
      }

      // ---------- Magnetic buttons ----------
      gsap.utils.toArray<HTMLElement>('.magnetic').forEach((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
        el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - (r.left + r.width / 2)) * 0.28); yTo((e.clientY - (r.top + r.height / 2)) * 0.35); });
        el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
      });

      // ---------- Gallery: pinned horizontal scroll (desktop) ----------
      mm.add('(min-width: 900px) and (orientation: landscape)', () => {
        const track = document.querySelector<HTMLElement>('.g-track');
        const pin = document.querySelector<HTMLElement>('.g-pin');
        if (!track || !pin) return;
        const dist = () => track.scrollWidth - innerWidth + 80;
        const tween = gsap.to(track, { x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 } });
        gsap.utils.toArray<HTMLElement>('.g-img').forEach((img) => {
          gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none',
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        });
        gsap.to('.g-progress', { scaleX: 1, ease: 'none', transformOrigin: 'left', scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${dist()}`, scrub: true } });
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const late = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      clearTimeout(late);
      mm.revert(); ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy(); lenis = null;
      removeEventListener('pointermove', spot);
    };
  }, []);
}
