import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Middleware que aceita até 3 imagens, uma por campo
export default upload.fields([
  { name: "imagem1", maxCount: 1 },
  { name: "imagem2", maxCount: 1 },
  { name: "imagem3", maxCount: 1 },
]);
