import express, { Request, Response } from "express";
import StudentController from "@app/Controller/StudentController";
import jwt from "jsonwebtoken";
import Container from "@app/Service/Container";
import StudentAuthentication from "@app/Middleware/StudentAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<StudentController>("StudentController");

  router.post("/", async (request: Request, response: Response) => {
    await controller.register(request, response);
  });

  router.post("/all", async (request: Request, response: Response) => {
    await controller.getAll(request, response);
  });

  router.get("/:ecomId", async (request: Request, response: Response) => {
    await controller.getById(request, response);
  });

  router.post("/auth/login", async (request: Request, response: Response) => {
    await controller.login(request, response);
  });

  // TODO: Remove this in production, This is just for testing
  router.post(
    "/ecom/encode-token",
    async (request: Request, response: Response) => {
      const jwtToken = await jwt.sign(request.body, process.env.JWT_KEY || "");
      response.send(jwtToken);
    },
  );

  router.post("/edit", StudentAuthentication);
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.edit(request, response);
  });
  router.post("/profile", StudentAuthentication);
  router.post("/profile", async (request: Request, response: Response) => {
    await controller.getProfile(request, response);
  });

  return router;
}

export default createRouter;
