import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import Joi from "joi";
import AnnouncementRepository from "@app/Service/AnnouncementRepository";
import Announcement from "@app/Model/Announcement";
import AnnouncementTransformer from "@app/Service/AnnouncementTransformer";
import { v4 } from "uuid";

export default class AnnouncementController {
  constructor(
    private announcementRepo: AnnouncementRepository,
    private transformer: AnnouncementTransformer,
  ) {}
  async addAnnouncement(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
      }),
    );

    const { title, content } = request.body;

    const announcement = new Announcement(v4(), title, content, new Date());
    try {
      await this.announcementRepo.save(announcement);
    } catch (e) {
      response.status(400).json({
        message: "Error in adding announcement",
      });
      return;
    }
    response.status(200).json({ message: "Announcement added successfully" });
  }

  async getAllAnnouncements(request: Request, response: Response) {
    try {
      const announcements = await this.announcementRepo.getAll();
      response
        .status(200)
        .json(announcements.map((d) => this.serializeForResponse(d)));
    } catch (e) {
      response.status(400).json({
        message: "Error in getting announcements",
      });
      return;
    }
  }

  private serializeForResponse(announcement: Announcement) {
    const object = this.transformer.toObject(announcement);
    return object;
  }
}
