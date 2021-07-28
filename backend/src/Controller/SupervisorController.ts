import Joi from "joi";
import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import Supervisor, { SupervisorType } from "@app/Model/Supervisor";
import jwt from "jsonwebtoken";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import TechnologyRepository from "@app/Service/TechnologyRepository";
import bcrypt from "bcryptjs";
import SupervisorRepository from "@app/Service/SupervisorRepository";
import SupervisorFactory from "@app/Service/Factory/SupervisorFactory";
import SupervisorTransformer from "@app/Service/SupervisorTransformer";
import Technology from "@app/Model/Technology";
import Department from "@app/Model/Department";
import StudentRepository from "@app/Service/StudentRepository";
import ProjectRepository from "@app/Service/ProjectRepository";
import ProjectTransformer, {
  ProjectObject,
} from "@app/Service/ProjectTransformer";
import StudentTransformer from "@app/Service/StudentTransformer";

const PasswordValidation = Joi.string().min(8).max(255).required();

export default class SupervisorController {
  constructor(
    private departmentRepository: DepartmentRepository,
    private technologyRepository: TechnologyRepository,
    private supervisorRepository: SupervisorRepository,
    private supervisorFactory: SupervisorFactory,
    private supervisorTransformer: SupervisorTransformer,
    private studentRepo: StudentRepository,
    private projectRepo: ProjectRepository,
    private studentTransformer: StudentTransformer,
    private projectTransformer: ProjectTransformer,
  ) {}

