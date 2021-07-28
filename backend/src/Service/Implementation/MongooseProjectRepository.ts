import Project, { ProjectType } from "@app/Model/Project";
import ProjectRepository from "@app/Service/ProjectRepository";
import * as mongoose from "mongoose";
import ProjectTransformer, {
  ProjectObject,
} from "@app/Service/ProjectTransformer";
import { Document, Schema } from "mongoose";
// import Department from "@app/Model/Department";
// import Technology from "@app/Model/Technology";
import { projects as seeds } from "@app/data";

export default class MongooseProjectRepository implements ProjectRepository {
  private readonly Model: mongoose.Model<ProjectObject & Document>;
  private fieldChange: boolean;
  constructor(private transformer: ProjectTransformer) {
    const schema = new Schema({
      id: {
        type: String,
        unique: true,
      },
      title: { type: String },
      description: { type: String },
      ownerId: { type: String },
      projectType: { type: Number },
      departmentId: { type: String },
      technologyIds: { type: [String] },
      // teamId: { type: String },
      year: { type: Number },
      isMainProject: { type: Boolean },
    });
    schema.index({ description: "text" });
    this.Model = mongoose.model<ProjectObject & Document>("projects", schema);
    this.seedDatabase();
    this.fieldChange = false;
  }

  private async seedDatabase() {
    // await this.Model.deleteMany({});
    console.log("seeding: ", seeds.length, " projects");
    seeds.forEach((seed) => {
      // this.Model.create(seed);
    });
  }
  async save(project: Project): Promise<void> {
    try {
      const instance = new this.Model(this.transformer.toObject(project));
      await instance.save();
      this.fieldChange = true;
    } catch (error) {
      if (error.description === "MongoError" && error.code === 11000) {
        throw new Error("ID Already Exists");
      }
    }
  }
  async update(project: Project): Promise<void> {
    const object = await this.Model.findOne({
      id: project.getId(),
      projectType: {
        $in: [ProjectType.SUPERVISOR_PROJECT, ProjectType.TEAM_PROJECT],
      },
    });
    if (object !== null) {
      const oldProject = await this.transformer.toEntity(object);
      const oldDescription = oldProject
        .getDescription()
        .replace(/[^\w]/gi, "")
        .toLowerCase();
      const description = project
        .getDescription()
        .replace(/[^\w]/gi, "")
        .toLowerCase();
      if (oldDescription === description) this.fieldChange = true;
    }
    const modelProject = await this.Model.updateOne(
      { id: project.getId() },
      { $set: this.transformer.toObject(project) },
    );
    // return this.transformer.toEntity(modelProject);
  }
  private async getByFilter(
    description: string | null,
    year: number | null,
    technologies: string[] | null,
    departmentId: string | null,
    type: ProjectType,
  ): Promise<Project[]> {
    let filter: any = {};

    if (description) filter = { $text: { $search: description } };

    if (technologies) filter.technologyIds = { $in: technologies };

    if (departmentId) filter.departmentId = departmentId;

    if (year) filter.year = year;

    const projects = await this.Model.find({ projectType: type, ...filter });
    return await Promise.all(
      projects.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }

  async getById(id: string): Promise<Project> {
    const object = await this.Model.findOne({ id });
    return this.instanceOrException(object);
  }
  async getSupervisorProjectById(id: string): Promise<Project> {
    const object = await this.Model.findOne({
      id,
      projectType: ProjectType.SUPERVISOR_PROJECT,
    });
    return this.instanceOrException(object);
  }
  async getPublicById(id: string): Promise<Project> {
    const object = await this.Model.findOne({
      id: id,
      projectType: ProjectType.PUBLIC_PROJECT,
    });
    return this.instanceOrException(object);
  }
  async deleteById(id: string): Promise<void> {
    const object = await this.Model.findOne({
      id,
      projectType: {
        $in: [ProjectType.SUPERVISOR_PROJECT, ProjectType.TEAM_PROJECT],
      },
    });
    if (object !== null) {
      this.fieldChange = true;
    }
    await this.Model.deleteOne({ id });
    //  return this.instanceOrException(object);
  }

  async getPublicWithFilter(
    description: string | null,
    year: number | null,
    technologies: string[] | null,
    departmentId: string | null,
  ): Promise<Project[]> {
    return this.getByFilter(
      description,
      year,
      technologies,
      departmentId,
      ProjectType.PUBLIC_PROJECT,
    );
  }
  async getTeamWithFilter(
    description: string | null,
    technologies: string[] | null,
    departmentId: string | null,
  ): Promise<Project[]> {
    return this.getByFilter(
      description,
      new Date().getFullYear(),
      technologies,
      departmentId,
      ProjectType.TEAM_PROJECT,
    );
  }
  async getSupervisorsProjectsWithFilter(
    description: string | null,
    year: number | null,
    technologies: string[] | null,
    departmentId: string | null,
  ): Promise<Project[]> {
    return this.getByFilter(
      description,
      year,
      technologies,
      departmentId,
      ProjectType.SUPERVISOR_PROJECT,
    );
  }
  async getByTeamId(teamId: string): Promise<Project[]> {
    const projects = await this.Model.find({
      ownerId: teamId,
      projectType: ProjectType.TEAM_PROJECT,
    });
    // console.log("filter by team", projects);
    return await Promise.all(
      projects.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }
  async getMainByTeamId(teamId: string): Promise<Project[]> {
    const projects = await this.Model.find({
      ownerId: teamId,
      projectType: ProjectType.TEAM_PROJECT,
      isMainProject: true,
    });
    return await Promise.all(
      projects.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }
  async getBySupervisorId(supervisorId: string): Promise<Project[]> {
    const projects = await this.Model.find({
      ownerId: supervisorId,
      projectType: ProjectType.SUPERVISOR_PROJECT,
    });
    // console.log("filter by team", projects);
    return await Promise.all(
      projects.map(async (obj) => this.transformer.toEntity(obj)),
    );
  }
  private async instanceOrException(
    object: ProjectObject | null,
  ): Promise<Project> {
    if (object === null) {
      throw new Error("Project not found");
    }
    return this.transformer.toEntity(object);
  }
  async removeAllExceptMain(teamId: string): Promise<void> {
    this.fieldChange = true;
    await this.Model.deleteMany({
      ownerId: teamId,
      isMainProject: false,
    });
  }
  getCollectionChanged(): boolean {
    return this.fieldChange;
  }
  setCollectionChanged(fieldChange: boolean): void {
    this.fieldChange = fieldChange;
  }
  async getIsTitleDistinct(title: string): Promise<boolean> {
    const titles = await this.Model.distinct("title", {
      projectType: {
        $in: [ProjectType.SUPERVISOR_PROJECT, ProjectType.TEAM_PROJECT],
      },
    });
    // console.log(titles);
    const index = titles.indexOf(title);
    // console.log(index);

    if (index !== -1) return true;
    else return false;
  }
  async getDistinctYears(): Promise<number[]> {
    const objects = await this.Model.distinct("year");
    return objects;
  }
}
