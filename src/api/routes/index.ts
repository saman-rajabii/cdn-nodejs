import { Router } from "express";
import FileRoutes from "./file.route";
import UserRoutes from "./user.route";

const router = Router();

router.use("/users", UserRoutes);
router.use("/files", FileRoutes);

export default router;
