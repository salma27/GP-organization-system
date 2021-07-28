import Project from "@app/Model/Project";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import TechnologyRepository from "@app/Service/TechnologyRepository";

export interface ProjectObject {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  projectType: number;
  departmentId: string;
  technologyIds: string[];
  // teamId: string;
  year: number;
  isMainProject: boolean;
}

export default class ProjectTransformer {
  constructor(
    private departmentRepository: DepartmentRepository,
    private technologyRepository: TechnologyRepository,
  ) {}

  toObject(project: Project): ProjectObject {
    return {
      id: project.getId(),
      title: project.getTitle(),
      description: project.getDescription(),
      ownerId: project.getOwnerId(),
      projectType: project.getProjectType(),
      departmentId: project.getDepartment().getId(),
      technologyIds: project
        .getTechnologies()
        .map((technology) => technology.getId()),
      // teamId: project.getTeamId(),
      year: project.getYear(),
      isMainProject: project.getIsMainProject(),
    };
  }

  async toEntity(object: ProjectObject): Promise<Project> {
    const project = new Project(
      object.id,
      object.title,
      object.description,
      object.ownerId,
      object.projectType,
      await this.departmentRepository.getById(object.departmentId),
      await Promise.all(
        object.technologyIds.map(async (id) =>
          this.technologyRepository.getById(id),
        ),
      ),
    );
    // project.setTeamId(object.teamId);
    project.setYear(object.year);
    project.setIsMainProject(object.isMainProject);
    return project;
  }
}
