import Router from "express";
import EnderecoController from "../controllers/EnderecoController.js";
import { authMiddleware } from "../middleware/auth.js";
const router = Router();

router.get("/", authMiddleware, EnderecoController.listarEnderecos);
router.get("/:id", authMiddleware, EnderecoController.listarPorID);
router.post("/", authMiddleware, EnderecoController.cadastrarEndereco);
router.put("/:id", authMiddleware, EnderecoController.atualizarEndereco);
router.delete("/:id", authMiddleware, EnderecoController.deletar);

export default router;
