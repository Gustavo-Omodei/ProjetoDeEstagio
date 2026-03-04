import Router from "express";
import pagamentoController from "../controllers/pagamentoController.js";

const router = Router();

router.post("/criar-preferencia", pagamentoController.criarPreferencia);

export default router;
