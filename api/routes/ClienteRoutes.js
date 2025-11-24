import Router from "express";
import ClienteController from "../controllers/ClienteController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", ClienteController.listarClientes);
router.get("/me", authMiddleware, ClienteController.me);
router.get("/:id", ClienteController.listarPorID);
router.post("/", ClienteController.cadastrarCliente);
router.put("/:id", ClienteController.atualizarCliente);
router.delete("/:id", ClienteController.deletar);
router.post("/endereco", ClienteController.adicionarEndereco);
router.get("/:idCliente/enderecos", ClienteController.listarEnderecos);
router.delete(
  "/:idCliente/enderecos/:idEndereco",
  ClienteController.removerEndereco
);
router.post("/login", ClienteController.login);

export default router;
