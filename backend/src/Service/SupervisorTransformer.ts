import Supervisor from "@app/Model/Supervisor";
import DepartmentRepository from "@app/Service/DepartmentRepository";
import TechnologyRepository from "@app/Service/TechnologyRepository";

export interface SupervisorObject {
  id: string;
  name: string;
  bio: string;
  ecomId: string;
  passwordHash: string;
  teamsSlots: number;
  type: number;
  technologies: string[];
  teams: string[];
  department: string;
}

export default class SupervisorTransformer {
  constructor(
    private departmentRepository: DepartmentRepository,
    private technologyRepository: TechnologyRepository,
  ) {}

  toObject(supervisor: Supervisor): SupervisorObject {
    return {
      id: supervisor.getId(),
      name: supervisor.getName(),
      bio: supervisor.getBio(),
      ecomId: supervisor.getEcomId(),
      passwordHash: supervisor.getPasswordHash(),
      teamsSlots: supervisor.getTeamsSlots(),
      department: supervisor.getDepartment().getId(),
      technologies: supervisor
        .getTechnologies()
        .map((technology) => technology.getId()),
      type: supervisor.getType(),
      teams: supervisor.getTeams(),
    };
  }

  async toEntity(object: SupervisorObject): Promise<Supervisor> {
    return new Supervisor(
      object.id,
      object.name,
      object.bio,
      object.ecomId,
      object.passwordHash,
      object.teamsSlots,
      await Promise.all(
        object.technologies.map(async (id) =>
          this.technologyRepository.getById(id),
        ),
      ),
      await this.departmentRepository.getById(object.department),
      object.type,
      object.teams,
    );
  }
}
