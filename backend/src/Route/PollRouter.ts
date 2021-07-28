import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import StudentAuthentication from "@app/Middleware/StudentAuthentication";
import PollController from "@app/Controller/PollController";
import SupervisorAuthentication from "@app/Middleware/SupervisorAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<PollController>("PollController");

  router.get("/", StudentAuthentication);
  router.get("/", async (request: Request, response: Response) => {
    await controller.getAllPollsForTeam(request, response);
  });
  router.get("/supervisor", SupervisorAuthentication);
  router.get("/supervisor", async (request: Request, response: Response) => {
    await controller.getAllPollsForSupervisor(request, response);
  });
  router.post("/vote", StudentAuthentication);
  router.post("/vote", async (request: Request, response: Response) => {
    await controller.voteOnPoll(request, response);
  });
  router.post("/vote/supervisor", SupervisorAuthentication);
  router.post("/vote/supervisor", async (request: Request, response: Response) => {
    await controller.supervisorVoteOnPoll(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.deletePoll(request, response);
  });

  return router;
}

export default createRouter;