  public async register(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        ecomToken: Joi.string().required(),
        technologies: Joi.array().required(),
        teamsSlots: Joi.number().required(),
        password: PasswordValidation,
      }),
    );
    const { ecomToken, bio, password, teamsSlots } = request.body;
    
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
    const type = ecomTokenPayload.type;
    const name = ecomTokenPayload.name;
    let create;
    if (type === "dr") create = this.supervisorFactory.createDoctor;
    else if (type === "ta") create = this.supervisorFactory.createTA;
    else {
      response.status(400).json({
        message: "user type is malformed",
      });
      return;
    }
    const supervisor = create(
      name,
      bio,
      ecomTokenPayload.ecomId,
      await bcrypt.hash(password, 12),
      teamsSlots,
      await Promise.all(
        request.body.technologies.map(async (technologyId: string) =>
          this.technologyRepository.getById(technologyId),
        ),
      ),
      await this.departmentRepository.getById(ecomTokenPayload.departmentId),
    );
    try {
      await this.supervisorRepository.save(supervisor);
    } catch (e) {
      response.status(400).json({
        message: "Ecom id already registered",
      });
      return;
    }
    response.json(this.serializeForResponse(supervisor));
  }

  private async createSupervisor(
    request: Request,
    response: Response,
    create: Function,
  ) {
    const {
      name,
      ecomId,
      department,
      bio = "",
      technologies = [],
      teamsSlots = 0,
      password,
    } = request.body;

    const supervisor = create(
      name,
      bio,
      ecomId,
      await bcrypt.hash(password, 12),
      teamsSlots,
      await Promise.all(
        technologies.map(async (technologyId: string) =>
          this.technologyRepository.getById(technologyId),
        ),
      ),
      await this.departmentRepository.getById(department),
    );

    try {
      await this.supervisorRepository.save(supervisor);
    } catch (e) {
      response.status(400).json({
        message: "Ecom id already registered",
      });
      return;
    }

    response.status(200).json({
      ta: this.serializeForResponse(supervisor),
      message: "Supervisor created successfully",
    });
  }
  public async createTA(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        name: Joi.string().required(),
        ecomId: Joi.string().required(),
        adminId: Joi.string().required(),
        department: Joi.string().required(),
        password: PasswordValidation,
        bio: Joi.string(),
        technologies: Joi.array(),
        teamsSlots: Joi.number(),
      }),
    );
    this.createSupervisor(
      request,
      response,
      this.supervisorFactory.createTA.bind(this.supervisorFactory),
    );
  }
  public async createDoctor(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        name: Joi.string().required(),
        ecomId: Joi.string().required(),
        adminId: Joi.string().required(),
        department: Joi.string().required(),
        password: PasswordValidation,
        bio: Joi.string(),
        technologies: Joi.array(),
        teamsSlots: Joi.number(),
      }),
    );
    this.createSupervisor(
      request,
      response,
      this.supervisorFactory.createDoctor.bind(this.supervisorFactory),
    );
  }

  public async deleteSupervisor(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        ecomId: Joi.string().required(),
      }),
    );
    const { ecomId } = request.body;

    try {
      await this.supervisorRepository.deleteWithId(ecomId);
    } catch (e) {
      response.status(400).json({
        message: "Cannot delete supervisor",
      });
      return;
    }

    response.status(200).json({
      message: "Supervisor deleted successfully",
    });
  }

  private async getAllSupervisors(
    request: Request,
    response: Response,
    getSupervisors: Function,
  ) {
    const supervisors = await getSupervisors();
    const objects = supervisors.map((supervisor: Supervisor) =>
      this.serializeForResponse(supervisor),
    );
    response.json({ supervisors: objects });
  }
  public async getAllTAs(request: Request, response: Response) {
    this.getAllSupervisors(
      request,
      response,
      this.supervisorRepository.getTeachingAssistants.bind(
        this.supervisorRepository,
      ),
    );
  }
  public async getAllDoctors(request: Request, response: Response) {
    this.getAllSupervisors(
      request,
      response,
      this.supervisorRepository.getDoctors.bind(this.supervisorRepository),
    );
  }

  public async getAll(
    request: Request,
    response: Response,
    type: SupervisorType,
  ) {
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

    const supervisors = await this.supervisorRepository.getByFilter(
      name,
      ecomId,
      technologyIds,
      departmentId,
      type,
    );
    const objects = supervisors.map((supervisor) =>
      this.serializeForResponse(supervisor),
    );
    response.json({ supervisors: objects });
  }

  async getById(request: Request, response: Response) {
    const { ecomId } = request.params;
    try {
      const supervisor = await this.supervisorRepository.getById(ecomId);
      response.json(this.serializeForResponse(supervisor));
    } catch (error) {
      response.status(404).json({ message: "Supervisor not found" });
    }
  }

  private serializeForResponse(supervisor: Supervisor) {
    const object = this.supervisorTransformer.toObject(supervisor);
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
      const supervisor = await this.supervisorRepository.getById(
        request.body.ecomId,
      );
      if (
        !(await bcrypt.compare(
          request.body.password,
          supervisor.getPasswordHash(),
        ))
      ) {
        throw new Error();
      }
      const token = await jwt.sign(
        {
          supervisorId: supervisor.getEcomId(),
          userType: supervisor.getType(),
          type: "SUPERVISOR_ACCESS_TOKEN",
        },
        process.env.JWT_KEY || "",
      );
      response.json({
        token,
        isDoctor: supervisor.getType() === SupervisorType.DOCTOR,
      });
    } catch (e) {
      response.status(401).json({
        message: "Wrong credentials",
      });
    }
  }

  async getTeams(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        userType: Joi.number().required(),
      }),
    );
    // get all students with this team ID
    // transform students to objects
    // create object -> {students: students, projects: projects}
    // get all projects with this team ID
    // projects students to objects
    // append object to teams array
    const { supervisorId } = request.body;
    const supervisor = await this.supervisorRepository.getById(supervisorId);
    const teamIds = supervisor.getTeams();
    const teams = [];
    for (let i = 0; i < teamIds.length; i++) {
      const id = teamIds[i];

      const students = await this.studentRepo.getByTeamId(id);
      const projects = await this.projectRepo.getMainByTeamId(id);
      // const projects = await this.projectRepo.getByTeamId(id);

      const studentsObject = students.map((student) => {
        const obj = this.studentTransformer.toObject(student);
        return { ...obj, passwordHash: undefined };
      });
      const projectsObject = projects.map((project) =>
        this.projectTransformer.toObject(project),
      );

      teams.push({
        students: studentsObject,
        mainProject: projectsObject.length
          ? projectsObject[0]
          : "No project is assigned",
      });
    }
    response.status(200).json(teams);
  }
  public async adminEditSupervisor(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        supervisorId: Joi.string().required(),
        name: Joi.string(),
        ecomId: Joi.string(),
        departmentId: Joi.string(),
        password: Joi.string().min(8).max(255),
        bio: Joi.string(),
        teamSlos: Joi.number(),
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
      supervisorId, // should be sent as ecom id
      teamSlos
    } = request.body;

    const supervisor = await this.supervisorRepository.getById(supervisorId);
    if(ecomId) supervisor.setEcomId(ecomId)
    if(teamSlos) supervisor.setTeamsSlots(teamSlos)
    if(name) supervisor.setName(name)
    if(bio) supervisor.setBio(bio)
    if(departmentId) supervisor.setDepartment(await this.departmentRepository.getById(departmentId))
    if(technologies) supervisor.setTechnologies(await Promise.all(technologies.map(async (technologyId: string) =>this.technologyRepository.getById(technologyId),),))
    if(password) supervisor.setPasswordHash(await bcrypt.hash(password, 12))
    try {
      await this.supervisorRepository.updateId(supervisor, supervisorId);
    } catch (e) {
      response.status(400).json({
        message: "Failed to update",
      });
      return;
    }
    response.json({message:"Update success"});
  }
  public async edit(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        bio: Joi.string(),
        technologyIds: Joi.array(),
        teamsSlots: Joi.number(),
      }),
    );
    const { bio, technologyIds=[], supervisorId, teamsSlots } = request.body;
    const supervisor = await this.supervisorRepository.getById(supervisorId);
    if(bio) supervisor.setBio(bio);
    if(technologyIds.length) supervisor.setTechnologies(
      await Promise.all(
        technologyIds.map(
          async (technologyId: string) =>
            await this.technologyRepository.getById(technologyId),
        ),
      ),
    );
    if (teamsSlots) supervisor.setTeamsSlots(teamsSlots);
    try {
      await this.supervisorRepository.update(supervisor);
    } catch (e) {
      response.status(400).json({
        message: "Failed to update  profile",
      });
      return;
    }
    response.status(200).json({
      message: "Profile updated successfully",
      student: this.serializeForResponse(supervisor),
    });
  }
  async getProfile(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
      }),
    );
    const { supervisorId } = request.body;
    try {
      const supervisor = await this.supervisorRepository.getById(supervisorId);
      response.json(this.serializeForResponse(supervisor));
    } catch (error) {
      response.status(404).json({ message: "Supervisor not found" });
    }
  }
}

interface EcomToken {
  ecomId: string;
  departmentId: string;
  name: string;
  type: string;
}
