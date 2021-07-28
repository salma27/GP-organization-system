import { Request, Response } from "express";
import JoiService from "@app/Service/JoiService";
import Joi from "joi";
import ProjectRepository from "@app/Service/ProjectRepository";
import TechnologyRepository from "@app/Service/TechnologyRepository";
import ProjectFactory from "@app/Service/Factory/ProjectFactory";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import Project, { ProjectType } from "@app/Model/Project";
import ProjectTransformer, {
  ProjectObject,
} from "@app/Service/ProjectTransformer";
import StudentRepository from "@app/Service/StudentRepository";
import SupervisorRepository from "@app/Service/SupervisorRepository";
import axios from "axios";

export default class ProjectController {
  private api_url = "";
  constructor(
    private projectRepo: ProjectRepository,
    private techRepo: TechnologyRepository,
    private depRepo: DepartmentRepository,
    private studentRepo: StudentRepository,
    private suptRepo: SupervisorRepository,
    private porojectFactory: ProjectFactory,
    private transformer: ProjectTransformer,
  ) {
    const { NLP_API } = process.env;
    if(NLP_API) this.api_url = NLP_API;
  }

  async getProject(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const project = await this.projectRepo.getSupervisorProjectById(id);
      response.json(await this.serializeForResponse(project));
    } catch (error) {
      response.status(404).json({ message: "Project not found" });
    }
  }
  async getPublicProject(request: Request, response: Response) {
    const { id } = request.params;
    try {
      const project = await this.projectRepo.getById(id);
      response.json(await this.serializeForResponse(project));
    } catch (error) {
      response.status(404).json({ message: "Project not found" });
    }
  }
  async addProjectToTeam(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        studentId: Joi.string().required(),
        // departmentId: Joi.string().required(),
        technologyIds: Joi.array(),
      }),
    );

    const { title, description, technologyIds, studentId } = request.body;

    const student = await this.studentRepo.getById(studentId);
    const teamId = student.getTeamId();
    const department = student.getDepartment();

    const project = this.porojectFactory.createTeamProject(
      title,
      description,
      teamId,
      department,
      await Promise.all(
        technologyIds.map(async (technologyId: string) =>
          this.techRepo.getById(technologyId),
        ),
      ),
    );
    try {
      const repeatedTitle = await this.projectRepo.getIsTitleDistinct(title.replace(/\s\s+/g, ' '));
      if(repeatedTitle){
        response.status(400).json({
          message: "Project Title is not unique",
        });
        return;
      }
      const db_change = this.projectRepo.getCollectionChanged();
      const payload = {
        title: project.getTitle(),
        description: project.getDescription(),
        db_change: true, //TODO: make this db_change
      };
      const res = await axios.post(this.api_url, payload);
      console.log("res: ", res.data);
      const add = res.data.add;
      if(add)
      await this.projectRepo.save(project);
      else{
        response.status(400).json({
          message: "Project is a duplicate of another team's project",
        });
        return;
      } 
    } catch (e) {
      // console.log(e);
      
      response.status(400).json({
        message: "Error in adding project to team",
      });
      return;
    }
    response
      .status(200)
      .json({ message: "Project added to team successfully" });
  }
  async addPublicProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        departmentId: Joi.string().required(),
        adminId: Joi.string().required(),
        technologyIds: Joi.array(),
        year: Joi.number().required(),
      }),
    );

    const { title, description, departmentId, technologyIds, year, adminId } =
      request.body;

    //TODO: Check if owner is an admin
    const project = this.porojectFactory.createPublicProject(
      title,
      description,
      adminId,
      await this.depRepo.getById(departmentId),
      await Promise.all(
        technologyIds.map(async (technologyId: string) =>
          this.techRepo.getById(technologyId),
        ),
      ),
      year,
    );
    try {
      await this.projectRepo.save(project);
    } catch (e) {
      response.status(400).json({
        message: "Error in adding public project",
      });
      return;
    }
    response.status(200).json({ message: "Project added successfully" });
  }
  async addProjectToSupervisor(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        supervisorId: Joi.string().required(),
        userType: Joi.number().required(),
        // departmentId: Joi.string().required(),
        technologyIds: Joi.array(),
      }),
    );

    const { title, description, supervisorId, technologyIds } = request.body;
    const supervisor = await this.suptRepo.getById(supervisorId);
    const project = this.porojectFactory.createSupervisorProject(
      title,
      description,
      supervisorId,
      supervisor.getDepartment(),
      await Promise.all(
        technologyIds.map(async (technologyId: string) =>
          this.techRepo.getById(technologyId),
        ),
      ),
    );
    try {
      const repeatedTitle = await this.projectRepo.getIsTitleDistinct(title.replace(/\s\s+/g, ' '));
      if(repeatedTitle){
        response.status(400).json({
          message: "Project Title is not unique",
        });
        return;
      }
      const db_change = this.projectRepo.getCollectionChanged();
      const payload = {
        title: project.getTitle(),
        description: project.getDescription(),
        db_change: true, //TODO: make this db_change
      };
      const res = await axios.post(this.api_url, payload);
      console.log("res: ", res.data);
      const add = res.data.add;
      if(add)
      await this.projectRepo.save(project);
      else{
        response.status(400).json({
          message: "Project is a duplicate of another team's project",
        });
        return;
      } 
    } catch (e) {
      response.status(400).json({
        message: "Error in adding project to profile",
      });
      return;
    }
    response
      .status(200)
      .json({ message: "Project added to profile successfully" });
  }
  async getPublicProjects(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string(),
        description: Joi.string(),
        year: Joi.number(),
        technologyIds: Joi.array(),
      }),
    );

    const { description, year, technologyIds, departmentId } = request.body;
    let projects = [];
    try {
      projects = await this.projectRepo.getPublicWithFilter(
        description,
        year,
        technologyIds,
        departmentId,
      );
    } catch (e) {
      response.status(400).json({
        message: "Error in getting projects",
      });
      return;
    }
    response
      .status(200)
      .json(
        await Promise.all(
          projects.map(async (p) => this.serializeForResponse(p)),
        ),
      );
  }

  async getTeamsProjects(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        userId: Joi.string().required(),
      }),
    );

    const { description, technologyIds, departmentId } = request.body;
    let projects = [];
    try {
      projects = await this.projectRepo.getTeamWithFilter(
        description,
        technologyIds,
        departmentId,
      );
    } catch (e) {
      response.status(400).json({
        message: "Error in getting team projects",
      });
      return;
    }
    response
      .status(200)
      .json(
        await Promise.all(
          projects.map(async (p) => this.serializeForResponse(p)),
        ),
      );
  }

  async getSupervisorsProjects(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        description: Joi.string(),
        year: Joi.number(),
        technologyIds: Joi.array(),
      }),
    );

    const { description, year, technologyIds, departmentId } = request.body;
    let projects = [];
    try {
      projects = await this.projectRepo.getSupervisorsProjectsWithFilter(
        description,
        year,
        technologyIds,
        departmentId,
      );
    } catch (e) {
      response.status(400).json({
        message: "Error in getting projects",
      });
      return;
    }
    response
      .status(200)
      .json(
        await Promise.all(
          projects.map(async (p) => this.serializeForResponse(p)),
        ),
      );
  }

  async getTeamProjects(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
      }),
    );

    const { studentId } = request.body;
    const teamId = (await this.studentRepo.getById(studentId)).getTeamId();
    let projects = [];
    try {
      projects = await this.projectRepo.getByTeamId(teamId);
      // console.log("teamID: ", teamId, "\nprojects: ", projects)
    } catch (e) {
      response.status(400).json({
        message: "Error in getting team projects",
      });
      return;
    }
    response
      .status(200)
      .json(
        await Promise.all(
          projects.map(async (p) => this.serializeForResponse(p)),
        ),
      );
  }
  async getOneSupervisorProjects(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        // userType: Joi.number().required(),
      }),
    );

    const { supervisorId } = request.body;
    let projects = [];
    try {
      projects = await this.projectRepo.getBySupervisorId(supervisorId);
    } catch (e) {
      response.status(400).json({
        message: "Error in getting supervisor projects",
      });
      return;
    }
    response
      .status(200)
      .json(
        await Promise.all(
          projects.map(async (p) => this.serializeForResponse(p)),
        ),
      );
  }

  async updateSupervisorProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        projectId: Joi.string().required(),
        userType: Joi.number().required(),
        title: Joi.string(),
        description: Joi.string(),
        technologyIds: Joi.array(),
      }),
    );

    const { projectId, title, description, technologyIds, supervisorId } =
      request.body;

    const project = await this.projectRepo.getById(projectId);

    if (supervisorId !== project.getOwnerId()) {
      response
        .status(401)
        .json({ message: "Supervisor unauthorized to update project" });
      return;
    }

    if (title) project.setTitle(title);
    if (description) project.setDescription(description);
    if (technologyIds)
      project.setTechnologies(
        await Promise.all(
          technologyIds.map(async (technologyId: string) =>
            this.techRepo.getById(technologyId),
          ),
        ),
      );

    try {
      const db_change = this.projectRepo.getCollectionChanged();
      const payload = {
        title: project.getTitle(),
        description: project.getDescription(),
        db_change: true, //TODO: make this db_change
      };
      const res = await axios.post(this.api_url, payload);
      console.log("res: ", res.data);
      const add = res.data.add;
      if(add)
      await this.projectRepo.update(project);
      else{
        response.status(400).json({
          message: "Project is a duplicate of another team's project",
        });
        return;
      } 
    } catch (e) {
      console.log(e);
      response.status(400).json({
        message: "Error in updating supervisor project",
      });
      return;
    }
    response
      .status(200)
      .json({ message: "Supervisor Project updated successfully" });
  }
  async updateTeamProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        projectId: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
        technologyIds: Joi.array(),
      }),
    );

    const { projectId, title: oldTitle, description, technologyIds, studentId } =
      request.body;

    const project = await this.projectRepo.getById(projectId);
    const student = await this.studentRepo.getById(studentId);
    // const newValues = { title, description, technologyIds, projectId };

    if (student.getTeamId() !== project.getOwnerId()) {
      response
        .status(401)
        .json({ message: "Student unauthorized to update project" });
      return;
    }

    if (oldTitle) project.setTitle(oldTitle);
    if (description) project.setDescription(description);
    if (technologyIds)
      project.setTechnologies(
        await Promise.all(
          technologyIds.map(async (technologyId: string) =>
            this.techRepo.getById(technologyId),
          ),
        ),
      );

    try {
      const db_change = this.projectRepo.getCollectionChanged();
      const payload = {
        title: oldTitle,
        description: project.getDescription(),
        db_change: true, //TODO: make this db_change
      };
      const res = await axios.post(this.api_url, payload);
      console.log("res: ", res.data);
      const add = res.data.add;
      if(add)
      await this.projectRepo.update(project);
      else{
        response.status(400).json({
          message: "Project is a duplicate of another team's project",
        });
        return;
      } 
    } catch (e) {
      response.status(400).json({
        message: "Error in saving Team project",
      });
      return;
    }
    response.status(200).json({ message: "Team Project updated successfully" });
  }
  async updatePublicProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        projectId: Joi.string().required(),
        title: Joi.string(),
        description: Joi.string(),
        technologyIds: Joi.array(),
        year: Joi.number(),
        departmentId: Joi.string(),
      }),
    );

    const {
      projectId,
      adminId,
      title,
      description,
      technologyIds,
      year,
      departmentId,
    } = request.body;

    try {
      const project = await this.projectRepo.getById(projectId);
      if (
        adminId !== project.getOwnerId() ||
        project.getProjectType() !== ProjectType.PUBLIC_PROJECT
      ) {
        response
          .status(401)
          .json({ message: "Admin unauthorized to update project" });
        return;
      }
      if (title) project.setTitle(title);
      if (description) project.setDescription(description);
      if (technologyIds)
        project.setTechnologies(
          await Promise.all(
            technologyIds.map(async (technologyId: string) =>
              this.techRepo.getById(technologyId),
            ),
          ),
        );

      if (year) project.setYear(year);
      if (departmentId) {
        const dep = await this.depRepo.getById(departmentId);
        project.setDepartment(dep);
      }

      await this.projectRepo.update(project);
    } catch (e) {
      response.status(400).json({
        message: "Error in saving public project",
      });
      return;
    }
    response
      .status(200)
      .json({ message: "Public Project updated successfully" });
  }

  async deleteSupervisorProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        supervisorId: Joi.string().required(),
        userType: Joi.number().required(),
        projectId: Joi.string().required(),
      }),
    );

    try {
      const { projectId, supervisorId } = request.body;

      const project = await this.projectRepo.getById(projectId);
      if (supervisorId !== project.getOwnerId()) {
        response
          .status(401)
          .json({ message: "Supervisor unauthorized to delete project" });
        return;
      }
      await this.projectRepo.deleteById(projectId);
    } catch (e) {
      response.status(400).json({
        message: "Error in deletin supervisor projects",
      });
      return;
    }
    response
      .status(200)
      .json({ message: "Supervisor project deleted successfully" });
  }
  async deleteTeamProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        studentId: Joi.string().required(),
        projectId: Joi.string().required(),
      }),
    );

    const { projectId, studentId } = request.body;

    const project = await this.projectRepo.getById(projectId);
    const student = await this.studentRepo.getById(studentId);
    if (student.getTeamId() !== project.getOwnerId()) {
      response
        .status(401)
        .json({ message: "Student unauthorized to delete project" });
      return;
    }
    try {
      await this.projectRepo.deleteById(projectId);
    } catch (e) {
      response.status(400).json({
        message: "Error in deleting team projects",
      });
      return;
    }
    response.status(200).json({ message: "Team project deleted successfully" });
  }
  async deletePublicProject(request: Request, response: Response) {
    await JoiService.validateRequest(
      request,
      Joi.object({
        adminId: Joi.string().required(),
        projectId: Joi.string().required(),
      }),
    );

    const { projectId, adminId } = request.body;

    const project = await this.projectRepo.getById(projectId);
    if (
      adminId !== project.getOwnerId() ||
      project.getProjectType() !== ProjectType.PUBLIC_PROJECT
    ) {
      response
        .status(401)
        .json({ message: "Admin unauthorized to delete project" });
      return;
    }
    try {
      await this.projectRepo.deleteById(projectId);
    } catch (e) {
      response.status(400).json({
        message: "Error in deletin public projects",
      });
      return;
    }
    response
      .status(200)
      .json({ message: "Public project deleted successfully" });
  }

  private async serializeForResponse(project: Project) {
    const object = this.transformer.toObject(project);
    const technologies = await Promise.all(
      object.technologyIds.map(async (technologyId: string) =>
        this.techRepo.getById(technologyId),
      ),
    );
    const department = await this.depRepo.getById(object.departmentId);
    return { ...object, technologies, department };
  }

  async getDistinctYears(request: Request, response: Response) {
    const years = await this.projectRepo.getDistinctYears();
    const currentYear = (new Date()).getFullYear();
    const index = years.indexOf(currentYear);
    if (index > -1) {
      years.splice(index, 1);
    }

    response.status(200).json({ years: years });

  }
  // private async updateProject(obj: ProjectObject, updateObj: any): ProjectObject {

  //   // for (const [key] of Object.entries(obj)) {
  //   //   if (updateObj[key]) {
  //   //     obj[key] = updateObj[key];
  //   //   }
  //   // }
  //   obj = {...obj, ...updateObj};
  //   return await this.transformer.toEntity(obj);
  // }
}
