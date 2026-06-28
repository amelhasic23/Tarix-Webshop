const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let uploadPath = 'Images/';

        // Determine upload folder based on route (use originalUrl since req.path is '/' in subrouters)
        const routePath = req.originalUrl || req.path;
        if (routePath.includes('banners')) {
            uploadPath += 'banners/';
        } else if (routePath.includes('products')) {
            uploadPath += 'products/';
        } else if (routePath.includes('testimonials')) {
            uploadPath += 'testimonials/';
        } else if (routePath.includes('cta')) {
            uploadPath += 'cta/';
        } else if (routePath.includes('categories')) {
            uploadPath += 'icons/';
        } else {
            uploadPath += 'uploads/';
        }

        ensureDirectoryExists(uploadPath);

cb(null, uploadPath);
    },
    filename: function(req, file, cb) {
        // Generate unique filename: timestamp-random-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        cb(null, nameWithoutExt + '-' + uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/jpg,image/png,image/gif,image/webp').split(',');

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only image files are allowed.'), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
    }
});

// Maximum dimension (px) per upload folder. Images larger than this are
// resized down (aspect ratio preserved) to cut download size and improve LCP.
const MAX_DIMENSION = {
    'products': 800,
    'banners': 1600,
    'cta': 1200,
    'testimonials': 500,
    'icons': 256,
    'uploads': 1200
};

const RASTER_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

const resolveMaxDimension = (filePath) => {
    const normalized = filePath.replace(/\\/g, '/');
    for (const folder in MAX_DIMENSION) {
        if (normalized.includes(`/${folder}/`)) return MAX_DIMENSION[folder];
    }
    return 1200;
};

/**
 * Express middleware (runs after multer) that, for the just-uploaded file:
 *   1. Resizes + compresses the original in place.
 *   2. Writes a modern WebP sibling next to it (same name, .webp extension).
 * The DB still stores the original path; the front-end serves the WebP via
 * <picture> with the original as fallback. Failures are non-fatal.
 */
const processImage = async (req, res, next) => {
    if (!req.file || !req.file.path) return next();

    const filePath = req.file.path;
    const ext = path.extname(filePath).toLowerCase();

    // Skip vector/animated formats (e.g. .svg, .gif) to avoid breaking them.
    if (!RASTER_EXT.includes(ext)) return next();

    try {
        const maxDim = resolveMaxDimension(filePath);
        const source = fs.readFileSync(filePath);
        const resizeOpts = { width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true };

        // Re-encode the original (compressed) in place.
        let pipeline = sharp(source, { failOn: 'none' }).rotate().resize(resizeOpts);
        if (ext === '.png') {
            pipeline = pipeline.png({ compressionLevel: 9, quality: 80, palette: true });
        } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: 80 });
        } else {
            pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
        }
        const optimized = await pipeline.toBuffer();
        fs.writeFileSync(filePath, optimized);

        // Write a WebP sibling (skip when the upload already is WebP).
        if (ext !== '.webp') {
            const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
            const webp = await sharp(source, { failOn: 'none' })
                .rotate()
                .resize(resizeOpts)
                .webp({ quality: 78 })
                .toBuffer();
            fs.writeFileSync(webpPath, webp);
        }
    } catch (err) {
        console.warn('Image optimization skipped (using original):', err.message);
    }

    next();
};

module.exports = upload;
module.exports.processImage = processImage;
