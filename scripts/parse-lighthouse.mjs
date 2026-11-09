import fs from 'fs';

const raw = fs.readFileSync('lighthouse-report.json', 'utf8');
const report = JSON.parse(raw);

console.log('='.repeat(70));
console.log('🌟 OFFICIAL LIGHTHOUSE AUDIT SCORES');
console.log('='.repeat(70));

const categories = report.categories;
for (const [key, cat] of Object.entries(categories)) {
  const score = Math.round(cat.score * 100);
  console.log(`• ${cat.title.padEnd(20)}: ${score}/100`);
}

console.log('\n--- KEY PERFORMANCE METRICS ---');
const audits = report.audits;
const metrics = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'interactive'
];

for (const m of metrics) {
  if (audits[m]) {
    console.log(`  ${audits[m].title.padEnd(35)}: ${audits[m].displayValue || (audits[m].numericValue + 'ms')} (score: ${audits[m].score})`);
  }
}

console.log('\n--- OPPORTUNITIES & DIAGNOSTICS (Failed or Needs Improvement) ---');
for (const [id, a] of Object.entries(audits)) {
  if (a.score !== null && a.score < 0.9 && a.details && a.details.type === 'opportunity') {
    console.log(`  ⚠️ [${id}] ${a.title}: ${a.displayValue || ''}`);
  }
}

console.log('\n--- ACCESSIBILITY AUDIT FINDINGS ---');
const a11yAuditRefs = categories.accessibility.auditRefs.filter(ref => {
  const a = audits[ref.id];
  return a && a.score !== null && a.score < 1;
});

if (a11yAuditRefs.length === 0) {
  console.log('  🎉 All Accessibility audits passed with 100%!');
} else {
  for (const ref of a11yAuditRefs) {
    const a = audits[ref.id];
    console.log(`  ⚠️ [${ref.id}] ${a.title}: ${a.explanation || a.description || ''}`);
  }
}

console.log('\n--- SEO AUDIT FINDINGS ---');
const seoAuditRefs = categories.seo.auditRefs.filter(ref => {
  const a = audits[ref.id];
  return a && a.score !== null && a.score < 1;
});

if (seoAuditRefs.length === 0) {
  console.log('  🎉 All SEO audits passed with 100%!');
} else {
  for (const ref of seoAuditRefs) {
    const a = audits[ref.id];
    console.log(`  ⚠️ [${ref.id}] ${a.title}: ${a.explanation || a.description || ''}`);
  }
}
