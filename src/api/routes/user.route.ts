import { Router } from "express";
import { UserController } from "../controllers";
import { UserValidator } from "../validators";

const router = Router();

router.post("/signup", UserValidator.signup, UserController.signup);
router.post("/signin", UserValidator.signin, UserController.signin);
router.post("/refresh", UserController.renewToken);
router.delete("/signout", UserController.signout);

export default router;
