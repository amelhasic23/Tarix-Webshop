/**
 * One-time image optimizer for everything under /Images.
 *
 * For each raster image it:
 *   1. Resizes + compresses the original in place (aspect ratio preserved).
 *   2. Writes a modern WebP sibling next to it (same name, .webp extension).
 *
 * The front-end serves the WebP via <picture> with the original as fallback.
 * Run with: npm run optimize:images
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'Images');

// Max dimension (px) per folder. Anything larger is scaled down.
const MAX_DIMENSION = {
    products: 800,
    banners: 1600,
    cta: 1200,
    testimonials: 500,
    icons: 256,
    logo: 256,
    uploads: 1200
};
const DEFAULT_MAX = 1200;

// Root-level images that should stay reasonably large (banners/blog/cta).
const ROOT_MAX = 1200;

const RASTER_EXT = ['.jpg', '.jpeg', '.png'];
const PRODUCT_WIDTHS = [320, 480, 640];
const RESPONSIVE_VARIANT_RE = /-\d+w\.(?:jpe?g|png|webp)$/i;

// Logo files are displayed very small; cap them tightly.
const isLogo = (file) => /whatsapp image|logo/i.test(file);
const isProductImage = (filePath) => filePath.replace(/\\/g, '/').includes('/products/');
const isResponsiveVariant = (fileName) => RESPONSIVE_VARIANT_RE.test(fileName);

const resolveMaxDimension = (filePath, fileName) => {
    if (isLogo(fileName)) return 400;
    const normalized = filePath.replace(/\\/g, '/');
    for (const folder in MAX_DIMENSION) {
        if (normalized.includes(`/${folder}/`)) return MAX_DIMENSION[folder];
    }
    // File sitting directly in /Images.
    if (path.dirname(filePath).replace(/\\/g, '/').endsWith('/Images')) return ROOT_MAX;
    return DEFAULT_MAX;
};

const formatKb = (bytes) => (bytes / 1024).toFixed(1) + ' KiB';

async function createProductVariants(source, filePath, ext) {
    if (!isProductImage(filePath)) return [];

    const basePath = filePath.replace(/\.[^.]+$/, '');
    const created = [];

    for (const width of PRODUCT_WIDTHS) {
        const resizeOpts = { width, height: width, fit: 'inside', withoutEnlargement: true };
        const fallbackPath = `${basePath}-${width}w${ext}`;
        let fallbackPipeline = sharp(source, { failOn: 'none' }).rotate().resize(resizeOpts);

        if (ext === '.png') {
            fallbackPipeline = fallbackPipeline.png({ compressionLevel: 9, quality: 80, palette: true });
        } else {
            fallbackPipeline = fallbackPipeline.jpeg({ quality: 80, mozjpeg: true });
        }

        const fallback = await fallbackPipeline.toBuffer();
        fs.writeFileSync(fallbackPath, fallback);
        created.push({ path: fallbackPath, size: fallback.length });

        const webpPath = `${basePath}-${width}w.webp`;
        const webp = await sharp(source, { failOn: 'none' })
            .rotate()
            .resize(resizeOpts)
            .webp({ quality: 78 })
            .toBuffer();
        fs.writeFileSync(webpPath, webp);
        created.push({ path: webpPath, size: webp.length });
    }

    return created;
}

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

async function optimizeFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);

    if (isResponsiveVariant(fileName)) {
        skipped++;
        return;
    }

    if (!RASTER_EXT.includes(ext)) {
        skipped++;
        return;
    }
    // Don't touch favicons.
    if (/favicon/i.test(fileName)) {
        skipped++;
        return;
    }

    try {
        const source = fs.readFileSync(filePath);
        const beforeSize = source.length;
        const maxDim = resolveMaxDimension(filePath, fileName);
        const resizeOpts = { width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true };

        // Re-encode original (compressed) in place.
        let pipeline = sharp(source, { failOn: 'none' }).rotate().resize(resizeOpts);
        if (ext === '.png') {
            pipeline = pipeline.png({ compressionLevel: 9, quality: 80, palette: true });
        } else {
            pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
        }
        const optimized = await pipeline.toBuffer();
        // Only overwrite if we actually saved bytes.
        if (optimized.length < beforeSize) {
            fs.writeFileSync(filePath, optimized);
        }

        // Write WebP sibling.
        const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
        const webp = await sharp(source, { failOn: 'none' })
            .rotate()
            .resize(resizeOpts)
            .webp({ quality: 78 })
            .toBuffer();
        fs.writeFileSync(webpPath, webp);

        const variants = await createProductVariants(source, filePath, ext);

        const afterSize = Math.min(optimized.length, beforeSize);
        totalBefore += beforeSize;
        totalAfter += afterSize;
        processed++;

        const rel = path.relative(path.join(__dirname, '..'), filePath);
        const variantText = variants.length ? `, + ${variants.length} responsive variants` : '';
        console.log(`  ${rel}: ${formatKb(beforeSize)} -> ${formatKb(afterSize)} (+ webp ${formatKb(webp.length)}${variantText})`);
    } catch (err) {
        console.warn(`  ! Skipped ${fileName}: ${err.message}`);
        skipped++;
    }
}

async function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await walk(fullPath);
        } else if (entry.isFile()) {
            await optimizeFile(fullPath);
        }
    }
}

(async () => {
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`Images directory not found: ${IMAGES_DIR}`);
        process.exit(1);
    }

    console.log('Optimizing images in /Images ...\n');
    await walk(IMAGES_DIR);

    console.log('\nDone.');
    console.log(`  Files optimized: ${processed}`);
    console.log(`  Files skipped:   ${skipped}`);
    if (totalBefore > 0) {
        const saved = ((totalBefore - totalAfter) / totalBefore) * 100;
        console.log(`  Originals: ${formatKb(totalBefore)} -> ${formatKb(totalAfter)} (saved ${saved.toFixed(1)}%)`);
    }
})();
