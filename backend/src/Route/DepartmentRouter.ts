import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import DepartmentController from "@app/Controller/DepartmentController";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<DepartmentController>(
    "DepartmentController",
  );

  router.get("/", async (request: Request, response: Response) => {
    await controller.getAllDepartments(request, response);
  });

  return router;
}

export default createRouter;
