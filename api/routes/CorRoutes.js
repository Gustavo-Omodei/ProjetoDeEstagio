import Router from "express";
import CorController from "../controllers/CorController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", CorController.listarCores);
router.get("/:id", authMiddleware, CorController.listarPorID);
router.post("/", authMiddleware, CorController.cadastrarCor);
router.put("/:id", authMiddleware, CorController.atualizarCor);
router.delete("/:id", authMiddleware, CorController.deletar);

export default router;
