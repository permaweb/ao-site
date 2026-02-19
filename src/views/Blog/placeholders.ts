const encodeSvg = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const base = (content: string) =>
  encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">${content}</svg>`);

const gridLines =
  Array.from({ length: 17 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="450"/>`).join('') +
  Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 50}" x2="800" y2="${i * 50}"/>`).join('');

const nodeDots = [2, 4, 6, 8, 10, 12, 14]
  .flatMap((y) => [3, 6, 9, 12, 15].map((x) => `<circle cx="${x * 50}" cy="${y * 50}" r="2"/>`))
  .join('');

const flowLines = Array.from({ length: 12 }, (_, i) => {
  const y = i * 45;
  return `<line x1="-50" y1="${y}" x2="850" y2="${y + 200}"/>`;
}).join('');

export const BLOG_PLACEHOLDERS = {
  grid: base(
    `<rect width="800" height="450" fill="#0a0a0f"/><g stroke="#1a3a4a" stroke-width="0.5" opacity="0.4">${gridLines}</g>`
  ),
  nodes: base(`<rect width="800" height="450" fill="#0a0a0f"/><g fill="#1a3a4a" opacity="0.5">${nodeDots}</g>`),
  flow: base(
    `<rect width="800" height="450" fill="#0a0a0f"/><g stroke="#1a3a4a" stroke-width="0.5" opacity="0.35">${flowLines}</g>`
  ),
  circuit: base(
    `<rect width="800" height="450" fill="#0a0a0f"/><g stroke="#16213e" stroke-width="0.5" opacity="0.4" fill="none"><path d="M0 225 L200 225 L200 150 L400 150 L400 300 L600 300 L600 225 L800 225"/><path d="M0 350 L150 350 L150 100 L250 100 L250 350 L800 350"/><path d="M100 50 L100 400 M300 50 L300 400 M500 50 L500 400 M700 50 L700 400"/></g>`
  ),
};
