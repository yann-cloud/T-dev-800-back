"use strict";
const multer = require('multer');
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const storage = multer.diskStorage({
    /**
     * A function that specifies the destination for storing the file.
     *
     * @param {Object} req - the request object
     * @param {Object} file - the file object
     * @param {Function} callback - the callback function
     * @return {void}
     */
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    /**
     * Generates a new filename based on the original filename and the current date.
     *
     * @param {Object} req - The request object
     * @param {Object} file - The file object
     * @param {Function} callback - The callback function
     * @return {String} The generated filename
     */
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});
const imageFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
module.exports = multer({ storage: storage, fileFilter: imageFilter }).single('imageUrl');
