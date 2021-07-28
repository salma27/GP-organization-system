import { v4 as uuidv4 } from "uuid";
import Project, { ProjectType } from "@app/Model/Project";
import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";

export default class ProjectFactory {
  createPublicProject(
    title: string,
    description: string,
    ownerId: string,
    department: Department,
    technologies: Technology[],
    year: number,
  ): Project {
    const id = uuidv4();
    const project = new Project(
      id,
      title,
      description,
      ownerId,
      ProjectType.PUBLIC_PROJECT,
      department,
      technologies,
    );
    project.setYear(year);
    return project;
  }
  createTeamProject(
    title: string,
    description: string,
    ownerId: string,
    department: Department,
    technologies: Technology[],
  ): Project {
    const id = uuidv4();
    const project = new Project(
      id,
      title,
      description,
      ownerId,
      ProjectType.TEAM_PROJECT,
      department,
      technologies,
    );
    project.setYear(new Date().getFullYear());

    return project;
  }
  createSupervisorProject(
    title: string,
    description: string,
    ownerId: string,
    department: Department,
    technologies: Technology[],
  ): Project {
    const id = uuidv4();
    const project = new Project(
      id,
      title,
      description,
      ownerId,
      ProjectType.SUPERVISOR_PROJECT,
      department,
      technologies,
    );
    project.setYear(new Date().getFullYear());

    return project;
  }
}
