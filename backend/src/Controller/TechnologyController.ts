import { Request, Response } from "express";
import TechnologyRepository from "@app/Service/TechnologyRepository";
import Technology from "@app/Model/Technology";
import TechnologyTransformer from "@app/Service/TechnologyTransformer";
import TechnologyFactory from "@app/Service/Factory/TechnologyFactory";
import JoiService from "@app/Service/JoiService";
import Joi from "joi";

export default class TechnologyController {
  constructor(
    private technologyRepo: TechnologyRepository,
    private transformer: TechnologyTransformer,
    private techFactory: TechnologyFactory,
  ) {}

  async getAllTechnologys(request: Request, response: Response) {
    try {
      const technologys = await this.technologyRepo.getAll();
      response
        .status(200)
        .json(technologys.map((d) => this.serializeForResponse(d)));
    } catch (e) {
      response.status(400).json({
        message: "Error in getting technologies",
      });
      return;
    }
  }
  async getTechnology(request: Request, response: Response) {
    try {
      const technologys = await this.technologyRepo.getById(request.params.id);
      response.status(200).json(this.serializeForResponse(technologys));
    } catch (e) {
      response.status(400).json({
        message: "Technology not found",
      });
      return;
    }
  }

  async addTechnology(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        name: Joi.string().required(),
      }),
    );
    const newTech = this.techFactory.create(request.body.name);
    try {
      await this.technologyRepo.save(newTech);
    } catch (error) {
      response.status(400).json({ message: "Can't add technology" });
      return;
    }
    response.status(200).json({ message: "Technology added successfully" });
  }
  async editTechnology(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        technologyId: Joi.string().required(),
        name: Joi.string().required(),
      }),
    );
    const newTech = this.techFactory.create(request.body.name);
    try {
      await this.technologyRepo.update(newTech, request.body.technologyId);
    } catch (error) {
      response.status(400).json({ message: "Can't update technology" });
      return;
    }
    response.status(200).json({ message: "Technology updated successfully" });
  }
  async deleteTechnology(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        technologyId: Joi.string().required(),
      }),
    );
    try {
      await this.technologyRepo.delete(request.body.technologyId);
    } catch (error) {
      response.status(400).json({ message: "Can't delete technology" });
      return;
    }
    response.status(200).json({ message: "Technology deleted successfully" });
  }

  private serializeForResponse(dep: Technology) {
    const object = this.transformer.toObject(dep);
    return object;
  }
}
