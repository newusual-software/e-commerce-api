import multer from "multer";
import path from "path";

const upload = multer({ dest: "./public/assets" });

export default upload;