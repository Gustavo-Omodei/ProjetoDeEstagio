import { Router } from "express";
import CarrinhoController from "../controllers/CarrinhoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/", authMiddleware, CarrinhoController.criarCarrinho);
router.post("/adicionar", authMiddleware, CarrinhoController.adicionarProduto);
router.get(
  "/:idCarrinho/itens",
  authMiddleware,
  CarrinhoController.listarItens
);
router.put(
  "/:idCarrinho/produtos/:idProduto",
  authMiddleware,
  CarrinhoController.atualizarQuantidade
);
router.delete(
  "/:idCarrinho/produtos/:idProduto",
  authMiddleware,
  CarrinhoController.removerItem
);
router.put(
  "/:idCarrinho/finalizar",
  authMiddleware,
  CarrinhoController.finalizarCarrinho
);

export default router;
