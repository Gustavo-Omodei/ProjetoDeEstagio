import Router from "express";
import PedidoController from "../controllers/PedidoController.js";

const router = Router();

router.post("/criar", PedidoController.criarPedido);
router.get("/listar/:id", PedidoController.listarPorID);

export default router;
