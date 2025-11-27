import { Router } from "express";
import CarrinhoController from "../controllers/CarrinhoController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// Adicionar produto ao carrinho
router.post("/adicionar", authMiddleware, CarrinhoController.adicionarProduto);

// Listar itens do carrinho
router.get("/itens", authMiddleware, CarrinhoController.listarItens);

// Atualizar quantidade de um produto
router.put(
  "/produtos/:idProduto",
  authMiddleware,
  CarrinhoController.atualizarQuantidade
);

// Remover um produto
router.delete(
  "/produtos/:idProduto",
  authMiddleware,
  CarrinhoController.removerItem
);

// Finalizar carrinho
router.put("/finalizar", authMiddleware, CarrinhoController.finalizarCarrinho);

export default router;
