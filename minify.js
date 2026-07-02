/**
 * Build-time asset minifier.
 *
 * Uses production-grade libraries (terser for JS, clean-css for CSS) so the
 * generated *.min.* files are safe to ship and noticeably smaller than the
 * sources. Run with `npm run build` (also wired into the Render build step).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const CleanCSS = require('clean-css');
const { PurgeCSS } = require('purgecss');
const { minify: minifyJS } = require('terser');

const root = __dirname;

// Every file that references index.css classes — static markup plus the scripts
// that build markup at runtime. PurgeCSS scans these; any class it cannot find
// (and that isn't safelisted) is treated as unused and removed.
const cssContent = [
    'index.html', 'checkout.html', 'login.html',
    'index.js', 'swiper-init.js', 'translations-extended.js',
].map((f) => path.join(root, f)).filter((p) => fs.existsSync(p));

// Classes toggled or injected dynamically that may not appear verbatim in the
// scanned files. Kept unconditionally so interactive states keep their styling.
const cssSafelist = {
    standard: [
        'active', 'closed', 'hidden', 'loading', 'error', 'loaded', 'visible',
        'menu-open', 'sidebar-open', 'has-user', 'expanded', 'dropdown-open',
        'highlight-product', 'field-error',
    ],
    greedy: [/-active$/, /-open$/, /-visible$/, /show$/],
};

// Minified files successfully (re)generated this run. Used to bust caches in
// index.html so browsers/Lighthouse pick up changes despite immutable caching.
const generated = [];

const cssFiles = [
    { src: 'index.css', out: 'index.min.css' },
];

const jsFiles = [
    { src: 'index.js', out: 'index.min.js' },
    { src: 'swiper-init.js', out: 'swiper-init.min.js' },
];

function report(label, srcLen, outLen) {
    const saved = srcLen === 0 ? 0 : ((srcLen - outLen) / srcLen) * 100;
    console.log(`✅ ${label}`);
    console.log(`   Original: ${(srcLen / 1024).toFixed(2)} KB`);
    console.log(`   Minified: ${(outLen / 1024).toFixed(2)} KB`);
    console.log(`   Saved:    ${saved.toFixed(1)}%\n`);
}

async function buildCSS() {
    const cleaner = new CleanCSS({ level: 2, returnPromise: false });
    for (const { src, out } of cssFiles) {
        try {
            const srcPath = path.join(root, src);
            if (!fs.existsSync(srcPath)) {
                console.warn(`⚠️  Skipping ${src} (not found)`);
                continue;
            }
            const css = fs.readFileSync(srcPath, 'utf8');

            // Drop unused selectors first. Keyframes, @font-face and CSS custom
            // properties are deliberately preserved (conservative) so styles
            // referenced indirectly via animation/var() are never lost.
            const purged = await new PurgeCSS().purge({
                content: cssContent,
                css: [{ raw: css }],
                safelist: cssSafelist,
                keyframes: false,
                fontFace: false,
                variables: false,
                defaultExtractor: (c) => c.match(/[\w-/:]+(?<!:)/g) || [],
            });
            const cleanedSource = purged[0] ? purged[0].css : css;

            const result = cleaner.minify(cleanedSource);
            if (result.errors.length) {
                throw new Error(result.errors.join(', '));
            }
            fs.writeFileSync(path.join(root, out), result.styles);
            generated.push(out);
            report(`${src} → ${out}`, css.length, result.styles.length);
        } catch (err) {
            console.error(`❌ CSS minify failed for ${src}:`, err.message);
        }
    }
}

async function buildJS() {
    for (const { src, out } of jsFiles) {
        try {
            const srcPath = path.join(root, src);
            if (!fs.existsSync(srcPath)) {
                console.warn(`⚠️  Skipping ${src} (not found)`);
                continue;
            }
            const js = fs.readFileSync(srcPath, 'utf8');
            const result = await minifyJS(js, {
                compress: true,
                mangle: true,
                format: { comments: false },
            });
            if (result.error) {
                throw result.error;
            }
            fs.writeFileSync(path.join(root, out), result.code);
            generated.push(out);
            report(`${src} → ${out}`, js.length, result.code.length);
        } catch (err) {
            console.error(`❌ JS minify failed for ${src}:`, err.message);
        }
    }
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Rewrites the `?v=` query string of each generated asset in index.html to a
// short hash of the minified file's contents. Because the URL changes only when
// the content changes, long-lived `immutable` caching stays safe while browsers
// and Lighthouse always fetch the latest build.
function bustCache() {
    const htmlPath = path.join(root, 'index.html');
    if (!fs.existsSync(htmlPath)) {
        console.warn('⚠️  Skipping cache-bust (index.html not found)');
        return;
    }
    let html = fs.readFileSync(htmlPath, 'utf8');
    let updated = 0;
    for (const out of generated) {
        const filePath = path.join(root, out);
        if (!fs.existsSync(filePath)) continue;
        const hash = crypto
            .createHash('md5')
            .update(fs.readFileSync(filePath))
            .digest('hex')
            .slice(0, 8);
        const pattern = new RegExp(`(${escapeRegExp(out)})\\?v=[^"'\\s>]*`, 'g');
        html = html.replace(pattern, (match) => {
            if (match.endsWith(`?v=${hash}`)) return match;
            updated++;
            return `${out}?v=${hash}`;
        });
    }
    if (updated > 0) {
        fs.writeFileSync(htmlPath, html);
        console.log(`🔗 Cache-busted ${updated} asset reference(s) in index.html`);
    } else {
        console.log('🔗 Cache busters already up to date');
    }
}

(async () => {
    console.log('🔨 Minifying assets...\n');
    await buildCSS();
    await buildJS();
    bustCache();
    console.log('🎉 Minification complete!');
})();
