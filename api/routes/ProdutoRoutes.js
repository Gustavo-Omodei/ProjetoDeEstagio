// routes/produtoRoutes.js
import Router from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", ProdutoController.listar);
router.get("/:id", ProdutoController.listarPorID);
router.post("/", authMiddleware, ProdutoController.criar);

export default router;
