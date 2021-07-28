import express, { Request, Response } from "express";
import AdminController from "@app/Controller/AdminController";
import jwt from "jsonwebtoken";
import Container from "@app/Service/Container";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<AdminController>("AdminController");

  router.post("/auth/login", async (request: Request, response: Response) => {
    await controller.login(request, response);
  });

  return router;
}

export default createRouter;
