import Router from "express";
import PedidoController from "../controllers/PedidoController.js";
const router = Router();

router.post("/criar", PedidoController.criarPedido);

export default router;
