import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import TechnologyController from "@app/Controller/TechnologyController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<TechnologyController>(
    "TechnologyController",
  );

  
  router.post("/", async (request: Request, response: Response) => {
    await controller.getAllTechnologys(request, response);
  });
  
  router.use(AdminAuthentication);
  
  router.post("/add", async (request: Request, response: Response) => {
    await controller.addTechnology(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.editTechnology(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.deleteTechnology(request, response);
  });

  return router;
}

export default createRouter;
