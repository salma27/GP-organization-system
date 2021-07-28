import Project from "@app/Model/Project";

export default interface ProjectRepository {
  save(project: Project): Promise<void>;
  update(project: Project): Promise<void>;
  getById(id: string): Promise<Project>;
  getSupervisorProjectById(id: string): Promise<Project>;
  deleteById(id: string): Promise<void>;
  removeAllExceptMain(teamId: string): Promise<void>;
  // getByFilter(
  //   description: string | null,
  //   year: number | null,
  //   technologies: string[] | null,
  // ): Promise<Project[]>;
  getPublicWithFilter(
    description: string | null,
    year: number | null,
    technologies: string[] | null,
    departmentId: string | null,
  ): Promise<Project[]>;
  getTeamWithFilter(
    description: string | null,
    technologies: string[] | null,
    departmentId: string | null,
  ): Promise<Project[]>;
  getSupervisorsProjectsWithFilter(
    description: string | null,
    year: number | null,
    technologies: string[] | null,
    departmentId: string | null,
  ): Promise<Project[]>;
  getPublicById(id: string): Promise<Project>;
  getByTeamId(teamId: string): Promise<Project[]>;
  getMainByTeamId(teamId: string): Promise<Project[]>;
  getBySupervisorId(supervisorId: string): Promise<Project[]>;
  getCollectionChanged(): boolean;
  setCollectionChanged(fieldChange: boolean): void;
  getDistinctYears(): Promise<number[]>;
  getIsTitleDistinct(title: string): Promise<boolean>;
}
