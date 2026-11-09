import fs from 'fs';

const raw = fs.readFileSync('lighthouse-report.json', 'utf8');
const report = JSON.parse(raw);
const audits = report.audits;

console.log('--- TOTAL BLOCKING TIME (TBT) BREAKDOWN ---');
if (audits['long-tasks'] && audits['long-tasks'].details) {
  console.log('Long tasks detected:');
  console.log(JSON.stringify(audits['long-tasks'].details.items, null, 2));
}

if (audits['mainthread-work-breakdown'] && audits['mainthread-work-breakdown'].details) {
  console.log('Main thread work breakdown:');
  console.log(JSON.stringify(audits['mainthread-work-breakdown'].details.items, null, 2));
}

if (audits['bootup-time'] && audits['bootup-time'].details) {
  console.log('JavaScript execution time per script:');
  console.log(JSON.stringify(audits['bootup-time'].details.items, null, 2));
}

console.log('\n--- LARGEST CONTENTFUL PAINT (LCP) BREAKDOWN ---');
if (audits['largest-contentful-paint-element'] && audits['largest-contentful-paint-element'].details) {
  console.log('LCP Element:');
  console.log(JSON.stringify(audits['largest-contentful-paint-element'].details.items, null, 2));
}

console.log('\n--- ACCESSIBILITY DETAILS (Contrast & Mismatches) ---');
if (audits['color-contrast'] && audits['color-contrast'].details) {
  console.log('Contrast items:');
  console.log(JSON.stringify(audits['color-contrast'].details.items.slice(0, 5), null, 2));
}
if (audits['label-content-name-mismatch'] && audits['label-content-name-mismatch'].details) {
  console.log('Label mismatch items:');
  console.log(JSON.stringify(audits['label-content-name-mismatch'].details.items, null, 2));
}
