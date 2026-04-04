import Router from "express";
import PedidoController from "../controllers/PedidoController.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = Router();

router.post("/criar", authMiddleware, PedidoController.criarPedido);
router.get("/listar/:id", authMiddleware, PedidoController.listarPorID);
router.get(
  "/listar",
  authMiddleware,
  authorizeRoles(["admin"]),
  PedidoController.listarPedidos,
);

export default router;
