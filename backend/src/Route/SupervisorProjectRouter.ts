import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import ProjectController from "@app/Controller/ProjectController";
import SupervisorAuthentication from "@app/Middleware/SupervisorAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<ProjectController>("ProjectController");

  router.get("/:id", async (request: Request, response: Response) => {
    await controller.getProject(request, response);
  });

  router.use(SupervisorAuthentication);

  router.post("/", async (request: Request, response: Response) => {
    await controller.getOneSupervisorProjects(request, response);
  });
  router.post("/student-projects", async (request: Request, response: Response) => {
    request.body.userId = request.body.supervisorId;
    await controller.getTeamsProjects(request, response);
  });
  router.post("/add", async (request: Request, response: Response) => {
    await controller.addProjectToSupervisor(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.updateSupervisorProject(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.deleteSupervisorProject(request, response);
  });

  return router;
}

export default createRouter;
