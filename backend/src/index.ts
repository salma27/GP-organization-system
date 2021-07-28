import express, { ErrorRequestHandler, Request, Response } from "express";
import "express-async-errors";
import Joi from "joi";
import dotenv from "dotenv";
import Container from "@app/Service/Container";
import ObjectDefinitions from "@app/ObjectDefinition";
import createStudentRouter from "@app/Route/StudentRouter";
import createAdminRouter from "@app/Route/AdminRouter";
import createTeamRouter from "@app/Route/TeamRouter";
import createPollRouter from "@app/Route/PollRouter";
import createTeamProjectRouter from "@app/Route/TeamProjectRouter";
import createAdminProjectRouter from "@app/Route/AdminProjectRouter";
import createSupervisorProjectRouter from "@app/Route/SupervisorProjectRouter";
import createSupervisorRouter from "@app/Route/SupervisorRouter";
import createProjectRouter from "@app/Route/ProjectRouter";
import createAdminDepartmentRouter from "@app/Route/AdminDepartmentRouter";
import createDepartmentRouter from "@app/Route/DepartmentRouter";
import createAdminSupervisorRouter from "@app/Route/AdminSupervisorRouter";
import createTechnologyRouter from "@app/Route/TechnologyRouter";
import createAnnouncementRouter from "@app/Route/AnnouncementRouter";
import createAdminAnnouncementRouter from "@app/Route/AdminAnnouncementRouter";
import createAdminStudentRouter from "@app/Route/AdminStudentRouter";
import createNotificationRouter from "@app/Route/NotificationRouter";
import createAdminStatRouter from "@app/Route/AdminStatRouter";
import createAdminTechnologyRouter from "@app/Route/AdminTechnologyRouter";
// import { NextFunction } from "express-serve-static-core";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

Container.init(ObjectDefinitions).then(() => {
  app.get("/health-check", (request: Request, response: Response) => {
    response.status(200).send("Server is working");
  });

  const errorHandler: ErrorRequestHandler = (
    error,
    request,
    response,
    next,
  ) => {
    console.log(error);
    if (error instanceof Joi.ValidationError) {
      response.status(400).json({
        message: `Validation error: ${error.message}`,
      });
    } else {
      response.status(500).json({
        message: `Unknown error: ${error.message}`,
      });
    }
    next(error);
  };

  // const CORShandler = (req: Request, res: Response, next: NextFunction) => {
  //   next();
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  // };

  app.use(errorHandler);
  // app.use(CORShandler);

  app.use(cors());

  // because /team/project matches /team, so put the longer first
  app.use("/student", createStudentRouter());

  app.use("/team/project", createTeamProjectRouter());
  app.use("/team", createTeamRouter());
  app.use("/poll", createPollRouter());
  app.use("/project", createProjectRouter());
  app.use("/department", createDepartmentRouter());
  app.use("/technology", createTechnologyRouter());
  app.use("/feed", createAnnouncementRouter());
  app.use("/notification", createNotificationRouter());

  app.use("/admin/feed", createAdminAnnouncementRouter());
  app.use("/admin/student", createAdminStudentRouter());
  app.use("/admin/project", createAdminProjectRouter());
  app.use("/admin/department", createAdminDepartmentRouter());
  app.use("/admin/technology", createAdminTechnologyRouter());
  app.use("/admin/supervisor", createAdminSupervisorRouter());
  app.use("/admin/stat", createAdminStatRouter());
  app.use("/admin", createAdminRouter());

  app.use("/supervisor/project", createSupervisorProjectRouter());
  app.use("/supervisor", createSupervisorRouter());

  app.listen(80, () => {
    const { SERVER_PORT } = process.env;
    console.log(`Server started on port ${SERVER_PORT}`);
  });
});
