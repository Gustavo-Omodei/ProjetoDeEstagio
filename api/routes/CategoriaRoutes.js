import Router from "express";
import CategoriaController from "../controllers/CategoriaController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, CategoriaController.listarCategorias);
router.get("/:id", authMiddleware, CategoriaController.listarPorID);
router.post("/", authMiddleware, CategoriaController.cadastrarCategoria);
router.put("/:id", authMiddleware, CategoriaController.atualizarCategoria);
router.delete("/:id", authMiddleware, CategoriaController.deletar);

export default router;
