import Router from "express";
import TecidoController from "../controllers/TecidoController.js";

const router = Router();

router.get("/", TecidoController.listarTecidos);
router.get("/:id", TecidoController.listarPorID);
router.post("/", TecidoController.cadastrarTecido);
router.put("/:id", TecidoController.atualizarTecido);
router.delete("/:id", TecidoController.deletar);

export default router;
