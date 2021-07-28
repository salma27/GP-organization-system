import express, { Request, Response } from "express";
import Container from "@app/Service/Container";
import AnnouncementController from "@app/Controller/AnnouncementController";
import AdminAuthentication from "@app/Middleware/AdminAuthentication";

function createRouter() {
  const router = express.Router();

  const controller = Container.resolve<AnnouncementController>(
    "AnnouncementController",
  );

  router.get("/", async (request: Request, response: Response) => {
    await controller.getAllAnnouncements(request, response);
  });

  return router;
}

export default createRouter;
