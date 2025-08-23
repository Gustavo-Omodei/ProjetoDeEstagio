import Router from "express";
import CategoriaController from "../controllers/CategoriaController.js";

const router = Router();

router.get("/", CategoriaController.listarCategorias);
router.get("/:id", CategoriaController.listarPorID);
router.post("/", CategoriaController.cadastrarCategoria);
router.put("/:id", CategoriaController.atualizarCategoria);
router.delete("/:id", CategoriaController.deletar);

export default router;
