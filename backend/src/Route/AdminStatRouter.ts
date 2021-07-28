import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import AdminStatController from "@app/Controller/AdminStatController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<AdminStatController>("AdminStatController");

  router.use(AdminAuthentication);
  router.get("/", async (request: Request, response: Response) => {
    await controller.getStats(request, response);
  });
  return router;
}

export default createRouter;
