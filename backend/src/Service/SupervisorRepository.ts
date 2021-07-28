import Supervisor, { SupervisorType } from "@app/Model/Supervisor";

export default interface SupervisorRepository {
  save(supervisor: Supervisor): Promise<void>;
  deleteWithId(ecomId: string): Promise<void>;
  getById(ecomId: string): Promise<Supervisor>;
  getByTeamId(teamId: string): Promise<Supervisor[]>;
  getTeachingAssistants(): Promise<Supervisor[]>;
  getCountByType(type: SupervisorType): Promise<number>;
  getAvailableCount(type: SupervisorType): Promise<number>;
  getCountByDepartment(type: SupervisorType): Promise<any[]>;
  updateId(Supervisor: Supervisor, id: string): Promise<void>;
  getAvailableByDepartment(type: SupervisorType): Promise<any[]>
  getDoctors(): Promise<Supervisor[]>;
  getDrByTeamId(teamId: string): Promise<Supervisor[]>;
  getTaByTeamId(teamId: string): Promise<Supervisor[]>;
  update(Supervisor: Supervisor): Promise<void>;
  getByFilter(
    name: string | null,
    ecomId: string | null,
    technologies: string[] | null,
    department: string | null,
    type: SupervisorType,
  ): Promise<Supervisor[]>;
}
