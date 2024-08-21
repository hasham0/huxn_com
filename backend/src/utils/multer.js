import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // filename: function (req, file, cb) {
  //   const extName = path.extname(file.originalname);
  //   cb(null, `${file.fieldname}-${Date.now()}.${extName}`);
  // },
  filename: function (req, file, cb) {
    const extName = path.extname(file.originalname);
    cb(null, `${Date.now()}${extName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage: storage });

// const upload = multer({
//   dest: path.resolve(path.dirname("../../public/temp")),
//   limits: { fileSize: 10 * 1024 * 1024 },
// });

export { upload, fileFilter };
