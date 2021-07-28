import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import StudentController from "@app/Controller/StudentController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<StudentController>("StudentController");

  router.post("/", async (request: Request, response: Response) => {
    await controller.getAll(request, response);
  });

  router.use(AdminAuthentication);

  router.post("/add", async (request: Request, response: Response) => {
    await controller.adminCreateStudent(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.adminEditStudent(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.adminDeleteStudent(request, response);
  });

  return router;
}

export default createRouter;
