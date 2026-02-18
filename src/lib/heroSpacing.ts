export function applyHeaderGap(selector: string, gap = 60) {
  const update = () => {
    const header = document.querySelector('header');
    if (!header) return;
    const headerHeight = Math.round(header.getBoundingClientRect().height);
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    nodes.forEach((el) => {
      el.style.paddingTop = `${headerHeight + gap}px`;
    });
  };

  update();
  window.addEventListener('resize', update);
  return () => window.removeEventListener('resize', update);
}
