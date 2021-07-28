import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import Joi from "joi";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import TechnologyRepository from "@app/Service/TechnologyRepository";
import DepartmentFactory from "@app/Service/Factory/DepartmentFactory";
import Department from "@app/Model/Department";
import DepartmentTransformer, {
  DepartmentObject,
} from "@app/Service/DepartmentTransformer";
import StudentRepository from "@app/Service/StudentRepository";

export default class DepartmentController {
  constructor(
    private depRepo: DepartmentRepository,
    private departmentFactory: DepartmentFactory,
    private transformer: DepartmentTransformer,
  ) {}
  async addDepartment(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        name: Joi.string().required(),
        maxNumberOfStudents: Joi.number().required(),
        maxNumberOfSupervisors: Joi.number().required(),
        minNumberOfStudents: Joi.number().required(),
        minNumberOfSupervisors: Joi.number().required(),
      }),
    );

    const {
      name,
      maxNumberOfStudents,
      maxNumberOfSupervisors,
      minNumberOfStudents,
      minNumberOfSupervisors,
    } = request.body;

    const department = this.departmentFactory.create(
      name,
      maxNumberOfStudents,
      maxNumberOfSupervisors,
      minNumberOfStudents,
      minNumberOfSupervisors,
    );
    try {
      await this.depRepo.save(department);
    } catch (e) {
      response.status(400).json({
        message: "Error in adding department",
      });
      return;
    }
    response.status(200).json({ message: "Department added successfully" });
  }
  async editDepartment(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        departmentId: Joi.string().required(),
        name: Joi.string(),
        maxNumberOfStudents: Joi.number(),
        maxNumberOfSupervisors: Joi.number(),
        minNumberOfStudents: Joi.number(),
        minNumberOfSupervisors: Joi.number(),
      }),
    );

    const {
      departmentId,
      name,
      maxNumberOfStudents,
      maxNumberOfSupervisors,
      minNumberOfStudents,
      minNumberOfSupervisors,
    } = request.body;

    let department;
    try {
      department = await this.depRepo.getById(departmentId);
    } catch (e) {
      response.status(400).json({
        message: "Department does not exist",
      });
      return;
    }

    if (name) department.setName(name);
    if (maxNumberOfStudents)
      department.setMaxNumberOfStudents(maxNumberOfStudents);
    if (maxNumberOfSupervisors)
      department.setMaxNumberOfSupervisors(maxNumberOfSupervisors);
    if (minNumberOfStudents)
      department.setMinNumberOfStudents(minNumberOfStudents);
    if (minNumberOfSupervisors)
      department.setMinNumberOfSupervisors(minNumberOfSupervisors);

    try {
      await this.depRepo.update(department);
    } catch (e) {
      response.status(400).json({
        message: "Error in saving department",
      });
      return;
    }
    response.status(200).json({ message: "Department editted successfully" });
  }
  async getAllDepartments(request: Request, response: Response) {
    try {
      const departments = await this.depRepo.getAll();
      response
        .status(200)
        .json(departments.map((d) => this.serializeForResponse(d)));
    } catch (e) {
      response.status(400).json({
        message: "Error in getting departments",
      });
      return;
    }
  }
  async deleteDepartment(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        departmentId: Joi.string().required(),
      }),
    );

    const { departmentId } = request.body;

    try {
      await this.depRepo.delete(departmentId);
    } catch (e) {
      response.status(400).json({
        message: "Error in deleting department",
      });
      return;
    }
    response.status(200).json({ message: "Department deleted successfully" });
  }

  private serializeForResponse(dep: Department) {
    const object = this.transformer.toObject(dep);
    return object;
  }
}
