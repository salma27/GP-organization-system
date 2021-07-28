import express, { Request, Response } from "express";
import SupervisorController from "@app/Controller/SupervisorController";
import jwt from "jsonwebtoken";
import Container from "@app/Service/Container";
import SupervisorAuthentication from "@app/Middleware/SupervisorAuthentication";
import { SupervisorType } from "@app/Model/Supervisor";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<SupervisorController>(
    "SupervisorController",
  );

  router.post("/", async (request: Request, response: Response) => {
    await controller.register(request, response);
  });

  // router.get("/", async (request: Request, response: Response) => {
  //   await controller.getAll(request, response);
  // });

  router.post("/ta", async (request: Request, response: Response) => {
    await controller.getAll(request, response, SupervisorType.TA);
  });
  router.post("/dr", async (request: Request, response: Response) => {
    await controller.getAll(request, response, SupervisorType.DOCTOR);
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

  router.use(SupervisorAuthentication);

  router.post("/team", async (request: Request, response: Response) => {
    await controller.getTeams(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.edit(request, response);
  });
  router.post("/profile", async (request: Request, response: Response) => {
    await controller.getProfile(request, response);
  });

  return router;
}

export default createRouter;
