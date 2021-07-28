import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import AnnouncementController from "@app/Controller/AnnouncementController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<AnnouncementController>(
    "AnnouncementController",
  );

  router.use(AdminAuthentication);
  router.post("/add", async (request: Request, response: Response) => {
    await controller.addAnnouncement(request, response);
  });

  return router;
}

export default createRouter;
