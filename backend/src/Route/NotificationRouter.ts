import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import StudentAuthentication from "@app/Middleware/StudentAuthentication";
import NotificationController from "@app/Controller/NotificationController";
import SupervisorAuthentication from "@app/Middleware/SupervisorAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<NotificationController>(
    "NotificationController",
  );

  router.use("/student", StudentAuthentication);
  router.get("/student/delete-one", async (request: Request, response: Response) => {
    request.body.userId = request.body.studentId;
    await controller.deleteNotification(request, response);
  });
  router.get("/student/delete-all", async (request: Request, response: Response) => {
    request.body.userId = request.body.studentId;
    await controller.deleteAllNotifications(request, response);
  });
  router.get("/student/read-one", async (request: Request, response: Response) => {
    request.body.userId = request.body.studentId;
    await controller.readNotification(request, response);
  });
  router.get("/student/read-all", async (request: Request, response: Response) => {
    request.body.userId = request.body.studentId;
    await controller.readAllNotifications(request, response);
  });
  router.get("/student", async (request: Request, response: Response) => {
    request.body.userId = request.body.studentId;
    await controller.getAllNotifications(request, response);
  });

  // ------
  router.use("/supervisor", SupervisorAuthentication);
  router.get("/supervisor", async (request: Request, response: Response) => {
    request.body.userId = request.body.supervisorId;
    await controller.getAllNotifications(request, response);
  });
  router.get("/supervisor/read-all", async (request: Request, response: Response) => {
    request.body.userId = request.body.supervisorId;
    await controller.readAllNotifications(request, response);
  });
  router.get("/supervisor/read-one", async (request: Request, response: Response) => {
    request.body.userId = request.body.supervisorId;
    await controller.readNotification(request, response);
  });
  router.get("/supervisor/delete-all", async (request: Request, response: Response) => {
    request.body.userId = request.body.supervisorId;
    await controller.deleteAllNotifications(request, response);
  });
  router.get("/supervisor/delete-one", async (request: Request, response: Response) => {
    request.body.userId = request.body.supervisorId;
    await controller.deleteNotification(request, response);
  });
  return router;
}

export default createRouter;
