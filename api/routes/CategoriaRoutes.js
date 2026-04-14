import Router from "express";
import CategoriaController from "../controllers/CategoriaController.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = Router();

router.get("/", authMiddleware, CategoriaController.listarCategorias);
router.get("/:id", authMiddleware, CategoriaController.listarPorID);
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  CategoriaController.cadastrarCategoria,
);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  CategoriaController.atualizarCategoria,
);
router.delete("/:id", authMiddleware, CategoriaController.deletar);

export default router;
