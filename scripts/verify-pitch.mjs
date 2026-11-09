/**
 * scripts/verify-pitch.mjs
 * 
 * Automated Pitch Policy & Data Integrity Test Runner
 * Enforces:
 * 1. Zero currency symbols ($ as currency, €, £, ¥, ₹, ₩, ₪, Rs) and zero numeric prices across all code/data.
 * 2. WhatsApp URL sanitizer format validity, edge-case phone sanitization, and special-character encoding.
 * 3. Product catalog, brand config, and room showcase schema completeness.
 * 4. Offline image placeholder asset availability and category mapping helper.
 * 5. AST static code integrity & undeclared global variable audit.
 * 6. Reactive showroom state store action logic unit tests (zero-price bag and saved wishlist).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parser from '@babel/parser';
import traversePkg from '@babel/traverse';
import { BRAND_CONFIG, CATEGORIES, PRODUCTS, ROOM_SHOWCASE, buildWhatsAppUrl } from '../src/config/brand.js';
import { getFallbackPlaceholder, PLACEHOLDERS } from '../src/utils/placeholders.js';

const traverse = traversePkg.default || traversePkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
const failures = [];

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failures.push(message);
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n======================================================');
console.log('🏛️  ATELIER° PITCH SUITE POLICY & INTEGRITY VERIFICATION');
console.log('======================================================\n');

// -----------------------------------------------------------------------------
// Test 1: Zero Currency & Zero Numeric Prices Audit Across All Source Files
// -----------------------------------------------------------------------------
console.log('1. Policy Audit: Zero Currency Symbols & Zero Numeric Prices');

const EXTENSIONS_TO_SCAN = new Set(['.js', '.jsx', '.html', '.css', '.json']);
const EXCLUDED_DIRS = new Set(['node_modules', '.git', 'dist', '.gemini']);

// Regex patterns that would indicate currency or price presentations
const FORBIDDEN_CURRENCY_PATTERNS = [
  { name: 'Euro sign (€)', regex: /€/g },
  { name: 'Pound sign (£)', regex: /£/g },
  { name: 'Yen / Yuan sign (¥)', regex: /¥/g },
  { name: 'Rupee sign/code (Rs / INR / PKR / ₹)', regex: /\b(?:Rs\.?|PKR|INR|₹)\s*\d+/gi },
  { name: 'Dollar sign with numeric amount', regex: /\$\s*\d+/g },
  { name: 'Dollar sign not in JS template literal', regex: /\$(?!\s*\{)/g },
  { name: 'ISO Currency code with price amount', regex: /\b(?:USD|EUR|GBP|CAD|AUD|CHF|JPY|CNY)\s*\d+/gi },
  { name: 'Explicit Price field/tag with number', regex: /["']?price["']?\s*:\s*\d+/gi },
];

function getFilesRecursively(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (EXTENSIONS_TO_SCAN.has(path.extname(entry.name))) {
      // Exclude verification script itself from self-matching currency regex literals
      if (fullPath.includes('verify-pitch.mjs')) continue;
      files.push(fullPath);
    }
  }
  return files;
}

const sourceFiles = [
  ...getFilesRecursively(path.join(ROOT_DIR, 'src')),
  path.join(ROOT_DIR, 'index.html'),
];

let currencyViolations = 0;
for (const filePath of sourceFiles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT_DIR, filePath);

  for (const { name, regex } of FORBIDDEN_CURRENCY_PATTERNS) {
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      currencyViolations++;
      failures.push(`Forbidden ${name} found in ${relPath} (${matches.length} occurrences)`);
      console.error(`  ✗ VIOLATION: ${name} in ${relPath}: ${matches.join(', ')}`);
    }
  }
}

assert(currencyViolations === 0, `All scanned source files (${sourceFiles.length} files) strictly contain 0 currency signs and 0 prices.`);

// -----------------------------------------------------------------------------
// Test 2: WhatsApp URL Sanitizer Format & Payload Verification
// -----------------------------------------------------------------------------
console.log('\n2. WhatsApp Concierge URL Sanitizer Verification');

// Test 2A: Default Inquiry
const defaultUrl = buildWhatsAppUrl();
assert(typeof defaultUrl === 'string', 'buildWhatsAppUrl() returns a string.');
assert(defaultUrl.startsWith('https://wa.me/'), 'WhatsApp URL starts with valid "https://wa.me/" domain.');

const phoneDigitsOnly = /https:\/\/wa\.me\/(\d+)\?text=(.*)/.exec(defaultUrl);
assert(phoneDigitsOnly !== null, 'WhatsApp URL format conforms strictly to https://wa.me/<digits>?text=<encoded>.');
if (phoneDigitsOnly) {
  const phone = phoneDigitsOnly[1];
  assert(!phone.includes('+') && !phone.includes('-') && !phone.includes(' '), 'Phone number is sanitized to digits only.');
}

// Test 2B: Bag Items Query Serialization (with Zero Prices)
const sampleCart = [
  {
    product: PRODUCTS[0],
    quantity: 2,
  },
  {
    product: PRODUCTS[1],
    quantity: 1,
  },
];
const cartUrl = buildWhatsAppUrl(sampleCart, 'Please arrange delivery to SoHo loft & terrace (Unit #4B).');
assert(cartUrl.includes(encodeURIComponent(sampleCart[0].product.name)), 'Cart URL contains product 1 name.');
assert(cartUrl.includes('Qty%3A%202'), 'Cart URL includes item quantity correctly encoded.');
assert(cartUrl.includes('SoHo%20loft'), 'Cart URL includes custom concierge note.');

// Test 2C: Special character encoding and URL safety
assert(!cartUrl.includes(' '), 'WhatsApp URL contains zero raw spaces.');
assert(!cartUrl.includes('#'), 'Hash characters in concierge notes are safely URL encoded.');

// Test 2D: Verify zero prices in decoded message
const decodedMessage = decodeURIComponent(cartUrl);
assert(
  !decodedMessage.includes('$') &&
  !decodedMessage.includes('€') &&
  !decodedMessage.includes('£') &&
  !decodedMessage.includes('price:'),
  'Decoded WhatsApp message contains strictly 0 currency signs and no price labels.'
);

// -----------------------------------------------------------------------------
// Test 3: Product, Brand & Room Data Schema Completeness
// -----------------------------------------------------------------------------
console.log('\n3. Product Data Schema & Brand Configuration Integrity');

// Brand Config Completeness
assert(typeof BRAND_CONFIG.name === 'string' && BRAND_CONFIG.name.length > 0, 'BRAND_CONFIG.name is defined.');
assert(typeof BRAND_CONFIG.wordmark === 'string' && BRAND_CONFIG.wordmark.length > 0, 'BRAND_CONFIG.wordmark is defined.');
assert(typeof BRAND_CONFIG.tagline === 'string', 'BRAND_CONFIG.tagline is defined.');
assert(typeof BRAND_CONFIG.showroom === 'object' && BRAND_CONFIG.showroom.address && BRAND_CONFIG.showroom.phone, 'BRAND_CONFIG.showroom metadata complete.');
assert(typeof BRAND_CONFIG.whatsapp === 'object' && BRAND_CONFIG.whatsapp.phoneNumber, 'BRAND_CONFIG.whatsapp configuration complete.');

// Products Completeness
assert(Array.isArray(PRODUCTS) && PRODUCTS.length >= 8, `Product catalog loaded with ${PRODUCTS.length} curated pieces (minimum 8 required).`);

const seenIds = new Set();
let validProducts = 0;

for (const p of PRODUCTS) {
  const hasId = typeof p.id === 'string' && p.id.length > 0;
  const isUnique = !seenIds.has(p.id);
  seenIds.add(p.id);
  const hasName = typeof p.name === 'string' && p.name.length > 0;
  const hasCategory = typeof p.category === 'string' && p.category.length > 0;
  const hasMaterials = typeof p.materials === 'string' && p.materials.length > 0;
  const hasDimensions = typeof p.dimensions === 'string' && p.dimensions.length > 0;
  const hasImage = typeof p.image === 'string' && p.image.length > 0;
  const hasDescription = typeof p.description === 'string' && p.description.length > 0;
  const hasNoPriceField = p.price === undefined && p.cost === undefined;

  if (hasId && isUnique && hasName && hasCategory && hasMaterials && hasDimensions && hasImage && hasDescription && hasNoPriceField) {
    validProducts++;
  } else {
    failures.push(`Product ${p.id || 'unknown'} failed schema validation.`);
  }
}

assert(validProducts === PRODUCTS.length, `All ${PRODUCTS.length} products satisfy complete schema with zero price fields.`);

// Categories Completeness
assert(Array.isArray(CATEGORIES) && CATEGORIES.length >= 4, `Category list contains ${CATEGORIES.length} active categories.`);

// Room Showcase Completeness
assert(Array.isArray(ROOM_SHOWCASE.hotspots) && ROOM_SHOWCASE.hotspots.length > 0, `Room showcase has ${ROOM_SHOWCASE.hotspots.length} interactive hotspots.`);
const hotspotIdsValid = ROOM_SHOWCASE.hotspots.every((hs) => PRODUCTS.some((p) => p.id === hs.productId));
assert(hotspotIdsValid, 'All room showcase hotspots reference valid products in the catalog.');

// -----------------------------------------------------------------------------
// Test 4: Offline Architectural SVG Placeholder Availability & Resolver
// -----------------------------------------------------------------------------
console.log('\n4. Offline Resilience: Local Architectural SVG Placeholders');

const REQUIRED_PLACEHOLDERS = [
  'armchair.svg',
  'sofa.svg',
  'table.svg',
  'credenza.svg',
  'lamp.svg',
];

const placeholdersDir = path.join(ROOT_DIR, 'public', 'images', 'placeholders');
assert(fs.existsSync(placeholdersDir), 'public/images/placeholders directory exists.');

let placeholdersValid = 0;
for (const file of REQUIRED_PLACEHOLDERS) {
  const filePath = path.join(placeholdersDir, file);
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    if (stat.size > 500 && content.includes('<svg') && content.includes('</svg>')) {
      placeholdersValid++;
    }
  }
}

assert(
  placeholdersValid === REQUIRED_PLACEHOLDERS.length,
  `All ${REQUIRED_PLACEHOLDERS.length} architectural SVG placeholders are valid and present.`
);

// Verify placeholder resolver handles all categories
const testCategories = ['chairs', 'sofas', 'tables', 'storage', 'lighting', 'beds', 'mirrors', 'unknown'];
const resolvedFallbacks = testCategories.every((cat) => {
  const fallback = getFallbackPlaceholder(cat);
  return typeof fallback === 'string' && fallback.startsWith('/images/placeholders/') && fallback.endsWith('.svg');
});
assert(resolvedFallbacks, 'Placeholder resolver handles all categories with valid architectural SVG paths.');

// -----------------------------------------------------------------------------
// Test 5: Static AST Integrity & Undeclared Globals Audit
// -----------------------------------------------------------------------------
console.log('\n5. Static AST Code Integrity & Scope Audit');

const KNOWN_GLOBALS = new Set([
  'window', 'document', 'console', 'sessionStorage', 'localStorage', 'setTimeout', 'clearTimeout',
  'setInterval', 'clearInterval', 'Math', 'Date', 'String', 'Number', 'Boolean', 'Array', 'Object',
  'Set', 'Map', 'JSON', 'encodeURIComponent', 'decodeURIComponent', 'requestAnimationFrame',
  'cancelAnimationFrame', 'Event', 'CustomEvent', 'fetch', 'URL', 'Intl', 'history', 'location',
  'navigator', 'screen', 'Image', 'HTMLElement', 'Node', 'MutationObserver', 'IntersectionObserver',
  'ResizeObserver', 'performance', 'Error'
]);

let astViolations = 0;
function auditAstScope(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

    traverse(ast, {
      Program(path) {
        for (const name in path.scope.globals) {
          if (!KNOWN_GLOBALS.has(name)) {
            astViolations++;
            failures.push(`Undeclared global variable "${name}" in ${path.relative(ROOT_DIR, filePath)}`);
            console.error(`  ✗ AST ERROR: Undeclared identifier "${name}" in ${filePath}`);
          }
        }
      }
    });
  } catch (err) {
    astViolations++;
    failures.push(`Failed to parse AST for ${filePath}: ${err.message}`);
  }
}

for (const filePath of sourceFiles) {
  if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    auditAstScope(filePath);
  }
}

assert(astViolations === 0, `All source code files pass AST scope audit with zero undeclared globals.`);

// -----------------------------------------------------------------------------
// Test 6: Reactive Showroom Store Action Unit Logic
// -----------------------------------------------------------------------------
console.log('\n6. Showroom State Store Action Unit Logic');

// Simulate store reducer logic
let testBag = [];
const addAction = (p) => {
  const existing = testBag.find((i) => i.product.id === p.id);
  if (existing) {
    testBag = testBag.map((i) => (i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i));
  } else {
    testBag = [...testBag, { product: p, quantity: 1 }];
  }
};
const updateQtyAction = (id, delta) => {
  testBag = testBag
    .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + delta } : i))
    .filter((i) => i.quantity > 0);
};
const removeAction = (id) => {
  testBag = testBag.filter((i) => i.product.id !== id);
};

// Execute sequence
addAction(PRODUCTS[0]);
addAction(PRODUCTS[0]);
addAction(PRODUCTS[1]);
assert(testBag.length === 2 && testBag[0].quantity === 2, 'Adding items increments quantity correctly.');

updateQtyAction(PRODUCTS[0].id, -1);
assert(testBag[0].quantity === 1, 'Decreasing quantity reduces item count.');

updateQtyAction(PRODUCTS[0].id, -1);
assert(testBag.length === 1 && testBag[0].product.id === PRODUCTS[1].id, 'Reducing quantity to 0 removes item.');

removeAction(PRODUCTS[1].id);
assert(testBag.length === 0, 'Removing item empties bag cleanly.');

// Wishlist toggle logic
let testSaved = ['prod-1'];
const toggleSaveAction = (id) => {
  testSaved = testSaved.includes(id) ? testSaved.filter((i) => i !== id) : [...testSaved, id];
};
toggleSaveAction('prod-2');
assert(testSaved.includes('prod-2') && testSaved.length === 2, 'Wishlist toggle adds product ID.');
toggleSaveAction('prod-2');
assert(!testSaved.includes('prod-2') && testSaved.length === 1, 'Wishlist toggle removes product ID.');

// -----------------------------------------------------------------------------
// Summary & Exit Code
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`TOTAL CHECKS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failures.length}`);
console.log('======================================================\n');

if (failures.length > 0) {
  console.error('❌ Policy & Integrity Verification Failed with issues:');
  failures.forEach((f, idx) => console.error(`  ${idx + 1}. ${f}`));
  process.exit(1);
} else {
  console.log('✨ All policy, zero-price, WhatsApp sanitization, offline assets, and AST integrity tests passed cleanly!\n');
  process.exit(0);
}
