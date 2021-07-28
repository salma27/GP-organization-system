import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import ProjectController from "@app/Controller/ProjectController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<ProjectController>("ProjectController");

  router.use(AdminAuthentication);

  router.post("/", async (request: Request, response: Response) => {
    await controller.getPublicProjects(request, response);
  });

  router.post("/student-projects", async (request: Request, response: Response) => {
    request.body.userId = request.body.adminId;
    await controller.getTeamsProjects(request, response);
  });

  router.post("/add", async (request: Request, response: Response) => {
    await controller.addPublicProject(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.updatePublicProject(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.deletePublicProject(request, response);
  });

  return router;
}

export default createRouter;
