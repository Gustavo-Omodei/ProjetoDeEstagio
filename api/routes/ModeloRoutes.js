import Router from "express";
import ModeloController from "../controllers/ModeloController.js";
import upload from "../upload.js";
import { authMiddleware } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
const router = Router();

router.get("/", ModeloController.listarModelos);
router.get("/:id", ModeloController.listarPorID);
router.post(
  "/",
  authMiddleware,
  authorizeRoles(["admin"]),
  upload,
  ModeloController.cadastrarModelo,
);
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  upload,
  ModeloController.atualizarModelo,
);
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  ModeloController.deletar,
);

export default router;
