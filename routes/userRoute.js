const Controller = require("../controllers/userController");

const userRouter = require("express").Router();

userRouter.post("/register", Controller.postRegister)
userRouter.post("/login", Controller.postLogin);
userRouter.post("/google-login", Controller.googleLogin);

module.exports = userRouter;
