import Department from "@app/Model/Department";
import Technology from "@app/Model/Technology";

export default class Student {
  constructor(
    private ecomId: string,
    private name: string,
    private bio: string,
    private department: Department,
    private technologies: Technology[],
    private passwordHash: string,
    private teamId: string,
  ) {}

  getEcomId() {
    return this.ecomId;
  }

  getName() {
    return this.name;
  }

  getBio() {
    return this.bio;
  }

  getDepartment() {
    return this.department;
  }

  getTechnologies() {
    return this.technologies;
  }

  getPasswordHash() {
    return this.passwordHash;
  }

  setTeamId(teamId: string) {
    this.teamId = teamId;
  }

  getTeamId() {
    return this.teamId;
  }

  setPasswordHash(passwordHash: string): void {
    this.passwordHash = passwordHash;
  }
  setEcomId(ecomId: string): void {
    this.ecomId = ecomId;
  }

  setName(name: string): void {
    this.name = name;
  }

  setBio(bio: string): void {
    this.bio = bio;
  }

  setDepartment(department: Department): void {
    this.department = department;
  }

  setTechnologies(technologies: Technology[]): void {
    this.technologies = technologies;
  }
}
