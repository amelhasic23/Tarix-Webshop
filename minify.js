/**
 * Build-time asset minifier.
 *
 * Uses production-grade libraries (terser for JS, clean-css for CSS) so the
 * generated *.min.* files are safe to ship and noticeably smaller than the
 * sources. Run with `npm run build` (also wired into the Render build step).
 */
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify: minifyJS } = require('terser');

const root = __dirname;

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

function buildCSS() {
    const cleaner = new CleanCSS({ level: 2, returnPromise: false });
    for (const { src, out } of cssFiles) {
        try {
            const srcPath = path.join(root, src);
            if (!fs.existsSync(srcPath)) {
                console.warn(`⚠️  Skipping ${src} (not found)`);
                continue;
            }
            const css = fs.readFileSync(srcPath, 'utf8');
            const result = cleaner.minify(css);
            if (result.errors.length) {
                throw new Error(result.errors.join(', '));
            }
            fs.writeFileSync(path.join(root, out), result.styles);
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
            report(`${src} → ${out}`, js.length, result.code.length);
        } catch (err) {
            console.error(`❌ JS minify failed for ${src}:`, err.message);
        }
    }
}

(async () => {
    console.log('🔨 Minifying assets...\n');
    await buildCSS();
    await buildJS();
    console.log('🎉 Minification complete!');
})();
