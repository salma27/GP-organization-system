import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import ProjectController from "@app/Controller/ProjectController";
import StudentAuthentication from "@app/Middleware/StudentAuthentication";

// for student/project/
function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<ProjectController>("ProjectController");

  router.use(StudentAuthentication);
  
  router.post("/", async (request: Request, response: Response) => {
    await controller.getTeamProjects(request, response);
  });
  
  router.get("/:id", async (request: Request, response: Response) => {
    await controller.getProject(request, response);
  });
  
  router.post("/add", async (request: Request, response: Response) => {
    await controller.addProjectToTeam(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.updateTeamProject(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.deleteTeamProject(request, response);
  });

  return router;
}

export default createRouter;
