import Router from "express";
import ClienteController from "../controllers/ClienteController.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles(["admin"]),
  ClienteController.listarClientes,
);
router.get("/me", authMiddleware, ClienteController.me);
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  ClienteController.listarPorID,
);
router.post("/", ClienteController.cadastrarCliente);
router.put(
  "/:id",
  authMiddleware,

  ClienteController.atualizarCliente,
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  ClienteController.deletar,
);
router.post(
  "/endereco",
  authMiddleware,
  authorizeRoles(["admin", "cliente"]),
  ClienteController.adicionarEndereco,
);
router.get(
  "/:idCliente/enderecos",
  authMiddleware,
  authorizeRoles(["admin", "cliente"]),
  ClienteController.listarEnderecos,
);
router.delete(
  "/:idCliente/enderecos/:idEndereco",
  authMiddleware,
  authorizeRoles(["admin"]),
  ClienteController.removerEndereco,
);
router.post("/login", ClienteController.login);

export default router;
