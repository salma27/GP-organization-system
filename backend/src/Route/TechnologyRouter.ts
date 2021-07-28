import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import TechnologyController from "@app/Controller/TechnologyController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<TechnologyController>(
    "TechnologyController",
  );

  router.get("/:id", async (request: Request, response: Response) => {
    await controller.getTechnology(request, response);
  });

  router.get("/", async (request: Request, response: Response) => {
    await controller.getAllTechnologys(request, response);
  });
  return router;
}

export default createRouter;
