import Router from "express";
import EnderecoController from "../controllers/EnderecoController.js";

const router = Router();

router.get("/", EnderecoController.listarEnderecos);
router.get("/:id", EnderecoController.listarPorID);
router.post("/", EnderecoController.cadastrarEndereco);
router.put("/:id", EnderecoController.atualizarEndereco);
router.delete("/:id", EnderecoController.deletar);

export default router;
