import Router from "express";
import PedidoController from "../controllers/PedidoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/criar", authMiddleware, PedidoController.criarPedido);
router.get("/listar/:id", authMiddleware, PedidoController.listarPorID);

export default router;
