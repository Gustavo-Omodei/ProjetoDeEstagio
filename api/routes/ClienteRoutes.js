import Router from "express";
import ClienteController from "../controllers/ClienteController.js";

const router = Router();

router.get("/", ClienteController.listarClientes);
router.get("/:id", ClienteController.listarPorID);
router.post("/", ClienteController.cadastrarCliente);
router.put("/:id", ClienteController.atualizarCliente);
router.delete("/:id", ClienteController.deletar);

export default router;
