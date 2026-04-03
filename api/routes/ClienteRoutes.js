import Router from "express";
import ClienteController from "../controllers/ClienteController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", authMiddleware, ClienteController.listarClientes);
router.get("/me", authMiddleware, ClienteController.me);
router.get("/:id", authMiddleware, ClienteController.listarPorID);
router.post("/", ClienteController.cadastrarCliente);
router.put("/:id", authMiddleware, ClienteController.atualizarCliente);
router.delete("/:id", authMiddleware, ClienteController.deletar);
router.post("/endereco", authMiddleware, ClienteController.adicionarEndereco);
router.get(
  "/:idCliente/enderecos",
  authMiddleware,
  ClienteController.listarEnderecos,
);
router.delete(
  "/:idCliente/enderecos/:idEndereco",
  authMiddleware,
  ClienteController.removerEndereco,
);
router.post("/login", ClienteController.login);

export default router;
