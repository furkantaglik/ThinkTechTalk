import multer from "multer";

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
export const upload = multer({ storage: storage });
