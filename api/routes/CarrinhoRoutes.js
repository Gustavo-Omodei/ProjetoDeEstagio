import { Router } from "express";
import CarrinhoController from "../controllers/CarrinhoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/adicionar", authMiddleware, CarrinhoController.adicionarProduto);
router.get("/itens", authMiddleware, CarrinhoController.listarItens);
router.put(
  "/produtos/:idProduto",
  authMiddleware,
  CarrinhoController.atualizarQuantidade
);
router.delete(
  "/produtos/:idProduto",
  authMiddleware,
  CarrinhoController.removerItem
);
router.put("/finalizar", authMiddleware, CarrinhoController.finalizarCarrinho);

export default router;
