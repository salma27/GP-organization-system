import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import DepartmentController from "@app/Controller/DepartmentController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<DepartmentController>(
    "DepartmentController",
  );

  
  router.post("/", async (request: Request, response: Response) => {
    await controller.getAllDepartments(request, response);
  });
  
  router.use(AdminAuthentication);
  
  router.post("/add", async (request: Request, response: Response) => {
    await controller.addDepartment(request, response);
  });
  router.post("/edit", async (request: Request, response: Response) => {
    await controller.editDepartment(request, response);
  });
  router.post("/delete", async (request: Request, response: Response) => {
    await controller.deleteDepartment(request, response);
  });

  return router;
}

export default createRouter;
