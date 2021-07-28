import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";

export enum SupervisorType {
  DOCTOR,
  TA,
}
export default class Supervisor {
  constructor(
    private id: string,
    private name: string,
    private bio: string,
    private ecomId: string,
    private passwordHash: string,
    private teamsSlots: number,
    private technologies: Technology[],
    private department: Department,
    private type: SupervisorType,
    private teams: string[],
  ) {}
  getType(): SupervisorType {
    return this.type;
  }
  setType(type: SupervisorType): void {
    this.type = type;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBio(): string {
    return this.bio;
  }

  getEcomId(): string {
    return this.ecomId;
  }
  setEcomId(ecomId: string): void {
    this.ecomId = ecomId;
  }

  getstring(): string {
    return this.passwordHash;
  }

  getTeams(): string[] {
    return this.teams;
  }

  getTeamsSlots(): number {
    return this.teamsSlots;
  }

  getTechnologies(): Technology[] {
    return this.technologies;
  }

  getDepartment(): Department {
    return this.department;
  }

  setTeamsSlots(teamsSlots: number): void {
    this.teamsSlots = teamsSlots;
  }

  setTechnologies(technologies: Technology[]): void {
    this.technologies = technologies;
  }

  setDepartment(department: Department): void {
    this.department = department;
  }

  setTeams(teams: string[]): void {
    this.teams = teams;
  }

  setName(name: string): void {
    this.name = name;
  }

  setBio(bio: string): void {
    this.bio = bio;
  }

  setPasswordHash(passwordHash: string): void {
    this.passwordHash = passwordHash;
  }
  getPasswordHash(): string {
    return this.passwordHash;
  }
  addTeam(team: string): void {
    this.teams.push(team);
  }
}
