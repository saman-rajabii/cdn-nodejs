import { Router } from "express";
import { FileController } from "../controllers";
import { auth } from "../../middlewares";

const router = Router();

router.get("/", auth, FileController.getFiles);
router.post("/upload", auth, FileController.upload);

export default router;
