const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

module.exports = upload;
