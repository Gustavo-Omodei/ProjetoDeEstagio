import Router from "express";
import pagamentoController from "../controllers/pagamentoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post(
  "/criar-preferencia",
  authMiddleware,
  pagamentoController.criarPreferencia,
);

export default router;
