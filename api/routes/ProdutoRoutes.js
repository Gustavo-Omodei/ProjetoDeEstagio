import Router from "express";
import ProdutoController from "../controllers/ProdutoController.js";

const router = Router();

router.get("/", ProdutoController.listarProdutos);
router.get("/:id", ProdutoController.listarPorID);
router.post("/", ProdutoController.cadastrarProduto);
router.put("/:id", ProdutoController.atualizarProduto);
router.delete("/:id", ProdutoController.deletar);

export default router;
