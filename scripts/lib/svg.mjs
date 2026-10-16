// Shared, dependency-free SVG primitives. All artwork uses system fonts.
export const palette = {
  background: '#0B1015', surface: '#151D25', secondary: '#202B34',
  accent: '#D8B68A', bronze: '#A67C52', text: '#F4F1EB', muted: '#AAB4BE',
};
export const escapeXml = (value) => String(value).replace(/[<>&"']/g, (c) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[c]);
export function text(x, y, value, size = 24, color = palette.text, extra = '') {
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${escapeXml(value)}</text>`;
}
export function frame(width, height, title, description, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="title desc">
<title id="title">${escapeXml(title)}</title><desc id="desc">${escapeXml(description)}</desc>
<rect width="${width}" height="${height}" rx="16" fill="${palette.background}"/>
<rect x=".5" y=".5" width="${width - 1}" height="${height - 1}" rx="15.5" fill="none" stroke="${palette.secondary}"/>
<g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif">${body}</g>
</svg>\n`;
}
export function monogram(x, y, size = 64) {
  return `<g transform="translate(${x} ${y}) scale(${size / 64})" fill="none" stroke="${palette.accent}" stroke-width="3" stroke-linejoin="round">
<path d="M8 52V12h14c17 0 17 19 0 19H8m14 0c19 0 19 21 0 21H8"/>
<path d="M40 52V12l16 40V12"/>
</g>`;
}
