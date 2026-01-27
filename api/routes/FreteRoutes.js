import { Router } from "express";
import multer from "multer";
import FreteController from "../controllers/FreteController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();

// multer em memória (ideal pra xlsx)
const upload = multer({
  storage: multer.memoryStorage(),
});

// importar planilha
router.post(
  "/importar",
  authMiddleware,
  upload.single("arquivo"),
  FreteController.importarFrete,
);

// calcular frete
router.post("/calcular", authMiddleware, FreteController.calcularFrete);

export default router;
