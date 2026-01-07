import { Router } from "express";
import multer from "multer";
import FreteController from "../controllers/FreteController.js";

const router = Router();

// multer em memória (ideal pra xlsx)
const upload = multer({
  storage: multer.memoryStorage(),
});

// importar planilha
router.post(
  "/importar",
  upload.single("arquivo"),
  FreteController.importarFrete
);

// calcular frete
router.post("/calcular", FreteController.calcularFrete);

export default router;
