import { Request, Response } from "express";
import NotificationRepository from "@app/Service/NotificationRepository";
import Notification from "@app/Model/Notification";
import NotificationTransformer from "@app/Service/NotificationTransformer";
import JoiService from "@app/Service/JoiService";
import Joi from "joi";

export default class NotificationController {
  constructor(
    private notificationRepo: NotificationRepository,
    private transformer: NotificationTransformer,
  ) {}

  async getAllNotifications(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        userId: Joi.string().required(),
      }),
    );
    const { userId } = request.body;
    try {
      const notifications = await this.notificationRepo.getByOwnerId(userId);
      response
        .status(200)
        .json(notifications.map((d) => this.serializeForResponse(d)));
    } catch (e) {
      response.status(400).json({
        message: "Error in getting notifications",
      });
      return;
    }
  }
  async deleteNotification(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        userId: Joi.string().required(),
        notificationId: Joi.string().required(),
      }),
    );
    const { userId, notificationId } = request.body;
    try {
      await this.notificationRepo.deleteOneById(notificationId);
      response.status(200).json({ message: "delete success" });
    } catch (e) {
      response.status(400).json({
        message: "Notification not found",
      });
      return;
    }
  }
  async deleteAllNotifications(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        userId: Joi.string().required(),
      }),
    );
    const { userId } = request.body;
    try {
      await this.notificationRepo.deleteAllByOwnerId(userId);
      response.status(200).json({ message: "delete success" });
    } catch (e) {
      response.status(400).json({
        message: "Notification not found",
      });
      return;
    }
  }
  async readNotification(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        userId: Joi.string().required(),
        notificationId: Joi.string().required(),
      }),
    );
    const { userId, notificationId } = request.body;
    try {
      await this.notificationRepo.readOneById(notificationId);
      response.status(200).json({ message: "Read success" });
    } catch (e) {
      response.status(400).json({
        message: "Notification not found",
      });
      return;
    }
  }
  async readAllNotifications(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        userId: Joi.string().required(),
        notificationId: Joi.string().required(),
      }),
    );
    const { userId, notificationId } = request.body;
    try {
      await this.notificationRepo.readAllByOwnerId(userId);
      response.status(200).json({ message: "Read success" });
    } catch (e) {
      response.status(400).json({
        message: "Notification not found",
      });
      return;
    }
  }

  private serializeForResponse(dep: Notification) {
    const object = this.transformer.toObject(dep);
    return object;
  }
}
