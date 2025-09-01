import Router from "express";
import ModeloController from "../controllers/ModeloController.js";
import upload from "../upload.js";

const router = Router();

router.get("/", ModeloController.listarModelos);
router.get("/:id", ModeloController.listarPorID);
router.post("/", upload.single("imagem"), ModeloController.cadastrarModelo);
router.put("/:id", upload.single("imagem"), ModeloController.atualizarModelo);
router.delete("/:id", ModeloController.deletar);

export default router;
