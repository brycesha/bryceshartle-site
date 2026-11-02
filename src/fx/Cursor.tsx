import { useEffect, useRef } from 'react';

/** Cursor: dot + trailing ring. Ring grows on interactive items and shows a label where data-cursor="Label" is set. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      const t = e.target as HTMLElement | null;
      const lab = t?.closest<HTMLElement>('[data-cursor]');
      const hot = !!t?.closest('a,button,[role="button"],summary');
      ring.current?.classList.toggle('is-hot', hot && !lab);
      ring.current?.classList.toggle('is-label', !!lab);
      if (label.current) label.current.textContent = lab?.dataset.cursor ?? '';
    };
    const loop = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener('pointermove', move);
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); document.documentElement.classList.remove('has-cursor'); };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring"><span ref={label} /></div>
      <div ref={dot} className="cursor-dot" />
    </>
  );
}
