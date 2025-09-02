import Router from "express";
import CorController from "../controllers/CorController.js";

const router = Router();

router.get("/", CorController.listarCores);
router.get("/:id", CorController.listarPorID);
router.post("/", CorController.cadastrarCor);
router.put("/:id", CorController.atualizarCor);
router.delete("/:id", CorController.deletar);

export default router;
