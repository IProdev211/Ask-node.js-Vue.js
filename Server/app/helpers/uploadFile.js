const multer = require('multer');
const mkdirp = require('mkdirp');
const fs = require('fs');

const getDir = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDay();

  return `./public/uploads/files/${year}/${month}/${day}`;
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = getDir();

    mkdirp(dir, err => cb(null, dir));
  },
  filename: (req, file, cb) => {
    let filePath = getDir() + '/' + file.originalname;
    if (!fs.existsSync(filePath)) cb(null, file.originalname);
    else cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadFile = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
});

module.exports = uploadFile;
