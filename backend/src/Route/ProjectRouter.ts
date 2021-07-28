import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import ProjectController from "@app/Controller/ProjectController";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<ProjectController>("ProjectController");

  router.post("/all", async (request: Request, response: Response) => {
    await controller.getPublicProjects(request, response);
  });
  router.get("/years", async (request: Request, response: Response) => {
    await controller.getDistinctYears(request, response);
  });

  router.post("/supervisors", async (request: Request, response: Response) => {
    await controller.getSupervisorsProjects(request, response);
  });

  router.get(
    "/supervisor/:id",
    async (request: Request, response: Response) => {
      request.body.supervisorId = request.params.id;
      await controller.getOneSupervisorProjects(request, response);
    },
  );

  router.get("/:id", async (request: Request, response: Response) => {
    await controller.getPublicProject(request, response);
  });

  return router;
}

export default createRouter;
