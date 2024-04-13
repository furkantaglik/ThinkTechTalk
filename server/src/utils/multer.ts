import multer from "multer";
import { RequestHandler } from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/files/";
    if (file.mimetype.startsWith("image/")) {
      uploadPath = "uploads/images/";
    } else if (file.mimetype.startsWith("video/")) {
      uploadPath = "uploads/videos/";
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "-" + file.fieldname + "." + fileExt);
  },
});

export const uploadConfig = multer({
  storage: storage,
  limits: {
    files: 1,
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    if (
      [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
        "video/mp4",
        "video/mov",
        "video/avi",
        "video/webm",
        "video/wmv",
      ].includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(new Error("Sadece resim veya video eklenebilir"));
    }
  },
}).single("media");

export const upload: RequestHandler = (req, res, next) => {
  uploadConfig(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};
