import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import TeamController from "@app/Controller/TeamController";
import StudentAuthentication from "@app/Middleware/StudentAuthentication";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";
import SupervisorAuthentication from "@app/Middleware/SupervisorAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<TeamController>("TeamController");

  router.post("/team-project", SupervisorAuthentication);
  router.post("/team-project", async (request: Request, response: Response) => {
    await controller.getOneTeamProjects(request, response);
  });

  router.get("/:teamId", async (request: Request, response: Response) => {
    await controller.getOnePublicTeam(request, response);
  });

  router.get("/", async (request: Request, response: Response) => {
    await controller.getAllTeamsPublic(request, response);
  });

  router.post("/join", StudentAuthentication);
  router.post("/join", async (request: Request, response: Response) => {
    await controller.requestToJoinTeam(request, response);
  });
  router.post("/leave/student", StudentAuthentication);
  router.post("/leave/student", async (request: Request, response: Response) => {
    await controller.studentLeaveTeam(request, response);
  });
  router.post("/leave/supervisor", SupervisorAuthentication);
  router.post("/leave/supervisor", async (request: Request, response: Response) => {
    await controller.supervisorLeaveTeam(request, response);
  });
  router.post("/supervise/dr", SupervisorAuthentication);
  router.post("/supervise/dr", async (request: Request, response: Response) => {
    await controller.DrRequestToSuprviseProject(request, response);
  });
  router.post("/supervise/ta", SupervisorAuthentication);
  router.post("/supervise/ta", async (request: Request, response: Response) => {
    await controller.TaRequestToSuprviseProject(request, response);
  });
  router.post("/student", StudentAuthentication);
  router.post("/student", async (request: Request, response: Response) => {
    await controller.getStudentTeam(request, response);
  });
  router.post("/take-main-project/dr", StudentAuthentication);
  router.post("/take-main-project/dr", async (request: Request, response: Response) => {
    await controller.memberRequestToTakeSuprvisorProject(request, response);
  });
  router.post("/request-to-be-supervisor/dr", StudentAuthentication);
  router.post("/request-to-be-supervisor/dr", async (request: Request, response: Response) => {
    await controller.memberAskTeamToTakeDr(request, response);
  });
  router.post("/request-to-be-supervisor/ta", StudentAuthentication);
  router.post("/request-to-be-supervisor/ta", async (request: Request, response: Response) => {
    await controller.memberAskTeamToTakeTa(request, response);
  });
  router.post("/supervisor", SupervisorAuthentication);
  router.post("/supervisor", async (request: Request, response: Response) => {
    await controller.getSupervisorTeams(request, response);
  });
  router.post("/admin", AdminAuthentication);
  router.post("/admin", async (request: Request, response: Response) => {
    await controller.getAllTeams(request, response);
  });

  return router;
}

export default createRouter;
