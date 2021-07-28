import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import SupervisorController from "@app/Controller/SupervisorController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<SupervisorController>("SupervisorController");

  router.get("/dr", async (request: Request, response: Response) => {
    await controller.getAllDoctors(request, response);
  });
  router.get("/ta", async (request: Request, response: Response) => {
    await controller.getAllTAs(request, response);
  });
  
  router.use(AdminAuthentication);
  
  router.post("/ta/add", async (request: Request, response: Response) => {
    await controller.createTA(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.adminEditSupervisor(request, response);
  });
  router.post("/dr/add", async (request: Request, response: Response) => {
    await controller.createDoctor(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.deleteSupervisor(request, response);
  });

  return router;
}

export default createRouter;
