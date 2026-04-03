import Router from "express";
import TecidoController from "../controllers/TecidoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", TecidoController.listarTecidos);
router.get("/:id", authMiddleware, TecidoController.listarPorID);
router.post("/", authMiddleware, TecidoController.cadastrarTecido);
router.put("/:id", authMiddleware, TecidoController.atualizarTecido);
router.delete("/:id", authMiddleware, TecidoController.deletar);

export default router;
