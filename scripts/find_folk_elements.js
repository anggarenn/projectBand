const fs = require('fs');

const html = fs.readFileSync('qa-artifacts/folk_page.html', 'utf8');

// Find all URLs matching .gif, .json, .webp, .svg, .png
const urlRegex = /https:\/\/[^"'<>\s]+\.(gif|json|webp|svg|png|mp4)/gi;
const urls = Array.from(new Set(html.match(urlRegex) || []));

console.log('All asset URLs in HTML (' + urls.length + '):');
urls.forEach(u => console.log('-', u));

// Find all elements with folk-effect
const matches = html.match(/class="[^"]*folk-effect[^"]*"/g) || [];
console.log('folk-effect classes:', Array.from(new Set(matches)));

// Find all inline style tags
const styles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
console.log('Style tags count:', styles.length);

styles.forEach((s, idx) => {
  if (s.includes('folk-effect') || s.includes('@keyframes') || s.includes('kupu') || s.includes('butterfly')) {
    console.log(`Style #${idx} matched:`, s.substring(0, 500));
  }
});


