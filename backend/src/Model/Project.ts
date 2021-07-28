import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";

export enum ProjectType {
  PUBLIC_PROJECT,
  TEAM_PROJECT,
  SUPERVISOR_PROJECT,
}

export default class Project {
  // teamId: string;
  year: number;
  isMainProject: boolean;
  constructor(
    private id: string,
    private title: string,
    private description: string,
    private ownerId: string,
    private projectType: ProjectType,
    private department: Department,
    private technologies: Technology[],
  ) {
    // this.teamId = "";
    this.year = (new Date()).getFullYear();
    this.isMainProject = false;
  }

  getId(): string {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getDescription(): string {
    return this.description;
  }
  getOwnerId(): string {
    return this.ownerId;
  }
  getProjectType(): ProjectType {
    return this.projectType;
  }
  getTechnologies(): Technology[] {
    return this.technologies;
  }
  getIsMainProject(): boolean {
    return this.isMainProject;
  }
  setIsMainProject(isMainProject: boolean): void {
    this.isMainProject = isMainProject;
  }
  // getTeamId(): string {
  //   return this.teamId;
  // }
  // setTeamId(teamId: string): void {
  //   this.teamId = teamId;
  // }
  getYear(): number {
    return this.year;
  }
  setYear(year: number): void {
    this.year = year;
  }

  getDepartment(): Department {
    return this.department;
  }
  setDepartment(department: Department): void {
    this.department = department;
  }

  setId(id: string): void {
    this.id = id;
  }
  setTitle(title: string): void {
    this.title = title;
  }
  setDescription(description: string): void {
    this.description = description;
  }
  setOwnerId(ownerId: string): void {
    this.ownerId = ownerId;
  }
  setProjectType(projectType: ProjectType): void {
    this.projectType = projectType;
  }
  setTechnologies(technologies: Technology[]): void {
    this.technologies = technologies;
  }
}
