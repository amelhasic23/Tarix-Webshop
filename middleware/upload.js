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

        // Determine upload folder based on route
        if (req.path.includes('banners')) {
            uploadPath += 'banners/';
        } else if (req.path.includes('products')) {
            uploadPath += 'products/';
        } else if (req.path.includes('testimonials')) {
            uploadPath += 'testimonials/';
        } else if (req.path.includes('cta')) {
            uploadPath += 'cta/';
        } else if (req.path.includes('categories')) {
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
