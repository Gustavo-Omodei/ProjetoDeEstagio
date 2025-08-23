import Router from "express";
import ModeloController from "../controllers/ModeloController.js";

const router = Router();

router.get("/", ModeloController.listarModelos);
router.get("/:id", ModeloController.listarPorID);
router.post("/", ModeloController.cadastrarModelo);
router.put("/:id", ModeloController.atualizarModelo);
router.delete("/:id", ModeloController.deletar);

export default router;
