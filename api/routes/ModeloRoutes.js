import Router from "express";
import ModeloController from "../controllers/ModeloController.js";
import upload from "../upload.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", ModeloController.listarModelos);
router.get("/:id", ModeloController.listarPorID);
router.post("/", authMiddleware, upload, ModeloController.cadastrarModelo);
router.put("/:id", authMiddleware, upload, ModeloController.atualizarModelo);
router.delete("/:id", authMiddleware, ModeloController.deletar);

export default router;
