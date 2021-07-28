import Joi from "joi";
import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import Student from "@app/Model/Student";
import jwt from "jsonwebtoken";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import TechnologyRepository from "@app/Service/TechnologyRepository";
import bcrypt from "bcryptjs";
import StudentRepository from "@app/Service/StudentRepository";
import StudentTransformer from "@app/Service/StudentTransformer";
import Technology from "@app/Model/Technology";
import Department from "@app/Model/Department";
import Team from "@app/Model/Team";
import { v4 as uuidv4 } from "uuid";
import TeamRepository from "@app/Service/TeamRepository";

const PasswordValidation = Joi.string().min(8).max(255).required();

export default class StudentController {
  constructor(
    private departmentRepository: DepartmentRepository,
    private technologyRepository: TechnologyRepository,
    private studentRepository: StudentRepository,
    private studentTransformer: StudentTransformer,
    private teamRepository: TeamRepository,
  ) {}

  public async register(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        ecomToken: Joi.string().required(),
        technologies: Joi.array().required(),
        password: PasswordValidation,
      }),
    );
    const { ecomToken, bio, password } = request.body;
    let ecomTokenPayload;
    try {
      ecomTokenPayload = (await jwt.verify(
        ecomToken,
        process.env.JWT_KEY || "",
      )) as EcomToken;
      // TODO: Verify token type is "ECOM_REGISTRATION_TOKEN"
    } catch (e) {
      response.status(400).json({
        message: "Ecom token is malformed",
      });
      return;
    }
    // TODO: Move to factory
    const name = ecomTokenPayload.name;
    const team = new Team(
      uuidv4(),
      `${name}'s (${ecomTokenPayload.ecomId}) team`,
      ecomTokenPayload.departmentId,
    );
    await this.teamRepository.save(team);
    const student = new Student(
      ecomTokenPayload.ecomId,
      name,
      bio,
      await this.departmentRepository.getById(ecomTokenPayload.departmentId),
      await Promise.all(
        request.body.technologies.map(async (technologyId: string) =>
          this.technologyRepository.getById(technologyId),
        ),
      ),
      await bcrypt.hash(password, 12),
      team.getId(),
    );
    try {
      await this.studentRepository.save(student);
    } catch (e) {
      response.status(400).json({
        message: "Ecom id already registered",
      });
      return;
    }
    response.json(this.serializeForResponse(student));
  }

  public async edit(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        bio: Joi.string(),
        technologyIds: Joi.array(),
      }),
    );
    const { bio, technologyIds=[], studentId } = request.body;
    const student = await this.studentRepository.getById(studentId);
    if(bio) student.setBio(bio);
    if(technologyIds.length) student.setTechnologies(
      await Promise.all(
        technologyIds.map(
          async (technologyId: string) =>
            await this.technologyRepository.getById(technologyId),
        ),
      ),
    );
    try {
      await this.studentRepository.update(student);
    } catch (e) {
      response.status(400).json({
        message: "Failed to update  profile",
      });
      return;
    }
    response.status(200).json({
      message: "Profile updated successfully",
      student: this.serializeForResponse(student),
    });
  }

  public async adminCreateStudent(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        name: Joi.string().required(),
        ecomId: Joi.string().required(),
        departmentId: Joi.string().required(),
        password: PasswordValidation,
        bio: Joi.string(),
        technologies: Joi.array(),
      }),
    );
    const {
      name,
      ecomId,
      departmentId,
      bio = "",
      technologies = [],
      password,
    } = request.body;

    const team = new Team(uuidv4(), `${name}'s (${ecomId}) team`, departmentId);
    await this.teamRepository.save(team);
    const student = new Student(
      ecomId,
      name,
      bio,
      await this.departmentRepository.getById(departmentId),
      await Promise.all(
        technologies.map(async (technologyId: string) =>
          this.technologyRepository.getById(technologyId),
        ),
      ),
      await bcrypt.hash(password, 12),
      team.getId(),
    );

    try {
      await this.studentRepository.save(student);
    } catch (e) {
      response.status(400).json({
        message: "Ecom id already registered",
      });
      return;
    }
    response.json(this.serializeForResponse(student));
  }
  public async adminEditStudent(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        studentId: Joi.string().required(),
        name: Joi.string(),
        ecomId: Joi.string(),
        departmentId: Joi.string(),
        password: Joi.string().min(8).max(255),
        bio: Joi.string(),
        technologies: Joi.array(),
      }),
    );
    const {
      ecomId,
      name,
      bio,
      departmentId,
      technologies,
      password,
      studentId,
    } = request.body;

    const student = await this.studentRepository.getById(studentId);
    if (ecomId) student.setEcomId(ecomId);
    if (name) student.setName(name);
    if (bio) student.setBio(bio);
    if (departmentId)
      student.setDepartment(
        await this.departmentRepository.getById(departmentId),
      );
    if (technologies)
      student.setTechnologies(
        await Promise.all(
          technologies.map(async (technologyId: string) =>
            this.technologyRepository.getById(technologyId),
          ),
        ),
      );
    if (password) student.setPasswordHash(await bcrypt.hash(password, 12));
    try {
      await this.studentRepository.updateId(student, studentId);
    } catch (e) {
      response.status(400).json({
        message: "Failed to update",
      });
      return;
    }
    response.json({ message: "Update success" });
  }
  public async adminDeleteStudent(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        adminId: Joi.string().required(),
      }),
    );
    const { studentId } = request.body;
    try {
      await this.studentRepository.removeById(studentId);
    } catch (e) {
      response.status(400).json({
        message: "Delete Student Failed",
      });
      return;
    }
    response.json({ message: "Deleted successfully" });
  }
  public async getAll(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        name: Joi.string(),
        ecomId: Joi.string(),
        technologyIds: Joi.array(),
        departmentId: Joi.string(),
      }),
    );

    const { name, ecomId, technologyIds, departmentId } = request.body;

    const students = await this.studentRepository.getByFilter(
      name,
      ecomId,
      technologyIds,
      departmentId,
    );
    const objects = students.map((student) =>
      this.serializeForResponse(student),
    );
    response.json({ students: objects });
  }

  async getById(request: Request, response: Response) {
    const { ecomId } = request.params;
    try {
      const student = await this.studentRepository.getById(ecomId);
      response.json(this.serializeForResponse(student));
    } catch (error) {
      response.status(404).json({ message: "Student not found" });
    }
  }
  async getProfile(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
      }),
    );
    const { studentId } = request.body;
    try {
      const student = await this.studentRepository.getById(studentId);
      let techsObject: { [key: string]: any } = {};
      student.getTechnologies().map((t) => {
        techsObject[t.getId()] = t.getName();
      });
      let arr = Object.entries(techsObject).map(([k, v]) => {
        return { id: k, name: v };
      });
      response.json({
        ...this.serializeForResponse(student),
        technologies: arr,
      });
    } catch (error) {
      response.status(404).json({ message: "Student not found" });
    }
  }

  private serializeForResponse(student: Student) {
    const object = this.studentTransformer.toObject(student);
    return {
      ...object,
      passwordHash: undefined,
    };
  }

  async login(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        ecomId: Joi.string().required(),
        password: PasswordValidation,
      }),
    );
    try {
      const student = await this.studentRepository.getById(request.body.ecomId);
      if (
        !(await bcrypt.compare(
          request.body.password,
          student.getPasswordHash(),
        ))
      ) {
        throw new Error();
      }
      const token = await jwt.sign(
        {
          studentId: student.getEcomId(),
          type: "STUDENT_ACCESS_TOKEN",
        },
        process.env.JWT_KEY || "",
      );
      response.json({
        token,
      });
    } catch (e) {
      response.status(401).json({
        message: "Wrong credentials",
      });
    }
  }
}

interface EcomToken {
  ecomId: string;
  departmentId: string;
  name: string;
}
